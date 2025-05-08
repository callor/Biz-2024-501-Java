import { DateUtil } from "@utils/date.util";
import { axios } from "@utils/network.util";
import { getWeek } from "date-fns";
import { flow, makeAutoObservable, reaction, runInAction, toJS } from "mobx";

type CalendarType = {
  [key: string]: ICalendarEvent[];
};
class CalendarStore {
  private _date = new Date();
  private _userCalendars: CalendarUsr[] = [];
  private _commonCalendars: Calendar[] = [];
  private _selects: string[] = [];
  private _calendar: CalendarType = {};
  private _holidayMap: {
    [key: string]: { name: string; kind: string; holidayYn: YN }[];
  } = {};

  constructor() {
    makeAutoObservable(this, { syncHolidays: flow, syncCommonCalendar: flow });
    this.syncCommonCalendar();
    // 캘린더 이벤트 항목 불러오기
    reaction(
      () => [this.calendars, this.date],
      () => {
        this.syncCalendar();
      }
    );

    // 특일정보 불러오기
    reaction(
      () => this.date,
      async (date, prevDate) => {
        if (date.getFullYear() !== prevDate?.getFullYear()) {
          this.syncHolidays();
        }
      }
    );
  }

  get date() {
    return this._date;
  }

  get calendars() {
    return [...this._commonCalendars, ...this._userCalendars];
  }

  private get calendarSort() {
    return this.calendars
      .filter((event) => this.selectIds.includes(event.calendarId))
      .map(({ calendarId }) => calendarId);
  }

  get calendarMap() {
    const calendarMap: {
      [key: string]: {
        bgColor: string;
        color: string;
      };
    } = {};
    this.calendars.forEach(({ bgColor, color, calendarId }) => {
      calendarMap[calendarId] = {
        bgColor,
        color,
      };
    });
    return calendarMap;
  }

  get selectIds() {
    return this._selects;
  }

  get calendar() {
    const copyCalendar: CalendarType = {};
    Object.keys(this._calendar).forEach((ymd) => {
      copyCalendar[ymd] = this._calendar[ymd]
        .filter((event) => this.selectIds.includes(event.calendarId))
        .sort((a, b) => {
          const diff = b.colSpan - a.colSpan;
          return diff === 0
            ? this.calendarSort.indexOf(a.calendarId) -
                this.calendarSort.indexOf(b.calendarId)
            : diff;
          // const diff = DateUtil.diffDay(a.startDt, b.startDt);
          // diff === 0
          //   ? DateUtil.diffDay(new Date(b.endDt), new Date(b.startDt)) -
          //       DateUtil.diffDay(new Date(a.endDt), new Date(a.startDt)) -
          //(this.calendarSort.indexOf(b.calendarId) -
          //         this.calendarSort.indexOf(a.calendarId))
          //   : diff;
        });
    });
    return copyCalendar;
  }

  get holidayMap() {
    return this._holidayMap;
  }

  getCalendarData(calendarId: string) {
    return this.calendarMap[calendarId];
  }
  setDate(date: Date) {
    this._date = date;
  }

  setUserCalendars(calendars: CalendarUsr[]) {
    this._userCalendars = calendars;
    this._selects = [...this._commonCalendars, ...calendars].map(
      ({ calendarId }) => calendarId
    );
  }

  setSelctes(selectIds: string[]) {
    this._selects = selectIds;
  }

  setCalendar(calendar: CalendarType) {
    this._calendar = calendar;
  }

  *syncCommonCalendar() {
    const { data: calendars } = yield axios.get("/diary/calendar/common");
    console.log(calendars);
    this._commonCalendars = calendars as Calendar[];
  }

  *syncHolidays() {
    const date = this.date;
    const holidayMap: {
      [key: string]: { name: string; kind: string; holidayYn: YN }[];
    } = {};
    const {
      data: specialDays,
    }: {
      data: {
        locDate: number;
        sno: number;
        name: string;
        kind: string;
        holidayYn: YN;
      }[];
    } = yield axios.get(`/diary/special/${date.getFullYear()}`);
    specialDays.forEach(({ locDate, sno, ...data }) => {
      if (sno === 0) {
        holidayMap[locDate] = [data];
      } else {
        holidayMap[locDate].push(data);
      }
    });
    this._holidayMap = holidayMap;
  }

  async syncCalendar() {
    const { date, calendars } = this;
    const calendar: {
      [key: string]: ICalendarEvent[];
    } = {};
    const yyyymm = DateUtil.format(date, "yyyyMM");

    const calendarStartDt = DateUtil.getCalendarStartDay(date);
    const calendarEndDt = DateUtil.getCalendarLastDay(date);

    await Promise.all(
      calendars.map(async ({ calendarId }) => {
        const { data: events } = await axios.get<EventDetail[]>(
          `/diary/calendar/${calendarId}/event?yyyymm=${yyyymm}`
        );

        events.forEach(({ startDt: _startDt, endDt: _endDt, ...event }) => {
          const startDt = new Date(_startDt);
          const endDt = new Date(_endDt);

          const isBefore = DateUtil.diffDay(calendarStartDt, startDt) > 0;
          const isAfter = DateUtil.diffDay(endDt, calendarEndDt) > 0;

          let ymd: string = DateUtil.format(startDt, "yyyyMMdd");
          let colSpan: number = DateUtil.diffDay(endDt, startDt) + 1;
          let diffWeek = DateUtil.diffWeek(endDt, startDt);
          if (isBefore) {
            diffWeek = DateUtil.diffWeek(endDt, calendarStartDt);
          } else if (isAfter) {
            diffWeek = DateUtil.diffWeek(calendarEndDt, startDt);
          }

          if (diffWeek === 0) {
            if (isBefore) {
              ymd = DateUtil.format(calendarStartDt, "yyyyMMdd");
              colSpan = DateUtil.diffDay(endDt, calendarStartDt) + 1;
            } else if (isAfter) {
              ymd = DateUtil.format(startDt, "yyyyMMdd");
              colSpan = DateUtil.diffDay(calendarEndDt, startDt) + 1;
            }

            const data = {
              ...event,
              calendarId,
              colSpan,
              startDt,
              endDt,
              eventStartDt: startDt,
            };

            if (calendar[ymd]) {
              calendar[ymd].push(data);
            } else {
              calendar[ymd] = [data];
            }
          } else {
            for (let i = 0; i < diffWeek + 1; i++) {
              const eventStartDt =
                i === 0
                  ? isBefore
                    ? calendarStartDt
                    : startDt
                  : DateUtil.getStartWeekDay(
                      DateUtil.addDay(
                        isBefore ? calendarStartDt : startDt,
                        i * 7
                      )
                    );
              const weekLastDt = DateUtil.getLastWeekDay(eventStartDt);

              const eventEnd =
                DateUtil.diffDay(weekLastDt, endDt) > 0
                  ? isAfter
                    ? calendarEndDt
                    : endDt
                  : weekLastDt;

              ymd = DateUtil.format(eventStartDt, "yyyyMMdd");
              colSpan = DateUtil.diffDay(eventEnd, eventStartDt) + 1;

              const data = {
                ...event,
                calendarId,
                colSpan,
                startDt,
                endDt,
                eventStartDt,
              };

              if (calendar[ymd]) {
                calendar[ymd].push(data);
              } else {
                calendar[ymd] = [data];
              }
            }
          }
        });
      })
    );
    runInAction(() => {
      this.setCalendar(calendar);
    });
  }
}

const calendarStore = new CalendarStore();

export default calendarStore;
