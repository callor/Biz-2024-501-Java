import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GojiIssueInfo } from "@entities/kafka/goji-issue-info.entity";
import { BizGojitt } from "@entities/kafka/biz-gojitt.entity";
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { EntityManager, Repository } from 'typeorm';
import { KAFKA, KAKAO_BIZ_TALK_URL} from '@utils/constants';
import _axios from 'axios';
import { KakaoTalkBiz } from '../kakaotalk.biz';
import { KafkaGojiParamDTO, KafkaParamDTO ,KakaoTalkKafkaDTO , KakaoTalkKafkaGojiDTO} from '../dto/kakaotalk-kafka.dto';
import LoggerService from '@modules/common/logger/logger.service';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';

@Injectable()
export class KakaotalkKafkaBiz {
  private readonly axios = _axios.create({
    baseURL: KAKAO_BIZ_TALK_URL,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });
  constructor(
    @InjectRepository(IcKakaoMessage) private readonly icKakaoMessage: Repository<IcKakaoMessage>,
    @InjectRepository(GojiIssueInfo, KAFKA) private readonly gojiIssueInfo: Repository<GojiIssueInfo>,
    @InjectRepository(BizGojitt, KAFKA) private readonly bizGojitt: Repository<BizGojitt>,
    @InjectEntityManager(KAFKA) private readonly manager: EntityManager,
    @Inject(forwardRef(() => KakaoTalkBiz))
    private readonly kakaotalkBiz: KakaoTalkBiz,
    private readonly logger: LoggerService,
  ) {}


  async getMsg(kafkaParamDTO: KafkaParamDTO, kakaoIdx:string) {
    // 메시지 조회

    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    try {
      // const gojiDate = kafkaParamDTO.gojiDate.substring(0, 4)+'년 '+kafkaParamDTO.gojiDate.substring(4)+'월';
      // const paymentDate = kafkaParamDTO.paymentDate.substring(0, 4)+'년 '+kafkaParamDTO.paymentDate.substring(4,6)+'월'+kafkaParamDTO.paymentDate.substring(6)+'일';
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{사업장명}/gi, kafkaParamDTO.corNm);
      msg = msg.replace(/#{체크}/gi, 	"✓");
      msg = msg.replace(/#{고지년월}/gi,  kafkaParamDTO.gojiDate);
      msg = msg.replace(/#{요청현장 수}/gi, String(kafkaParamDTO.requestConNum));
      msg = msg.replace(/#{전송현장 수}/gi, String(kafkaParamDTO.sendConNum));
      msg = msg.replace(/#{납부일자}/gi, kafkaParamDTO.paymentDate);
      msg = msg.replace(/#{담당자명}/gi, kafkaParamDTO.empnm);

      return { msg };
    } catch (error) {}
  }

  async getGojiMsg(kafkaParamDTO: KafkaGojiParamDTO, kakaoIdx:string) {
    // 메시지 조회

    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    try {
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{사업장명}/gi, kafkaParamDTO.conm);
      msg = msg.replace(/#{납부분기}/gi, 	kafkaParamDTO.querter+'분기 ');
      msg = msg.replace(/#{관리번호}/gi, kafkaParamDTO.mgrno);
      msg = msg.replace(/#{납부기한}/gi, kafkaParamDTO.payenddate);
      msg = msg.replace(/#{보험료금액}/gi, kafkaParamDTO.url);

      return { msg };
    } catch (error) {}
  }

  async makeMmsMessage(kafkaParamDTO: KafkaParamDTO) {
    const subject = '고지서 발급 현황'
    const message =
                    `안녕하세요, ${kafkaParamDTO.corNm}님 건설노무관리 협업툴 김반장입니다.
                    ${ kafkaParamDTO.gojiDate} 고지서 근로내용 전송하신 ${String(kafkaParamDTO.requestConNum)}개 현장 중 ${String(kafkaParamDTO.sendConNum)}개 현장 고지서 발급이 완료되었습니다. 
                    김반장 업무톡에서 바로 확인 가능합니다.
                    ${kafkaParamDTO.paymentDate}일까지 보험료를 납부해주시기 바랍니다.
                    김반장 프리미엄 서비스를 이용해주셔서 진심으로 감사드립니다.`;
    return {message , subject};
  }

  async makeUnpaidbillMmsMessage(kafkaParamDTO: KafkaParamDTO) {
    const subject = '미확인 사업장 독려'
    const message =
                    `안녕하세요! \n보험사무대행기관 한국경영원입니다.\n ${kafkaParamDTO.corNm} 담당자님! \n\n [건강 · 연금 보험료 납부안내] \n\n■ ${ kafkaParamDTO.gojiDate} 고지서 \n■ 납부기한 : ${kafkaParamDTO.paymentDate} \n■ 김반장 업무톡에서 확인 가능합니다. \n■ 고지서를 확인하시고 반드시 ${kafkaParamDTO.paymentDate}까지 보험료를 납부해주시기 바랍니다.
                    `;
    return {message , subject};
  }

  async makeMmsGojiMessage(kafkaParamDTO: KafkaGojiParamDTO) {
    const subject = '김반장프리미엄 납부안내'
    const message =
                    `안녕하세요.  ${kafkaParamDTO.conm} 담당자님! (미소)

                    [고용 · 산재보험료 ${kafkaParamDTO.querter}분기 납부 안내]
                    ■ 사업장명 : ${kafkaParamDTO.conm}
                    ■ 관리번호 : ${kafkaParamDTO.mgrno}
                    ■ 납부기한 : ${kafkaParamDTO.payenddate}
                    ■ 보 험 료 : ${kafkaParamDTO.url}
                    
                    ※ 기한 내 보험료 납부해주시길 바랍니다.
                    
                    ★ 납부서는 김반장 업무톡에서도 확인하실 수 있습니다.`;
    return {message , subject};
  }

  async sendMessage(kafkaDTO: KakaoTalkKafkaDTO){
    //토큰가져오기
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KP2');
    const callback = await this.kakaotalkBiz.getCallBackNumber('ECON');
    const kakaoIdx = kafkaDTO.kakaoIdx;
    const kafkaParamDTO = kafkaDTO.params;
    const send_dt = DateUtil.format(new Date(),'yyyyMMddHHmmss');
    const phone = SecurityUtil.aes128Decrypt(kafkaDTO.phone);
    const empnm = kafkaDTO.empnm;
    let prefix = kakaoIdx === 'kbz_worktalk_bill2' ?  'kafka': "encKa";
    let btnYn = false;
    const isKafka = prefix == 'kafka';

    if (empnm != undefined) kafkaParamDTO.empnm = empnm;
    
    // 보낼 메시지 불러오기
    const message = await this.getMsg(kafkaParamDTO,kakaoIdx);
    const failBackParam = isKafka ?  await this.makeMmsMessage(kafkaParamDTO) :  await this.makeUnpaidbillMmsMessage(kafkaParamDTO);
    this.logger.log(`KAKAO :: SEND MESSAGE ${message.msg} TO [ ${phone} ] `);
    if (isKafka) {
      await this.gojiIssueInfo.update(kafkaDTO.params.msgIdx, {
          kakao_contents : message.msg ,
          send_dt : send_dt,
      });
    }else{
      if(kafkaParamDTO.degree === 1){
        prefix = prefix + "A" ;
        await this.gojiIssueInfo.update(kafkaDTO.params.msgIdx, {
          enc_kakao_contents : message.msg ,
          send_dt : send_dt,
        });
      }else{
        prefix = prefix + "B" ;
        btnYn = true;
        await this.gojiIssueInfo.update(kafkaDTO.params.msgIdx, {
          enc_kakao_contents2 : message.msg ,
          send_dt : send_dt,
        });
      }
  ;
  }
    const sendParam =  {
      msgIdx: prefix + kafkaParamDTO.msgIdx,
      // msgIdx: 'test00000',
      countryCode: 82,
      recipient: phone,
      senderKey: tokenInfo.senderKey,
      message: message.msg,
      tmpltCode: kakaoIdx,
      resMethod: 'PUSH',
      useFailback: 'Y',
      mmsAttach: {
        mmsContent: failBackParam.message,
        callback: callback,
        subject: failBackParam.subject,
      },
    }

    if( btnYn ){ 
      sendParam["attach"] = { 
        button: [
                  { name : '채널 추가',
                    type : 'AC',
          }
        ]
      }
    };
    
    const response = await this.axios.post(
      '/kko/sendAlimTalk',
       sendParam ,
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

  async sendGojiMessage(kafkaDTO: KakaoTalkKafkaGojiDTO){
    //토큰가져오기
    const kakaoIdx = kafkaDTO.kakaoIdx;
    const tokenName = kakaoIdx === 'bizsee_nabbu_info1' ? 'BIZSEE' : 'KP2';
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId(tokenName);
    const callback = await this.kakaotalkBiz.getCallBackNumber('ECON');
    
    const kafkaParamDTO = kafkaDTO.params;
    const phone = SecurityUtil.aes128Decrypt(kafkaDTO.phone);
    
    // 보낼 메시지 불러오기
    const message = await this.getGojiMsg(kafkaParamDTO,kakaoIdx);
    const failBackParam = await this.makeMmsGojiMessage(kafkaParamDTO);
    this.logger.log(`KAKAO :: SEND MESSAGE ${message.msg} TO [ ${phone} ] `);
    await this.uptGojiTableMsg(kafkaDTO,message.msg );
    
    const response = await this.axios.post(
      '/kko/sendAlimTalk',
      {
        msgIdx: "goji" + kafkaParamDTO.seqno,
        // msgIdx: "test00000",
        countryCode: 82,
        recipient: phone,
        senderKey: tokenInfo.senderKey,
        message: message.msg,
        tmpltCode: kakaoIdx,
        resMethod: 'PUSH',
        useFailback: 'Y',
        mmsAttach: {
          mmsContent: failBackParam.message,
          callback: callback,
          subject: failBackParam.subject,
        },
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

  async uptTableMsg(kafkaDTO: KakaoTalkKafkaDTO, msg:string ){
    const send_dt = DateUtil.format(new Date(),'yyyyMMddHHmmss');
    await this.gojiIssueInfo.update(kafkaDTO.params.msgIdx, {
        kakao_contents : msg ,
        send_dt : send_dt,
    });
    // await this.manager.createQueryBuilder()
    //                   .update("GOJI_ISSUE_INFO")
    //                   .set({
    //                     kakao_contents : msg ,
    //                     send_dt : send_dt,
    //                   })
    //                   .where("MSG_IDX =:msgIdx",{msgIdx :kafkaDTO.params.msgIdx })
    //                   .execute();
  }

  async uptGojiTableMsg(kafkaDTO: KakaoTalkKafkaGojiDTO, msg:string){
    const send_dt = DateUtil.format(new Date(),'yyyyMMddHHmmss');

    const seq_no : number = kafkaDTO.params.seqno,
          state = '1'; 
    await this.bizGojitt.update( seq_no ,{
        kakao_contents : msg ,
        send_dt : send_dt,
    });
  }
}

