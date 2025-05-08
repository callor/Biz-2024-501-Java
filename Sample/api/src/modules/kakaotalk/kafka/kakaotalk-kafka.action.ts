import { Role } from '@modules/auth/decorator/role.decorator';
import LoggerService from '@modules/common/logger/logger.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { KakaoTalkKafkaDTO, KakaoTalkKafkaGojiDTO } from '../dto/kakaotalk-kafka.dto';
import { KakaotalkKafkaBiz } from './kakaotalk-kafka.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('kko/kafka')
export class KakaoTalkKafkaAction {
  constructor(
    private readonly kakaotalkKafkaBiz: KakaotalkKafkaBiz,
  ) {}

  // 고지서발급현황 알림발송
  @Post('/sendTalk')
  async sendTalkDetails(@Body() kafkaDTO: KakaoTalkKafkaDTO) {
    try {
      
    return await this.kakaotalkKafkaBiz.sendMessage(kafkaDTO);
    } catch (error) {
      return {responseCode : ''};     
   } 
 }

 // 고용산재 고지서 알림발송
 @Post('/sendGojiTalk')
 async sendGojiDetails(@Body() kafkaDTO: KakaoTalkKafkaGojiDTO) {
   try {
     
   return await this.kakaotalkKafkaBiz.sendGojiMessage(kafkaDTO);
   } catch (error) {
     return {responseCode : ''};     
  } 
}
}
