import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { DiarySettingBiz } from './setting.biz';
import { FastifyRequest } from 'fastify';
import { UpdateSettingDTO } from './dto/update-setting.dto';
@Controller('/diary/setting')
export class DiarySettingAction {
  constructor(private readonly settingBiz: DiarySettingBiz) {}

  @Get()
  async getUserDiarySetting(@Request() req: FastifyRequest) {
    return await this.settingBiz.getSetting(req.user.userId);
  }
  @Patch('/todoEndShow')
  async updateTodoEnd(@Request() req: FastifyRequest, @Body() settingDTO: UpdateSettingDTO) {
    await this.settingBiz.updateTodoEndShow({ ...settingDTO, userId: req.user.userId });
  }
}
