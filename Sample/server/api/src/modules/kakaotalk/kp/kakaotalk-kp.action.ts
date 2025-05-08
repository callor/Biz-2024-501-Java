import { Role } from '@modules/auth/decorator/role.decorator';
import LoggerService from '@modules/common/logger/logger.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { KakaoTalkKpDTO, KpwMonPayDTO } from '../dto/kakaotalk-kp.dto';
import { KakaoTalkDemoDTO } from '../dto/kakaotalk-demo.dto';
import { KakaoTalkBiz } from '../kakaotalk.biz';
import { KakaotalkKpBiz } from './kakaotalk-kp.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('kko/kp')
export class KakaoTalkKpAction {
  constructor(
    private readonly kakaoTalkBiz: KakaoTalkBiz,
    private readonly kakaoTalkKpBiz: KakaotalkKpBiz,
    private readonly logger: LoggerService,
  ) {}

  // 급여지급명세서 알림발송
  @Post('/sendPayDetails')
  async sendPayDetails(@Body() kpDTO: KakaoTalkKpDTO) {
    await this.kakaoTalkKpBiz.sendPayslip(kpDTO);
  }

  // 일용직 근로계약서 서명요청 알림톡
  @Post('/sendLaborCont')
  async sendLaborCont(@Body() kpDTO: KakaoTalkKpDTO) {
    try{
      return  await this.kakaoTalkKpBiz.sendLoborCont(kpDTO);
    }catch(e){
      return e;
    }
  }

  @Post('/sendDesCont')
  async sendDesCont(@Body() kpDTO: KakaoTalkKpDTO) {
    try{
      return  await this.kakaoTalkKpBiz.sendDesCont(kpDTO);
    }catch(e){
      return e;
    }
  }

  @Post('/sendDemo')
  async sendDemo(@Body() demoDto : KakaoTalkDemoDTO ){
    try {
      
    return this.kakaoTalkKpBiz.sendDemo(demoDto);
    } catch (e) {
      return e;
    }
  }

  @Post('/qna')
  async sendQna(@Body() demoDto : KakaoTalkDemoDTO ){
    try {
      
    return this.kakaoTalkKpBiz.sendQna(demoDto);
    } catch (e) {
      return e;
    }
  }

  @Post('/notice')
  async sendNotice(@Body() demoDto : KakaoTalkDemoDTO ){
    try {
      
    return this.kakaoTalkKpBiz.sendNotice(demoDto);
    } catch (e) {
      return e;
    }
  }

}
