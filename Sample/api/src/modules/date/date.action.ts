import { Role } from './../auth/decorator/role.decorator';
import { DateDTO } from './dto/date.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { DateBiz } from './date.biz';
import { ROLE_TYPE } from '@utils/constants';

@Role(ROLE_TYPE.PUBLIC)
@Controller('date')
export class DateAction {
  constructor(private readonly dateBiz: DateBiz) {}

  @Post('holiday')
  getHolidays(@Body() range: DateDTO) {
    const pubHoliDays = this.dateBiz.getPubHoliDays(range);
    return pubHoliDays;
  }
}
