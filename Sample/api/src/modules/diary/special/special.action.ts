import { Role } from '@modules/auth/decorator/role.decorator';
import { Controller, Get, Param , Post, Body} from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { SpecialBiz } from './special.biz';
import { DateDTO } from '@modules/date/dto/date.dto';

@Role(ROLE_TYPE.PUBLIC)
@Controller('diary/special')
export class SpecialAction {
  constructor(private readonly specialBiz: SpecialBiz) {}


  @Get(':date')
  async getSpecialDays(@Param('date') date: number) {
      return await this.specialBiz.getSpecialDays(date);
  }

  @Post()
  getSpecialDaysByDTO(@Body() range: DateDTO) {
    return this.specialBiz.getSpecialDaysByDTO(range);;
  }
}
