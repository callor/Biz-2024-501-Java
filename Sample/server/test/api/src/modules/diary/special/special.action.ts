import { Role } from '@modules/auth/decorator/role.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { SpecialBiz } from './special.biz';

@Controller('diary/special')
export class SpecialAction {
  constructor(private readonly specialBiz: SpecialBiz) {}

  @Get(':year')
  @Role(ROLE_TYPE.PUBLIC)
  async getSpecialDays(@Param('year') year: number) {
    year = year && !isNaN(year) ? year : new Date().getFullYear();
    return await this.specialBiz.getSpecialDays(year);
  }
}
