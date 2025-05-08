import { flow, makeAutoObservable } from "mobx";

class CommonStore {
  member?: Member;
  isLoggedIn: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  settingLoggedIn(data: Member) {
    this.member = data;
    this.isLoggedIn = true;
  }
}

export default CommonStore;
