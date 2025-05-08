import * as dateFns from "date-fns";

export class DateUtil {
  private static days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  private static localeDay = {
    ko: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
      "일요일",
    ],
  };
  private static localeWeek = {
    ko: ["첫번째", "두번째", "세번째", "네번째", "마지막", "마지막"],
  };
  static setDate(
    date: Date,
    option: {
      year?: number;
      month?: number;
      date?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    }
  ) {
    return dateFns.set(date, option);
  }

  static format(date: Date | string, format: string) {
    if (date instanceof Date) {
      return dateFns.format(date, format);
    } else {
      return dateFns.format(new Date(date), format);
    }
  }

  static addDay(date: Date, num: number) {
    return dateFns.addDays(date, num);
  }

  static addMonth(date: Date, num: number) {
    return dateFns.addMonths(date, num);
  }

  /**
   * @example
   * DateUtil.getDayAndTime(new Date(2020,11,1)) // ['2020-12-01', '00:00']
   */
  static getDayAndTime(date: Date) {
    return [this.format(date, "yyyy-MM-dd"), this.format(date, "HH:mm")];
  }

  /**
   * @example
   * DateUtil.formatLocale(new Date(2020,11,1)) // 2020.12.01 AM 00:00
   */
  static formatLocale(date: Date) {
    return dateFns.format(date, "yyyy.MM.dd a hh:mm");
  }

  /**
   * @example
   * DateUtil.isInvalidDate(new Date(2020,11,1)) // false
   * DateUtil.isInvalidDate(new Date(undefined)) // true
   */
  static isInvalidDate(date: Date) {
    return !date || isNaN(Number(date));
  }

  static getWeekOfMonth(date: Date) {
    return dateFns.getWeekOfMonth(date);
  }

  static getLastMonthDay(date: Date) {
    return dateFns.endOfMonth(date);
  }

  static getStartCalendarDay(date: Date) {
    return dateFns.startOfWeek(dateFns.startOfMonth(date));
  }

  static getStartWeekDay(date: Date) {
    return dateFns.startOfWeek(date);
  }

  static getLastWeekDay(date: Date) {
    return dateFns.lastDayOfWeek(date);
  }

  /**
   *
   * @param date1 기준날짜
   * @param date2 비교할날짜
   * @example
   * DateUtil.diffWeek(new Date(2020,10,30),new Date(2020,10,1))   ---> 4
   */
  static diffWeek(date1: Date, date2: Date) {
    return dateFns.differenceInCalendarWeeks(date1, date2);
  }

  static getDayType(day: number) {
    return this.days[day];
  }

  static weekToLocale(day: number, locale = "ko"): string {
    return this.localeWeek[locale][day - 1];
  }

  static dayToLocale(day: number, locale = "ko"): string {
    return this.localeDay[locale][day];
  }
  /**
   *
   * @param date1 기준 날짜
   * @param date2 비교할 날짜
   * @example
   * DateUtil.diffDay(new Date(2020,1,5), new Date(2020,1,3))  ---->  2
   */
  static diffDay(date1: Date, date2: Date) {
    return dateFns.differenceInCalendarDays(date1, date2);
  }

  static getCalendarStartDay(date: Date) {
    return dateFns.startOfWeek(dateFns.startOfMonth(date));
  }

  static getCalendarLastDay(date: Date) {
    return dateFns.lastDayOfWeek(dateFns.endOfMonth(date));
  }

  // 달력
  static getCalendar(date: Date) {
    // 결과 담을 리스트
    const weekList: {
      day: string;
      isEmpty: boolean;
      value: Date;
      ymd: string;
    }[][] = [];
    // 반복 돌릴 마지막 지점
    const monthLastDay = this.addDay(this.getCalendarLastDay(date), 1);
    // 일자 담을 리스트
    let dayList = [];
    // 반복 돌릴 시작 지점
    let day = this.getCalendarStartDay(date);
    // 같아질때까지 돌린다.
    dateFns.isSameDay(day, monthLastDay);
    while (!dateFns.isSameDay(day, monthLastDay)) {
      dayList.push({
        day: this.format(day, "dd"),
        isEmpty: !dateFns.isSameMonth(day, date),
        value: day,
        ymd: this.format(day, "yyyyMMdd"),
      });
      // 7일 마다 배열을 넣고 새로 초기화
      if (dayList.length === 7) {
        weekList.push(dayList);
        dayList = [];
      }

      day = this.addDay(day, 1);
    }
    return weekList;
  }
}
