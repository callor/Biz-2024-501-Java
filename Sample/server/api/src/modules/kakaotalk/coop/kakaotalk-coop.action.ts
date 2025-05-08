import { Role } from '@modules/auth/decorator/role.decorator';
import LoggerService from '@modules/common/logger/logger.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';
import { KakaoTalkCoopDTO } from '../dto/kakaotalk-coop.dto';
import { KakaoTalkBiz } from '../kakaotalk.biz';
import { KakaotalkCoopBiz } from './kakaotalk-coop.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('kko/coop')
export class KakaoTalkCoopAction {
  constructor(
    private readonly kakaoTalkBiz: KakaoTalkBiz,
    private readonly kakaotalkCoopBiz: KakaotalkCoopBiz,
    private readonly logger: LoggerService,
  ) {}

  // 카카오톡 알림 발송
  @Post('/sendAlimTalk')
  async sendKkoMsg(@Body() coopDTO: KakaoTalkCoopDTO) {
    const serviceId = coopDTO.serviceId == 'ECON' ? 'ECON2' : 'KP2';
    // 토큰 가져오기
    const token = await this.kakaoTalkBiz.getTokenByServiceId(serviceId);
    // 보낼 메시지 불러오기
    try {
    await Promise.all(
      coopDTO.params.map(async (param) => {
        // 보낼 메시지 불러오기
        const message = await this.kakaotalkCoopBiz.getMessage(param, coopDTO.kakaoIdx);
        this.logger.log(`KAKAO :: SEND MESSAGE ${message.kakaoMessage} TO [ ${param.mp} ] `);
        // 메시지 전송
        const sendInfo = {
          messageId: message.messageId,
          tmpltCode: coopDTO.kakaoIdx,
          message: message.kakaoMessage,
          recipient: param.mp,
          msgIdx: 'admin'+DateUtil.format(new Date(),'MMddhhmm')+SecurityUtil.randomString(2),
          scdId: param.scdId,
          sno: param.sno,
        };
        await this.kakaotalkCoopBiz.sendMessage({
          token,
          sendInfo,
        });
      }),
    );
      return {responseCode:1000};
    } catch (error) {
      return error;
    }
  }

  // 관리자-독려 카카오톡 알림 발송
  @Post()
  async sendKakaotalk(@Body() coopDTO: KakaoTalkCoopDTO) {
    // 토큰 가져오기
    const token = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    // 보낼 메시지 (param : scdID, coolCoid)
    try {
    await Promise.all(
      coopDTO.params.map(async (param) => {
        // 메시지 조회
        const sendList = await this.kakaotalkCoopBiz.getEncourageMsg(param, coopDTO.smsType);

        // 메시지 전송
        sendList.map(async (send) => {
          const sendInfo = {
            messageId: send.messageId,
            tmpltCode: send.kakaoIdx,
            message: send.msg,
            recipient: send.mp,
            msgIdx: 'post'+DateUtil.format(new Date(),'MMddhhmm')+SecurityUtil.randomString(2),
            sno: send.sno,
            scdId: param.scdId,
            coopCoid: param.coopCoid,
            wondoCoid: send.wondoCoid,
            smsType: coopDTO.smsType,
          };
          this.logger.log(`KAKAO :: SEND MESSAGE ${send.msg} TO [ ${send.mp} ] `);
          await this.kakaotalkCoopBiz.sendMessage({
            token,
            sendInfo,
          });
        });
      }),
    );

    // 결과값 확인
    return {responseCode:1000};
    } catch (error) {
      return error;
    }
  }

  // 관리자-과정변경 카카오톡 알림 발송
  @Post('/change')
  async sendTrtChange(@Body() coopDTO: KakaoTalkCoopDTO) {
    // 토큰 가져오기
    const token = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    // 보낼 메시지
    try {
    await Promise.all(
      coopDTO.params.map(async (param) => {
        // 메시지 조회
        const msgInfo = await this.kakaotalkCoopBiz.getTrtChangeMsg(param, coopDTO.smsType);
        // 메시지 전송
        const sendInfo = {
          messageId: msgInfo.messageId,
          tmpltCode: msgInfo.kakaoIdx,
          message: msgInfo.msg,
          recipient: param.mp,
          msgIdx: 'AdCh'+DateUtil.format(new Date(),'MMddhhmm')+SecurityUtil.randomString(2),
          sno: param.sno,
          scdId: param.scdId,
          coopCoid: param.coopCoid,
          wondoCoid: param.wondoCoid,
          smsType: coopDTO.smsType,
        };
        this.logger.log(`KAKAO :: SEND MESSAGE ${msgInfo.msg} TO [ ${param.mp} ] `);
        await this.kakaotalkCoopBiz.sendMessage({
          token,
          sendInfo,
        });
      }),
    );    
      return {responseCode:1000};
    } catch (error) {
      return error;
    }
  }

  // 교육신청 시 카카오톡 알림 발송
  @Post('/apply')
  async sendEduApply(@Body() coopDTO: KakaoTalkCoopDTO) {
    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    const kakaoIdx = coopDTO.kakaoIdx;
    const msgIdx = 'apply';
    const coopParamDTO = coopDTO.params;
    try{
    await Promise.all(
      coopParamDTO.map(async (coopParamDTO) => {
        // 메시지 가져오기
        const msgInfo = await this.kakaotalkCoopBiz.getEduMsg(coopParamDTO);
        const phones = msgInfo['phones'];
        const params = msgInfo['params'];
        const scdId = coopParamDTO.scdId;
        // 메시지 전송
        await this.kakaoTalkBiz.sendTalks({ tokenInfo, kakaoIdx, phones, params, scdId ,msgIdx});
      }),
    );

    // 전송결과
    return {responseCode:1000};
    } catch (error) {
      return error;
    }
  }

  // 교육취소 시 카카오톡 알림 발송
  @Post('/cancel')
  async sendEduCancel(@Body() coopDTO: KakaoTalkCoopDTO) {
    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    const kakaoIdx = coopDTO.kakaoIdx;
    const msgIdx = 'cancel';
    const coopParamDTO = coopDTO.params;
    try{
      await Promise.all(
        coopParamDTO.map(async (coopParamDTO) => {
          // 메시지 가져오기
          const msgInfo = await this.kakaotalkCoopBiz.getEduMsg(coopParamDTO);
          const phones = msgInfo['phones'];
          const params = msgInfo['params'];
          const scdId = coopParamDTO.scdId;
          // 메시지 전송
          await this.kakaoTalkBiz.sendTalks({ tokenInfo, kakaoIdx, phones, params, msgIdx, scdId });
        }),
      );
      // 전송결과
      return {responseCode:1000};
    } catch (error) {
      return error;
    }
  }
}
