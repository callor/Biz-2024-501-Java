import config from '@config';
import { IdSpecialDay } from '@entities/ade100/diary/id-special-day.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(IdSpecialDay) private readonly idSpecialDay: Repository<IdSpecialDay>,
    private readonly logger: LoggerService,
  ) {}
  // 특일 동기화 ( 매일 오전 1시 )
  @Cron('0 0 1 * * *')
  async syncSpecialDay() {
    this.logger.log('특일 정보 동기화 작업 시작');
    const apikey = config.schedule.specialDayApikey;
    const year = new Date().getFullYear();
    for (let searchYear = year; searchYear < year + 2; searchYear++) {
      // 국경일
      const getHoliDeInfoURL = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?_type=json&solYear=${searchYear}&numOfRows=500&ServiceKey=${apikey}`;
      // 기념일
      const getAnniversaryInfoURL = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo?_type=json&solYear=${searchYear}&numOfRows=500&serviceKey=${apikey}`;
      const {
        data: {
          response: {
            body: {
              items: { item: holidayInfoList },
            },
          },
        },
      } = await axios.get(getHoliDeInfoURL);
      const {
        data: {
          response: {
            body: {
              items: { item: anniversaryInfoList },
            },
          },
        },
      } = await axios.get(getAnniversaryInfoURL);

      await this.idSpecialDay.delete({ locDate: Like<any>(searchYear + '%') });
      const insertList: SpecialDayItem[] = [...holidayInfoList, ...anniversaryInfoList];
      for await (const item of insertList) {
        // 순서
        const sno = await this.idSpecialDay.count({ where: { locDate: item.locdate } });
        await this.idSpecialDay.insert({
          sno,
          locDate: item.locdate,
          name: item.dateName,
          holidayYn: item.isHoliday,
          kind: item.dateKind,
        });
      }
    }
    this.logger.log('특일 정보 동기화 작업 완료');
  }
}
