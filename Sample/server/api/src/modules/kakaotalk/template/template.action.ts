import { Role } from '@modules/auth/decorator/role.decorator';
import LoggerService from '@modules/common/logger/logger.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { CreateKakaoMessageDTO } from './dto/create-kakao-message.dto';
import { UpdateKakaoMessageDTO } from './dto/update-kakao-message.dto';
import { TemplateBiz } from './template.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('kko/template')
export class TemplateAction {
  constructor(private readonly templateBiz: TemplateBiz, private readonly logger: LoggerService) {}

  @Post()
  async createTemplate(@Body() messageDTO: CreateKakaoMessageDTO) {
    return await this.templateBiz.insertTemplate(messageDTO);
  }

  @Put()
  async updateTemplate(@Body() messageDTO: UpdateKakaoMessageDTO) {
    await this.templateBiz.updateTemplate(messageDTO);
  }

  @Delete('/:messaegId')
  async deleteTemplate(@Param('messageId') messageId: string) {
    await this.templateBiz.deleteTemplate(messageId);
  }

  @Get(':smsType')
  async getTemplateBySmsType(@Param('smsType') smsType: string) {
    return await this.templateBiz.getTemplateBySmsType(smsType);
  }

  @Get('/kakaoIdx/:kakaoIdx')
  async getTemplate(@Param('kakaoIdx') kakaoIdx: string) {
    return await this.templateBiz.getTemplate(kakaoIdx);
  }

  @Get()
  async getTemplateList() {
    return await this.templateBiz.getTemplateList();
  }
}
