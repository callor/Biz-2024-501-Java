import { Role } from '@modules/auth/decorator/role.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { DiaryCompanyBiz } from './diary.biz';
import { CreateDiaryCompanyDTO, CreateDiaryCompanyParamDTO } from './dto/create-diary.dto';

@Controller('/namu/diary')
export class DiaryCompanyAction {
  constructor(private diaryCompanyBiz: DiaryCompanyBiz) {}

  @Post('company')
  @Role(ROLE_TYPE.APIKEY)
  async insert(@Body() createDiaryCompanyDTO: CreateDiaryCompanyDTO) {
    const result = await this.diaryCompanyBiz.insertData(createDiaryCompanyDTO);
    return result;
  }

  @Post('check')
  @Role(ROLE_TYPE.APIKEY)
  async checkData(@Body() {coid, dyear}: CreateDiaryCompanyParamDTO,) {
    return await this.diaryCompanyBiz.checkData(coid, dyear);
  }
}
