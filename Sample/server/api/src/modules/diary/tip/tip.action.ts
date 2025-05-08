import { Role } from '@modules/auth/decorator/role.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { TipDTO } from './dto/tip.dto';
import { TipBiz } from './tip.biz';

@Role(ROLE_TYPE.ADMIN)
@Controller('diary/tip')
export class TipAction {
  constructor(private readonly tipBiz: TipBiz) {}

  @Get(':month')
  @Role(ROLE_TYPE.PUBLIC)
  async getTip(@Param('month') month: number) {
    month = !month || isNaN(month) ? parseInt(DateUtil.format(new Date(), 'yyyyMM')) : month;
    return await this.tipBiz.getTip(month);
  }

  @Get()
  async getTipList() {
    return await this.tipBiz.getTipList();
  }
  @Get('detail/:tipId')
  async getTipDetail(@Param('tipId') tipId: string) {
    return await this.tipBiz.getTipDetail(tipId);
  }

  @Post()
  async createTip(@Body() tipDTO: TipDTO) {
    await this.tipBiz.insert(tipDTO);
  }

  @Put()
  async updateTip(@Body() tipDTO: TipDTO) {
    await this.tipBiz.update(tipDTO);
  }

  @Delete(':tipId')
  async deleteTip(@Param('tipId') tipId: string) {
    await this.tipBiz.delete(tipId);
  }

  @Post('delete')
  async deleteTips(@Body('tipIds') tipIds: string[]) {
    await this.tipBiz.deleteItems({ tipIds });
  }
}
