import LoggerService from '@modules/common/logger/logger.service';
import { Role } from './../auth/decorator/role.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { KakaoTalkBodyDTO } from './dto/kakaotalk.dto';
import { KakaoTalkBiz } from './kakaotalk.biz';
import { ROLE_TYPE } from '@utils/constants';

@Role(ROLE_TYPE.APIKEY)
@Controller('kko')
export class KakaoTalkAction {
  constructor(private readonly kakaoTalkBiz: KakaoTalkBiz, private readonly logger: LoggerService) {}

  @Post('sendAlimTalk')
  async sendKakaoTalk(@Body() kakaoTalkDTO: KakaoTalkBodyDTO) {
    // 토큰 가져오기
    const token = await this.kakaoTalkBiz.getToken(kakaoTalkDTO.info);
    // 보낼 메시지 불러오기
    const message = await this.kakaoTalkBiz.getMessage(kakaoTalkDTO);
    this.logger.log(`KAKAO :: SEND MESSAGE ${message.kakaoMessage} TO [ ${kakaoTalkDTO.info.recipient} ] `);
    // 메시지 전송
    await this.kakaoTalkBiz.sendMessage({
      token,
      info: kakaoTalkDTO.info,
      message,
    });
    // 결과값 확인
    try {
      const result = await this.kakaoTalkBiz.getResult(token.token);
      return result;
    } catch (error) {
      return error;
    }
  }
}
