import { CreateRepeatDTO } from '@modules/diary/calendar/event/dto/create-repeat.dto';
import DateUtil from './date.util';

export class KmemoUtil {
  static getNextEventDt(date: Date, repeat: CreateRepeatDTO) {
    let nextEventDt: Date;
    const { type, num, byWeek, byDay } = repeat;
    if (type === 'D' || type === 'W') {
      nextEventDt = DateUtil.addDay(date, type === 'W' ? num * 7 : num);
    } else {
      nextEventDt = DateUtil.addMonth(date, type === 'Y' ? num * 12 : num);
      if (byWeek && byDay) {
        const monthStart = DateUtil.set(nextEventDt, { date: 1 });
        const monthLast = DateUtil.getLastDayOfMonth(monthStart);
        // 몇번째 주 세팅
        nextEventDt = byWeek !== '5' ? DateUtil.addDay(monthStart, (Number(byWeek) - 1) * 7) : monthLast;
        // 요일 조정
        nextEventDt = DateUtil.setDayOfWeek(nextEventDt, byDay);

        // 달을 넘어가면 빼준다
        if (DateUtil.diffMonth(monthStart, nextEventDt) !== 0) {
          const diff = DateUtil.diffMonth(monthStart, nextEventDt);
          if (diff > 0) {
            nextEventDt = DateUtil.addDay(nextEventDt, 7);
          } else {
            nextEventDt = DateUtil.addDay(nextEventDt, -7);
          }
        }
      }
    }
    return nextEventDt;
  }

  static getNextEventDtAfterBaseDt({
    eventDt,
    baseDt,
    option,
  }: {
    eventDt: Date;
    baseDt: Date;
    option: CreateRepeatDTO;
  }) {
    if (baseDt.getTime() <= eventDt.getTime()) {
      return eventDt;
    }
    const { type, byDay, byWeek, num } = option;

    if (type === 'D' || type === 'W') {
      // 이벤트 일자와 베이스 일자 비교
      const diff = DateUtil.diffDay(baseDt, eventDt);
      const repeatDay = type === 'W' ? num * 7 : num;
      const addDay = diff % repeatDay;
      return DateUtil.addDay(baseDt, addDay === 0 ? 0 : repeatDay - addDay);
    } else {
      // 이벤트 월 와 베이스 월 비교
      const diff = DateUtil.diffMonth(baseDt, eventDt);
      const repeatMonth = type === 'Y' ? num * 12 : num;
      const addMonth = diff % repeatMonth;
      // 일정 시작 월 찾아오기
      const nextEventMonth = DateUtil.addMonth(baseDt, addMonth === 0 ? 0 : repeatMonth - addMonth);
      // 주 , 요일이 선택되어 있는 경우
      if (byWeek && byDay) {
        const monthStart = DateUtil.set(nextEventMonth, { date: 1 });
        const monthLast = DateUtil.set(DateUtil.getLastDayOfMonth(monthStart), {
          date: eventDt.getDate(),
          hours: eventDt.getHours(),
          minutes: eventDt.getMinutes(),
          seconds: 0,
        });

        // 몇번째 주 세팅
        let nextEventDt = byWeek !== '5' ? DateUtil.addDay(monthStart, (Number(byWeek) - 1) * 7) : monthLast;

        // 요일 조정
        nextEventDt = DateUtil.setDayOfWeek(nextEventDt, byDay);

        // 달을 넘어가면 빼준다
        if (DateUtil.diffMonth(monthStart, nextEventDt) !== 0) {
          const diff = DateUtil.diffMonth(monthStart, nextEventDt);
          if (diff > 0) {
            nextEventDt = DateUtil.addDay(nextEventDt, 7);
          } else {
            nextEventDt = DateUtil.addDay(nextEventDt, -7);
          }
        }
        return nextEventDt;
      } else {
        return DateUtil.set(nextEventMonth, {
          date: eventDt.getDate(),
          hours: eventDt.getHours(),
          minutes: eventDt.getMinutes(),
          seconds: 0,
        });
      }
    }
  }
}
