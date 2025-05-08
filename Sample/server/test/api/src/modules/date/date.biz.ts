import { Injectable } from '@nestjs/common';
import { DateDTO } from './dto/date.dto';
import { getSolar } from '@utils/date.util';
import { isSunday, isSaturday, addDays, isSameDay, format } from 'date-fns';

// 양력 공휴일
const solarPubHoliDays = ['01-01', '03-01', '05-05', '06-06', '08-15', '10-03', '10-09', '12-25'];
// 01-01 음력설 04-08 부처님오신날 08-15 추석
const lunarPubHoliDays = ['01-01', '04-08', '08-15'];
// 양력 대체공휴일 ( 토 - 일 )
const alternativeSolarDays = ['05-05'];
// 음력 대체공휴일 ( 토 - 일 )
const alternativeLunarDays = ['01-01', '08-15'];

@Injectable()
export class DateBiz {
  getSumHoliDays(year: number): [Date[], Date[]] {
    // 양력 공휴일 설정
    const holiDays = solarPubHoliDays.map(day => new Date(`${year}-${day}`));
    const alternativeDays = [];
    // 음력 공휴일 설정
    lunarPubHoliDays.forEach(day => {
      // 음력 -> 양력 년 월 일 가져오기
      const { solYear, solMonth, solDay } = getSolar(year, day.substring(0, 2), day.substring(3, 5));
      const date = new Date(`${solYear}-${solMonth.toString().padStart(2, '0')}-${solDay.toString().padStart(2, '0')}`);
      holiDays.push(date);
      // 음력 -> 양력 변환 된것과 양력 공휴일이 같을 경우
      if (solarPubHoliDays.some(day => isSameDay(date, new Date(`${year}-${day}`)))) {
        if (day === '01-01' || day === '08-15') {
          // 설날, 추석 당일의 경우 대체공휴일 이틀뒤에 추가한다.
          alternativeDays.push(addDays(date, 2));
        } else {
          // 대체공휴일 하루 추가한다.
          alternativeDays.push(addDays(date, 1));
        }
      }
      // 음력 대체공휴일 지정에 속할 경우
      if (alternativeLunarDays.includes(day)) {
        // 설날, 추석에 걸릴 경우
        if (day === '01-01' || day === '08-15') {
          const beforeDate = addDays(date, -1);
          const afterDate = addDays(date, 1);
          holiDays.push(beforeDate, afterDate);
          // 3일 중 하루라도 일요일에 존재하거나, 양력 공휴일에 존재한다면l
          if (
            solarPubHoliDays.some(
              day =>
                isSameDay(beforeDate, new Date(`${year}-${day}`)) || isSameDay(afterDate, new Date(`${year}-${day}`)),
            ) ||
            isSunday(beforeDate) ||
            isSunday(date) ||
            isSunday(afterDate)
          ) {
            alternativeDays.push(addDays(afterDate, 1));
          }
          //아닐 경우 토요일이나 일요일에 속하면
        } else if (isSaturday(date)) {
          alternativeDays.push(addDays(date, 2));
        } else if (isSunday(date)) {
          alternativeDays.push(addDays(date, 1));
        }
      }
    });

    // 양력 대체공휴일 넣기
    alternativeSolarDays.forEach(day => {
      const date = new Date(`${year}-${day}`);
      if (isSaturday(date)) {
        alternativeDays.push(addDays(date, 2));
      }
      if (isSunday(date)) {
        alternativeDays.push(addDays(date, 1));
      }
    });

    return [
      holiDays.sort((date1, date2) => date1.getTime() - date2.getTime()),
      alternativeDays.sort((date1, date2) => date1.getTime() - date2.getTime()),
    ];
  }

  getPubHoliDays({ startDt, endDt }: DateDTO) {
    if (endDt >= startDt) {
      const startYear = startDt.getFullYear();
      const endYear = endDt.getFullYear();
      const diffYear = endYear - startYear;
      // 시작일 , 종료일 사이에 있는것만 가져오는 함수
      const isInDay = (date: Date) => date.getTime() >= startDt.getTime() && date.getTime() <= endDt.getTime();
      const pubHoliDays: {
        year: string;
        month: string;
        day: string;
        dateStr: string;
        time: number;
        isAlternative: boolean;
        weekDay: number;
      }[] = [];

      for (let i = 0; i <= diffYear; i++) {
        const [holiDays, alternativeDays] = this.getSumHoliDays(startYear + i);

        holiDays.filter(isInDay).forEach(date => {
          pubHoliDays.push({
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString().padStart(2, '0'),
            day: date
              .getDate()
              .toString()
              .padStart(2, '0'),
            dateStr: format(date, 'yyyy-MM-dd'),
            time: date.getTime(),
            weekDay: date.getDay(),
            isAlternative: false,
          });
        });
        alternativeDays.filter(isInDay).forEach(date => {
          pubHoliDays.push({
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString().padStart(2, '0'),
            day: date
              .getDate()
              .toString()
              .padStart(2, '0'),
            dateStr: format(date, 'yyyy-MM-dd'),
            time: date.getTime(),
            weekDay: date.getDay(),
            isAlternative: true,
          });
        });
      }
      return pubHoliDays.sort((a, b) => a.time - b.time);
    } else {
      return [];
    }
  }
}
