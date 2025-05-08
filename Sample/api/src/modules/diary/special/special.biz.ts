import { IdSpecialDay } from '@entities/ade100/diary/id-special-day.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DateDTO } from '@modules/date/dto/date.dto';
import DateUtil from '@utils/date.util';

@Injectable()
export class SpecialBiz {
  constructor(
    @InjectRepository(IdSpecialDay)
    private readonly idSpecialDay: Repository<IdSpecialDay>,
  ) {}

  async getSpecialDays(date: number) {
    const thisYear = Number(DateUtil.format(new Date(), 'yyyy'));
    let searchStart = 0;
    let searchEnd = 0;
    let param = date.toString();
    if(date && !isNaN(date) && param.length >=4 ){
      if (param.length > 4) {
        param = param.substring(0,6);
        searchStart = Number(param + '01');
        searchEnd = Number(param + '31');
      }else{
        searchStart = Number(param + '0101');
        searchEnd = Number(param + '1231');
      }
    }else{
       searchStart = Number(thisYear + '0101');
       searchEnd = Number(thisYear + '1231');
    }
    
    return await this.idSpecialDay.find({ where: { locDate: Between(searchStart, searchEnd) } });
  }

  async getSpecialDaysByDTO({ startDt, endDt }: DateDTO) {
    const searchStart = Number(DateUtil.format(startDt, 'yyyyMMdd'));
    const searchEnd = Number(DateUtil.format(endDt, 'yyyyMMdd'));;

    return await this.idSpecialDay.find({ where: { locDate: Between(searchStart, searchEnd) } });
  }
}
