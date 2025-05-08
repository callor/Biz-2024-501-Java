import { DateUtil } from '@utils/date.util';
import { axios } from '@utils/network.util';
import { flow, makeAutoObservable, observable, ObservableMap } from 'mobx';
import EventCreateStore from './event-create.store';

type Holidaydata = {
  locDate: number;
  sno: number;
  name: string;
  kind: string;
  holidayYn: YN;
};
export default class CalendarStore {
  date = new Date();
  selectYmd: string;
  miniDate: Date;

  detail: EventDetail | TodoDetail;

  createStore: EventCreateStore;

  isShowTodo = true;
  todoMap = observable.map<string, ICalendarTodo[]>({});

  selects: string[] = [];
  holidayMap = observable.map<string, ObservableMap<string, { name: string; kind: string; holidayYn: YN }[]>>({});
  private _calendar = observable.map<string, ICalendarEvent[]>({});
  private _userCalendars: CalendarUsr[] = [];
  private _commonCalendars: Calendar[] = [];

  constructor() {
    makeAutoObservable(this, {
      syncUserCalendar: flow,
      syncHolidays: flow,
      syncCalendar: flow,
      syncTodo: flow,
    });
  }

  get yyyymm() {
    return DateUtil.format(this.date, 'yyyyMM');
  }
  get commonCalendars() {
    return this._commonCalendars;
  }

  get userCalendars() {
    return this._userCalendars ?? [];
  }

  get calendars() {
    return [...this._commonCalendars, ...this._userCalendars];
  }

  get calendarSort() {
    return this.calendars
      .filter((event) => this.selects.includes(event.calendarId))
      .map(({ calendarId }) => calendarId);
  }

  get calendarMap() {
    const calendarMap: {
      [key: string]: Calendar | CalendarUsr;
    } = {};
    this.calendars.forEach((calendar) => {
      calendarMap[calendar.calendarId] = calendar;
    });
    return calendarMap;
  }

  get calendar() {
    const copyCalendar: CalendarType = {};
    this._calendar.forEach((events, ymd) => {
      copyCalendar[ymd] = events.filter((event) => this.selects.includes(event.calendarId));
    });
    if (this.isShowTodo) {
      this.todoMap.forEach((todos, ymd) => {
        if (copyCalendar[ymd]) {
          copyCalendar[ymd] = [...copyCalendar[ymd], ...todos].sort((a, b) => {
            const diff = b.colSpan - a.colSpan;
            if (diff > 0) {
              return diff;
            }
            if (a.type === 'EVENT' && b.type === 'EVENT') {
              return this.calendarSort.indexOf(a.calendarId) - this.calendarSort.indexOf(b.calendarId);
            } else if (a.type === 'TODO' && b.type === 'TODO') {
              return 0;
            } else {
              if (a.type === 'TODO') {
                return -1;
              } else {
                return 1;
              }
            }
          });
        } else {
          copyCalendar[ymd] = todos;
        }
      });
    }
    return copyCalendar;
  }

  getCalendarData(calendarId: string) {
    return this.calendarMap[calendarId];
  }

  setShowTodo(isShowTodo: boolean) {
    this.isShowTodo = isShowTodo;
  }

  setSelectYmd(selectYmd: string) {
    this.selectYmd = selectYmd;
  }

  setMiniDate(date: Date) {
    this.miniDate = date;
  }

  setDate(date: Date) {
    this.date = date;
  }

  setDetail(detail?: EventDetail | TodoDetail) {
    this.detail = detail;
  }

  setUserCalendars(calendars: CalendarUsr[]) {
    this._userCalendars = calendars;
  }

  setSelctes(selectIds: string[]) {
    this.selects = selectIds;
  }

  setCalendar(calendar: Map<string, ICalendarEvent[]>) {
    this._calendar.replace(calendar);
  }

  setCommonCalendars(commonCalendars: Calendar[]) {
    this._commonCalendars = commonCalendars;
  }

  setCreateStore(createStore: EventCreateStore) {
    this.createStore = createStore;
  }

  *syncUserCalendar() {
    const { data: calendars } = yield axios.get('/diary/calendar');
    this.setUserCalendars(calendars);
  }

  *syncHolidays(_year: number) {
    const year = _year.toString();
    if (this.holidayMap.get(year)) {
      return;
    }
    this.holidayMap.set(year, observable.map({}));
    const { data: specialDays } = yield axios.get(`/diary/special/${year}`);
    specialDays.forEach(({ locDate, sno, ...data }: Holidaydata) => {
      if (sno === 0) {
        this.holidayMap.get(year).set(locDate.toString(), [data]);
      } else {
        this.holidayMap.get(year).get(locDate.toString()).push(data);
      }
    });
  }

  *syncTodo() {
    const { date } = this;
    const yyyymm = DateUtil.format(date, 'yyyyMM');
    const { data: todos } = yield axios.get(`/diary/todo?yyyymm=${yyyymm}`);
    const calendar = new Map<string, ICalendarTodo[]>();
    todos.forEach((todo: ICalendarTodo) => {
      const ymd: string = DateUtil.format(todo.startDt, 'yyyyMMdd');
      const data: ICalendarTodo = {
        ...todo,
        colSpan: 1,
        startDt: new Date(todo.startDt),
        type: 'TODO',
      };
      calendar.has(ymd) ? calendar.get(ymd).push(data) : calendar.set(ymd, [data]);
    });
    this.todoMap.replace(calendar);
  }

  *syncCalendar() {
    const { date } = this;
    const calendar = new Map<string, ICalendarEvent[]>();
    const yyyymm = DateUtil.format(date, 'yyyyMM');

    const calendarStartDt = DateUtil.getCalendarStartDay(date);
    const calendarEndDt = DateUtil.getCalendarLastDay(date);
    const { data: events } = yield axios.get(`/diary/calendar/events?yyyymm=${yyyymm}`);

    events.forEach(({ startDt: _startDt, endDt: _endDt, ...event }: EventDetail) => {
      const eventStartDt = new Date(_startDt);
      const eventEndDt = new Date(_endDt);
      let startDt = eventStartDt;
      let endDt = eventEndDt;

      // 일정 시작일이 캘린더 시작일 보다 작을 경우
      startDt = calendarStartDt.getTime() > startDt.getTime() ? calendarStartDt : startDt;
      // 일정 종료일이 캘린더 종료일보다 클 경우
      endDt = endDt.getTime() > calendarEndDt.getTime() ? calendarEndDt : endDt;
      // 몇 주 차이가 나는지
      const diffWeek = DateUtil.diffWeek(endDt, startDt);

      for (let i = 0; i <= diffWeek; i++) {
        startDt = i === 0 ? startDt : DateUtil.getStartWeekDay(DateUtil.addDay(startDt, 7));
        const weekLastDt = DateUtil.getLastWeekDay(startDt);
        const weekEndDt = weekLastDt.getTime() < endDt.getTime() ? weekLastDt : endDt;
        const ymd: string = DateUtil.format(startDt, 'yyyyMMdd');
        const colSpan = DateUtil.diffDay(weekEndDt, startDt) + 1;

        const data: ICalendarEvent = {
          ...event,
          colSpan,
          startDt: eventStartDt,
          endDt: eventEndDt,
          eventStartDt: eventStartDt,
          type: 'EVENT',
        };

        calendar.has(ymd) ? calendar.get(ymd).push(data) : calendar.set(ymd, [data]);
      }
    });
    // 캘린더 세팅
    this._calendar.replace(calendar);
  }
}
