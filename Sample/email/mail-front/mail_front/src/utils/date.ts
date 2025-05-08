import { IHolidayResponse } from "../components/commondatepicker/CommonDatePicker.type";

import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInMonths,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getWeekOfMonth,
  isSameDay,
  isSameMonth,
  isToday,
  lastDayOfWeek,
  parseISO,
  set,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
// import ko from "date-fns/locale/ko";

/**
 * @apinote 날짜유틸
 * @author  engadori
 */
export const dateUtil = {
  /**
   * 해당일의 0시 데이터 리턴
   *
   * @param   date : 날짜
   * @returns {date}
   */
  startOfDay(date: Date | number) {
    return startOfDay(date);
  },

  /**
   *  해당연도의 1월 1일 0시 리턴
   * @param   date : 날짜
   * @returns {date}
   */
  startOfYear(date: Date | number) {
    return startOfYear(date);
  },

  /**
   *  해당연도의 12월 31일 0시 리턴
   * @param   date : 날짜
   * @returns {date}
   */
  endOfYear(date: Date | number) {
    return endOfYear(date);
  },

  /**
   * 해당 월의 시작일 0시 리턴
   *
   * @param   date : 날짜
   * @returns {date}
   */
  startOfMonth(date: Date | number) {
    return startOfMonth(date);
  },

  /**
   * 해당 월의 마지막 날짜 0시 리턴
   * @param   date : 날짜
   * @returns {date}
   */
  endOfMonth(date: Date | number) {
    return endOfMonth(date);
  },

  /**
   * 해당 주의 첫날 0시 리턴
   *
   * @param   date : 날짜
   * @returns {date}
   */
  startOfWeek(date: Date | number) {
    return startOfWeek(date);
  },

  /**
   * 해당 주의 마지막날 0시 리턴
   *
   * @param   date : 날짜
   * @returns {date}
   */
  endOfWeek(date: Date | number) {
    return endOfWeek(date);
  },

  /**
   * 날짜 포맷 변경
   *
   * @param   date    : 날짜
   * @param   format  : 포맷
   * @returns {string}
   */
  dateFormat(date: Date | string | number | null, formatString: string) {
    if (date) {
      if (date instanceof Date) {
        return format(date, formatString, {});
      } else {
        return format(new Date(date), formatString, {});
      }
    }
  },

  /**
   * 날짜문자열을 Date형태로 변경 ('yyyy-mm-dd' -> {Date})
   *
   * @param   ymd : 날짜 문자열
   * @returns {Date}
   */
  stringToDate(ymd?: string) {
    if (ymd) {
      return parseISO(ymd.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    }
    return new Date();
  },

  /**
   * 날짜 빌더
   *
   * @param   date    : 기준 날짜
   * @param   option  : 날짜 옵션
   * @returns {Date}
   */
  dateBuilder(
    date: Date,
    option: {
      year?: number;
      month?: number;
      date?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
    },
  ) {
    return set(date, option);
  },

  /**
   * 날짜 차이 계산
   *
   * @param date1 : 날짜
   * @param date2 : 비교대상날짜
   * @note  date1이 date2보다 미래일자일경우 양수 리턴
   * @note  date1이 date2보다 과거일자일경우 음수 리턴
   * @note  date1과 date2 일자가 같을경우 0 리턴
   *
   * @returns {number}
   */
  diffDay(date1: Date | number, date2: Date | number) {
    return differenceInCalendarDays(date1, date2);
  },

  /**
   * 월 차이 계산
   *
   * @param date1 : 날짜
   * @param date2 : 비교대상날짜
   */
  diffMonth(date1: Date | number, date2: Date | number) {
    return differenceInMonths(date1, date2);
  },

  /**
   * 입력 날짜가 몇째 주인지 계산
   *
   * @param   date : 입력날짜
   * @returns { 0 | 1 | 2 | 3 | 4 | 5 | 6 }
   */
  getWeekOfMonth(date: Date) {
    return getWeekOfMonth(date);
  },

  /**
   * 입력날짜 당주의 마지막 날짜 리턴
   *
   * @param   date  : 입력날짜
   * @returns {Date}
   */
  getLastDayOfWeek(date: Date) {
    return endOfWeek(date);
  },

  /**
   * 입력날짜 당월의 마지막 날짜 리턴
   * @param   date  : 입력날짜
   * @returns {Date}
   */
  getLastDayOfMonth(date: Date) {
    return endOfMonth(date);
  },

  /**
   * 입력날짜 연도 연산
   * @param date : 기준일
   * @param num  : 피연산
   * @returns
   */
  addYear(date: Date | number, num: number) {
    return addYears(date, num);
  },
  /**
   * 입력날짜 월 연산
   * @param date : 기준일
   * @param num  : 피연산
   * @returns
   */
  addMonth(date: Date | number, num: number) {
    return addMonths(date, num);
  },

  /**
   * 입력날짜 주 연산
   * @param date : 기준일
   * @param num  : 피연산
   */
  addWeek(date: Date | number, num: number) {
    return addWeeks(date, num);
  },

  /**
   * 입력날짜 일 연산
   * @param date : 기준일
   * @param num  : 피연산
   * @returns
   */
  addDay(date: Date | number, num: number) {
    return addDays(date, num);
  },
  /**
   * 입력시간 연산 (시간)
   *
   * @param date : 기준일
   * @param num  : 피연산(시간)
   * @returns
   */
  addHour(date: Date | number, num: number) {
    if (date) {
      return addHours(date, num);
    }
    return addHours(new Date(), num);
  },
  /**
   * 입력시간 연산 (분)
   * @param date : 기준일
   * @param num  : 피연산(분)
   * @returns
   */
  addMin(date: Date | number, num: number) {
    return addMinutes(date, num);
  },
  /**
   * 입력된 날짜가 오늘날짜인지 리턴
   * @param   date : 날짜
   * @returns {Boolean}
   */
  isToday(date: Date | number | null) {
    if (date) {
      return isToday(date);
    }
    return false;
  },
  /**
   * 같은 년도, 월인지 비교
   * @param date1 : 날짜
   * @param date2 : 비교대상날짜
   */
  isSameMonth(date1: Date, date2: Date) {
    return isSameMonth(date1, date2);
  },
  /**
   * 같은 년도, 월, 일자인지 비교
   * @param date1 : 날짜
   * @param date2 : 비교대상날짜
   */
  isSameDay(date1: Date | number, date2: Date | number) {
    return isSameDay(date1, date2);
  },
  /**
   * 비교대상일이 비교시작일과 비교종료일 사이에 있는지 리턴
   *
   * @param startDate 비교 시작일 (연도,월,일,시간,분,초) // tODO: 밀리세컨드 제외하기
   * @param diffDate  비교 대상일 (연도,월,일,시간,분,초)
   * @param endDate   비교 종료일 (연도,월,일,시간,분,초)
   */
  isBetween(startDate: Date, diffDate: Date, endDate: Date) {
    return startDate.getTime() < diffDate.getTime() && diffDate.getTime() < endDate.getTime();
    // const startDateString = format(startDate, "yyyyMMddHHmm");
    // const diffDateString = format(diffDate, "yyyyMMddHHmm");
    // const endDateString = format(endDate, "yyyyMMddHHmm");

    // return startDateString < diffDateString && diffDateString < endDateString;
  },

  // 해당 달, 주에 해당하는 시작일자 리턴
  getCalendarStartDay(date: Date) {
    return startOfWeek(startOfMonth(date));
  },
  // 해당 달, 주에 해당하는 마지막일자 리턴
  getCalendarLastDay(date: Date) {
    return set(lastDayOfWeek(endOfMonth(date)), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    });
  },
  // 달력데이터 생성
  getCalendar(date: Date, holidayList?: IHolidayResponse[]) {
    const weekList: {
      day: string;
      isEmpty: boolean;
      value: Date;
      ymd: string;
      holidayYn: boolean;
      holidayNm?: string;
    }[][] = [];

    // 반복 돌릴 마지막 지점
    const monthLastDay = addDays(this.getCalendarLastDay(date), 1);
    // 일자 담을 리스트
    let dayList = [];
    // 반복 돌릴 시작 지점
    let day = this.getCalendarStartDay(date);
    // 같아질때까지 반복
    isSameDay(day, monthLastDay);
    while (!isSameDay(day, monthLastDay)) {
      dayList.push({
        day: format(day, "dd"),
        isEmpty: !isSameMonth(day, date),
        value: day,
        ymd: format(day, "yyyyMMdd"),
        holidayYn:
          holidayList?.find(
            (holiday) => holiday?.locDate?.toString() === this.dateFormat(day, "yyyyMMdd"),
          )?.holidayYn === "Y",
        holidayNm: holidayList?.find(
          (holiday) => holiday?.locDate?.toString() === this.dateFormat(day, "yyyyMMdd"),
        )?.name,
      });
      // 7일마다 배열 넣고 초기화
      if (dayList.length === 7) {
        weekList.push(dayList);
        dayList = [];
      }
      day = addDays(day, 1);
    }
    return weekList;
  },

  betweenDateList(
    startDate: Date,
    endDate: Date,
    type?: "year" | "month" | "date",
    includeLastDate?: boolean,
  ) {
    if (!type) {
      type = "date";
    }
    let dateList: Date[] = [];
    let currentDate: Date = startDate;

    switch (type) {
      case "year":
        while (
          includeLastDate
            ? currentDate.getFullYear() <= endDate.getFullYear()
            : currentDate.getFullYear() < endDate.getFullYear()
        ) {
          dateList.push(currentDate);
          currentDate = this.addYear(currentDate, 1);
        }
        break;
      case "month":
        while (
          includeLastDate
            ? Number(this.dateFormat(currentDate, "yyyyMM")) <=
              Number(this.dateFormat(endDate, "yyyyMM"))
            : Number(this.dateFormat(currentDate, "yyyyMM")) < Number(this.dateFormat(endDate, "yyyyMM"))
        ) {
          dateList.push(currentDate);
          currentDate = this.addMonth(currentDate, 1);
        }
        break;
      case "date":
        while (
          includeLastDate
            ? this.diffDay(currentDate, endDate) <= 0
            : this.diffDay(currentDate, endDate) < 0
        ) {
          dateList.push(currentDate);
          currentDate = this.addDay(currentDate, 1);
        }
        break;
    }
    return dateList;
  },
};
