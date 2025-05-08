import { Role } from '@modules/auth/decorator/role.decorator';
import LoggerService from '@modules/common/logger/logger.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { KakaoTalkSsDTO , KakaoTalkSsBatchDTO } from '../dto/kakaotalk-ss.dto';
import { KakaotalkSsBiz } from './kakaotalk-ss.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('kko/ss')
export class KakaoTalkSsAction {
  constructor(
    private readonly kakaoTalkSsBiz: KakaotalkSsBiz,
  ) {}

  // 급여지급명세서 알림발송
  @Post('/sendTalk')
  async sendPayDetails(@Body() ssDTO: KakaoTalkSsDTO) {
    try {
      
    return await this.kakaoTalkSsBiz.sendMessage(ssDTO);
    } catch (error) {
      return error;
    }  
  }
    // 급여지급명세서 알림발송
    @Post('/sendBatch')
    async sendPayBatch(@Body() ssDTO: KakaoTalkSsBatchDTO) {
      try {
        
      return await this.kakaoTalkSsBiz.sendBatchMessage(ssDTO);
      } catch (error) {
        return error;
      }  
    }
}
