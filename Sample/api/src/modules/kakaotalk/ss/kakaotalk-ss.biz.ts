import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { Repository } from 'typeorm';
import { KAKAO_BIZ_TALK_URL} from '@utils/constants';
import _axios from 'axios';
import { KakaoTalkBiz } from '../kakaotalk.biz';
import { SsParamDTO ,KakaoTalkSsDTO, KakaoTalkSsBatchDTO } from '../dto/kakaotalk-ss.dto';
import LoggerService from '@modules/common/logger/logger.service';

@Injectable()
export class KakaotalkSsBiz {
  private readonly axios = _axios.create({
    baseURL: KAKAO_BIZ_TALK_URL,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });
  constructor(
    @InjectRepository(IcKakaoMessage) private readonly icKakaoMessage: Repository<IcKakaoMessage>,
    @Inject(forwardRef(() => KakaoTalkBiz))
    private readonly kakaotalkBiz: KakaoTalkBiz,
    private readonly logger: LoggerService,
  ) {}


  async getMsg(ssParamDTO: SsParamDTO, kakaoIdx:string) {
    // 메시지 조회

    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    try {
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{사업장명}/gi, ssParamDTO.conm);
      msg = msg.replace(/#{사업장}/gi, ssParamDTO.conm);
      msg = msg.replace(/#{업무번호}/gi, String(ssParamDTO.requstSn));
      msg = msg.replace(/#{요청번호}/gi, String(ssParamDTO.requstSn));
      msg = msg.replace(/#{구분}/gi, ssParamDTO.gubun);
      msg = msg.replace(/#{제목}/gi, ssParamDTO.title);
      msg = msg.replace(/#{담당자명}/gi, ssParamDTO.ddjnm);
      if (kakaoIdx == "kbz_worktalk_return" || kakaoIdx == "kbz_worktalk_remark2"){
        msg = msg.replace(/#{비고내용}/gi, ssParamDTO.etc);
      }else if(kakaoIdx == "kbz_worktalk_feedback"){
        msg = msg.replace(/#{보완내용}/gi, ssParamDTO.supplementText);
      }else if(kakaoIdx == "kbz_worktalk_registration" || kakaoIdx == "kbz_worktalk_inregistration"){
        msg = msg.replace(/#{요청내용}/gi, ssParamDTO.title);
      }
      
      return { msg };
    } catch (error) {}
  }

  async sendMessage(ssDTO: KakaoTalkSsDTO){
    //토큰가져오기
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KP2');
    const kakaoIdx = ssDTO.kakaoIdx;
    const ssParamDTO = ssDTO.params;
    const phone = ssDTO.phone
    
    // 보낼 메시지 불러오기
    const message = await this.getMsg(ssParamDTO,kakaoIdx);
    this.logger.log(`KAKAO :: SEND MESSAGE ${message.msg} TO [ ${phone} ] `);
    
    
    const response = await this.axios.post(
      '/kko/sendAlimTalk',
      {
        msgIdx: "ssback" + ssParamDTO.msgIdx,
        countryCode: 82,
        recipient: phone,
        senderKey: tokenInfo.senderKey,
        message: message.msg,
        tmpltCode: kakaoIdx,
        resMethod: 'PUSH',
      },
      {
        headers: {
          post: {
            'bt-token': tokenInfo.token,
          },
        },
      }, 
    );

    return response.data;
  }

  async sendBatchMessage(ssDTO: KakaoTalkSsBatchDTO){
    //토큰가져오기
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KP2');
    const kakaoIdx = ssDTO.kakaoIdx;
    const ssParamDTO = ssDTO.params;
    
    await Promise.all(
      ssParamDTO.map(async (ssParam) =>{
        // 보낼 메시지 불러오기
        const message = await this.getMsg(ssParam,kakaoIdx);
        await this.axios.post(
          '/kko/sendAlimTalk',
          {
            msgIdx: "ssback" + ssParam.msgIdx,
            countryCode: 82,
            recipient: ssParam.phone,
            senderKey: tokenInfo.senderKey,
            message: message.msg,
            tmpltCode: kakaoIdx,
            resMethod: 'PUSH',
          },
          {
            headers: {
              post: {
                'bt-token': tokenInfo.token,
              },
            },
          }, 
        );
      })
    );
    
    

    return {  'responseCode' : '1000'};
  }
}

