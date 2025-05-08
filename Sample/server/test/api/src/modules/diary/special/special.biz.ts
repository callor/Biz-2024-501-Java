import { IdSpecialDay } from '@entities/ade100/diary/id-special-day.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class SpecialBiz {
  constructor(
    @InjectRepository(IdSpecialDay)
    private readonly idSpecialDay: Repository<IdSpecialDay>,
  ) {}

  async getSpecialDays(year: number) {
    const searchStart = Number(year + '0101');
    const searchEnd = Number(year + '1231');

    return await this.idSpecialDay.find({ where: { locDate: Between(searchStart, searchEnd) } });
  }
}
