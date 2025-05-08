import { Injectable } from '@nestjs/common';
import { getSolar } from '@utils/date.util';
import { addDays, format, isSameDay, isSaturday, isSunday } from 'date-fns';
import { DateDTO } from './dto/date.dto';

// 양력 공휴일
const solarPubHoliDaysSet = ['01-01', '03-01','05-01', '05-05', '06-06', '08-15', '10-03', '10-09', '12-25'];
// const solarPubHoliDays = ['01-01', '03-01', '05-05', '06-06', '08-15', '10-03', '10-09', '12-25'];
// 01-01 음력설 04-08 부처님오신날 08-15 추석
const lunarPubHoliDaysSet = ['01-01', '04-08', '08-15'];
// 양력 대체공휴일 ( 토 - 일 )
const alternativeSolarDaysSet = ['03-01', '05-05', '08-15', '10-03', '10-09'];
// 음력 대체공휴일 ( 토 - 일 )
const alternativeLunarDaysSet = ['01-01', '08-15'];

@Injectable()
export class DateBiz {
  getSumHoliDays(year: number): [Date[], [Date, Date][]] {
    // 특별 공휴일 추가를 위해 배열 복사후 추가
    const solarPubHoliDays =  Array.from(solarPubHoliDaysSet);
    const lunarPubHoliDays =  Array.from(lunarPubHoliDaysSet);
    const alternativeSolarDays =  Array.from(alternativeSolarDaysSet);
    const alternativeLunarDays = Array.from(alternativeLunarDaysSet);
    if(year == 2022){
      solarPubHoliDays.push('03-09'); // 대통령선거일
      solarPubHoliDays.push('06-01'); // 전국동시지방선거
    }
    if(year > 2022){
      if(year == 2023) {
        solarPubHoliDays.push('10-02'); // 추석연휴 임시공휴일
      }
      alternativeSolarDays.push('12-25'); // 23년부터 크리스마스 대체공휴일 !!
      alternativeLunarDaysSet.push('04-08'); // 붓다 오신날도 대체공휴일
    }  

    if (year == 2024) {
      solarPubHoliDays.push('04-10'); // 제22대 국회의원 선거
      solarPubHoliDays.push('10-01'); // 국군의날(임시공휴일 내년부터는 전체로 바뀔수도 있음!) 
    }

    if (year == 2025) {
      solarPubHoliDays.push('01-27'); // 설연휴 임시공휴일 지정 !! 
    }

    // 양력 공휴일 설정
    const holiDays = solarPubHoliDays.map((day) => new Date(`${year}-${day}`));
    const alternativeDays = [];
    // 음력 공휴일 설정
    lunarPubHoliDays.forEach((day) => {
      // 음력 -> 양력 년 월 일 가져오기
      const { solYear, solMonth, solDay } = getSolar(year, day.substring(0, 2), day.substring(3, 5));
      const date = new Date(`${solYear}-${solMonth.toString().padStart(2, '0')}-${solDay.toString().padStart(2, '0')}`);
      holiDays.push(date);
      // 음력 -> 양력 변환 된것과 양력 공휴일이 같을 경우
      if (solarPubHoliDays.some((day) => isSameDay(date, new Date(`${year}-${day}`)))) {
        if (day === '01-01' || day === '08-15') {
          // 설날, 추석 당일의 경우 대체공휴일 이틀뒤에 추가한다.
          alternativeDays.push([addDays(date, 2), date]);
        } else {
          // 대체공휴일 하루 추가한다.
          alternativeDays.push([addDays(date, 1), date]);
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
              (day) =>
                isSameDay(beforeDate, new Date(`${year}-${day}`)) || isSameDay(afterDate, new Date(`${year}-${day}`)),
            ) ||
            isSunday(beforeDate) ||
            isSunday(date) ||
            isSunday(afterDate)
          ) {
            alternativeDays.push([addDays(afterDate, 1), afterDate]);
          }
          //아닐 경우 토요일이나 일요일에 속하면
        } else if (isSaturday(date)) {
          alternativeDays.push([addDays(date, 2), date]);
        } else if (isSunday(date)) {
          alternativeDays.push([addDays(date, 1), date]);
        }
      }
    });

    // 양력 대체공휴일 넣기
    alternativeSolarDays.forEach((day) => {
      const date = new Date(`${year}-${day}`);
      if (isSaturday(date)) {
        alternativeDays.push([addDays(date, 2), date]);
      }
      if (isSunday(date)) {
        alternativeDays.push([addDays(date, 1), date]);
      }
    });

    return [
      holiDays.sort((date1, date2) => date1.getTime() - date2.getTime()),
      alternativeDays.sort(([date1], [date2]) => date1.getTime() - date2.getTime()),
    ];
  }

  getPubHoliDays({ startDt, endDt }: DateDTO) {
    if (endDt >= startDt) {
      const startYear = startDt.getFullYear();
      const endYear = endDt.getFullYear();
      const diffYear = endYear - startYear;
      // 시작일 , 종료일 이에 있는것만 가져오는 함수
      const pubHoliDays: {
        year: string;
        month: string;
        day: string;
        dateStr: string;
        time: number;
        isAlternative: boolean;
        weekDay: number;
        alternativeDate?: number;
      }[] = [];

      for (let i = 0; i <= diffYear; i++) {
        const [holiDays, alternativeDays] = this.getSumHoliDays(startYear + i);

        holiDays
          .filter((date: Date) => date.getTime() >= startDt.getTime() && date.getTime() <= endDt.getTime())
          .forEach((date) => {
            pubHoliDays.push({
              year: date.getFullYear().toString(),
              month: (date.getMonth() + 1).toString().padStart(2, '0'),
              day: date.getDate().toString().padStart(2, '0'),
              dateStr: format(date, 'yyyy-MM-dd'),
              time: date.getTime(),
              weekDay: date.getDay(),
              isAlternative: false,
              alternativeDate: alternativeDays.find(([_, d]) => d.getTime() === date.getTime())?.[0]?.getTime(),
            });
          });
        alternativeDays
          .filter(([date]) => date.getTime() >= startDt.getTime() && date.getTime() <= endDt.getTime())
          .forEach(([date]) => {
            pubHoliDays.push({
              year: date.getFullYear().toString(),
              month: (date.getMonth() + 1).toString().padStart(2, '0'),
              day: date.getDate().toString().padStart(2, '0'),
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
