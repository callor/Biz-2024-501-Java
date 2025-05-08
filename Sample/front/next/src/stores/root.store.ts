import { axios } from '@utils/network.util';
import { flow, makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import CalendarStore from './calendar.store';

enableStaticRendering(typeof window === 'undefined');
export default class RootStore {
  member: Member = undefined;
  calendar = new CalendarStore();

  constructor() {
    makeAutoObservable(this, { signOut: flow });
  }

  get isLoggedIn() {
    return this.member !== undefined;
  }

  get isAdmin() {
    return this.member?.roles.some(({ role: { roleLv } }) => roleLv >= 90);
  }

  get maxLv() {
    return this.member?.roles.reduce((prevLv, { role: { roleLv } }) => (prevLv > roleLv ? prevLv : roleLv), 0);
  }
  get minLv() {
    return this.member?.roles.reduce((prevLv, { role: { roleLv } }) => (prevLv > roleLv ? roleLv : prevLv), 0);
  }

  setMember(member: Member) {
    this.member = member;
  }

  *signOut() {
    // 서버 로그아웃 처리
    yield axios.delete('/auth/signOut');

    delete axios.defaults.headers.authorization;
    this.calendar.setUserCalendars([]);
  }

  hydrate(initialData: InitData) {
    if (!initialData) return;
    const { member, commonCalendars, userCalendars } = initialData;
    if (commonCalendars.length > 0) {
      this.calendar.setCommonCalendars(commonCalendars);
    }
    if (member) {
      axios.defaults.headers.authorization = `Bearer ${member.token}`;
      this.member = member;
      if (userCalendars.length > 0) {
        this.calendar.setUserCalendars(userCalendars);
      }
    }
  }
}
