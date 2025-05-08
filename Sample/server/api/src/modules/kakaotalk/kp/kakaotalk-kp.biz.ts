import { KpwMonPay } from '@entities/sg100loc/pay/kpw-mon-pay.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KAKAO_BIZ_TALK_URL, SG100LOC } from '@utils/constants';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { StringUtils } from '@utils/string.utils';
import _axios from 'axios';
import { Repository } from 'typeorm';
import { KakaoTalkKpDTO ,KpParamDTO } from '../dto/kakaotalk-kp.dto';
import { KakaoTalkDemoDTO , DemoParamDTO } from '../dto/kakaotalk-demo.dto';
import { KakaoTalkBiz } from '../kakaotalk.biz';
import LoggerService from '@modules/common/logger/logger.service';

@Injectable()
export class KakaotalkKpBiz {
  private readonly axios = _axios.create({
    baseURL: KAKAO_BIZ_TALK_URL,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });
  constructor(
    @Inject(forwardRef(() => KakaoTalkBiz))
    private readonly kakaotalkBiz: KakaoTalkBiz,
    @InjectRepository(KpwMonPay, SG100LOC) private readonly kpwMonPay: Repository<KpwMonPay>,
    @InjectRepository(IcKakaoMessage) private readonly icKakaoMessage: Repository<IcKakaoMessage>,
    private readonly logger: LoggerService,
  ) {}

  async sendPayslip(kpDTO: KakaoTalkKpDTO){
    //토큰가져오기
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KPW2');
    const callback = await this.kakaotalkBiz.getCallBackNumber('KP');
    const kakaoIdx = kpDTO.kakaoIdx;
    const kpParamDTO = kpDTO.params;

    await Promise.all(
      kpParamDTO.map(async (kpParamDTO) => {
        //ForRealServer
        const idx = 'payslip'+kpParamDTO.seq;
        //ForTest
        //스케쥴러를 통한 실사용 명세서 상태 업데이트를 막기 위해 IDX를 0000으로 세팅 
        // const idx = 'test0000';
        const bdwknm = kpParamDTO.bdwknm;
        const subject = '김반장 ' + kpParamDTO.yyyymm.substring(4) + '월 급여명세서';
        kpParamDTO.bdwknm = bdwknm === '' ? '전체 현장' : kpParamDTO.bdwknm + '현장';
        kpParamDTO.conm = kpParamDTO.conm + ' (' + kpParamDTO.bdwknm + ')';
        //메시지 가져오기
        let msgInfo;
        let mmsContent = await this.makeMmsMessage(kpParamDTO);
        let button;
        if (kakaoIdx === 'webkbz_pay_details3') {
          msgInfo = await this.getPayDetailsMessageTelY(kpParamDTO);
        } else if (kakaoIdx === 'webkbz_pay_details4') {
          msgInfo = await this.getPayDetailsMessageTelN(kpParamDTO);
        } else {
          msgInfo = await this.getPayDetailOnMessage(kpParamDTO);
          mmsContent = await this.makeMmsMessageForText(kpParamDTO);
          button = await this.makeButton(kpParamDTO);
        }
        console.log(msgInfo);
        const phones = msgInfo['phones'];
        const params = msgInfo['params'];
      
      
        await this.sendTalksUseFailBack(
          { tokenInfo, kakaoIdx, phones, params, idx, button },
          { callback, subject, mmsContent },
        );
      }),
    );
  }

  async sendLoborCont(kpDTO: KakaoTalkKpDTO){
    //토큰가져오기
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KPW2');
    const callback = await this.kakaotalkBiz.getCallBackNumber('KP');
    const kakaoIdx = kpDTO.kakaoIdx;
    const kpParamDTO = kpDTO.params;

    await Promise.all(
      kpParamDTO.map(async (kpParamDTO) => {
        //ForTest
        //스케쥴러를 통한 실사용 명세서 상태 업데이트를 막기 위해 IDX를 0000으로 세팅 
        // const idx = 'test0000';

        const idx = kpParamDTO.fromWhere + kpParamDTO.seq;
        
        const subject = '김반장 근로계약서 서명요청' ;
        //메시지 가져오기
        const msgInfo = await this.getLaborContMessage(kpParamDTO);
        const mmsContent = await this.makeContMmsMessage(kpParamDTO);
        const button = await this.makeButton(kpParamDTO,0);
          
        console.log(msgInfo);
        const phones = msgInfo['phones'];
        const params = msgInfo['params'];
      
        await this.sendTalksUseFailBack(
          { tokenInfo, kakaoIdx, phones, params, idx, button },
          { callback, subject, mmsContent },
        );
      }),
    );
  }
  async sendDesCont(kpDTO: KakaoTalkKpDTO){
    //토큰가져오기
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KPW2');
    const callback = await this.kakaotalkBiz.getCallBackNumber('KP');
    const kakaoIdx = kpDTO.kakaoIdx;
    const kpParamDTO = kpDTO.params;

    await Promise.all(
      kpParamDTO.map(async (kpParamDTO) => {
        //ForTest
        //스케쥴러를 통한 실사용 명세서 상태 업데이트를 막기 위해 IDX를 0000으로 세팅 
        // const idx = 'test0000';

        const idx = kpParamDTO.fromWhere + kpParamDTO.seq;
        
        const subject = '김반장 근로계약서 파기알림' ;
        //메시지 가져오기
        const msgInfo  = await this.getDesContMessage(kpParamDTO);
        let mmsContent = await this.makeDesContMmsMessage(kpParamDTO);
        let button;
        if (kakaoIdx !== 'kbz_contractdestroy_01') {
          mmsContent = mmsContent +  '아래의 링크를 클릭하여 서명요청을 진행해주세요. \n '+
          '[' +kpParamDTO.link +' ]' ;
          button = await this.makeButton(kpParamDTO , 1);
        }
          
        console.log(msgInfo);
        const phones = msgInfo['phones'];
        const params = msgInfo['params'];
      
        await this.sendTalksUseFailBack(
          { tokenInfo, kakaoIdx, phones, params, idx, button },
          { callback, subject, mmsContent },
        );
      }),
    );
  }

  async sendDemo(demoDto : KakaoTalkDemoDTO){
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KPW2');
    const callback = '16888688';
    const kakaoIdx = demoDto.kakaoIdx;
    const demoParamDTO = demoDto.params;
    const mobile = demoDto.mobileNb;

    const message = await this.getDemoMsg(demoDto);

    this.logger.log(`KAKAO :: SEND MESSAGE ${message.msg} TO [ ${mobile} ] `);
    const response = await this.axios.post(
      '/kko/sendAlimTalk',
      {
        msgIdx: "demo" + demoParamDTO.idx,
        countryCode: 82,
        recipient: mobile,
        senderKey: tokenInfo.senderKey,
        message: message.msg,
        tmpltCode: kakaoIdx,
        resMethod: 'PUSH',
        useFailback: 'Y',
        mmsAttach: {
          mmsContent: message.msg,
          callback: callback,
          subject: '데모신청결과'
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

  async sendQna(demoDto : KakaoTalkDemoDTO){
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KP2');
    const callback = '16888688';
    const kakaoIdx = demoDto.kakaoIdx;
    const demoParamDTO = demoDto.params;
    const mobile = demoDto.mobileNb;

    const message = await this.getQnaMsg(demoDto);

    this.logger.log(`KAKAO :: SEND MESSAGE ${message.msg} TO [ ${mobile} ] `);
    const response = await this.axios.post(
      '/kko/sendAlimTalk',
      {
        msgIdx: "qna" + demoParamDTO.idx,
        countryCode: 82,
        recipient: mobile,
        senderKey: tokenInfo.senderKey,
        message: message.msg,
        tmpltCode: kakaoIdx,
        resMethod: 'PUSH',
        useFailback: 'Y',
        mmsAttach: {
          mmsContent: message.msg,
          callback: callback,
          subject: '질문게시판 답변'
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

  async sendNotice(demoDto : KakaoTalkDemoDTO){
    const tokenInfo = await this.kakaotalkBiz.getTokenByServiceId('KP2');
    const callback = '16888688';
    const kakaoIdx = demoDto.kakaoIdx;
    const demoParamDTO = demoDto.params;
    const mobile = demoDto.mobileNb;

    const message = await this.getNoticeMsg(demoDto);

    this.logger.log(`KAKAO :: SEND MESSAGE ${message.msg} TO [ ${mobile} ] `);
    const response = await this.axios.post(
      '/kko/sendAlimTalk',
      {
        msgIdx: "notice" + demoParamDTO.idx,
        countryCode: 82,
        recipient: mobile,
        senderKey: tokenInfo.senderKey,
        message: message.msg,
        tmpltCode: kakaoIdx,
        resMethod: 'PUSH',
        useFailback: 'Y',
        mmsAttach: {
          mmsContent: message.msg,
          callback: callback,
          subject: '상담신청 접수 안내'
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

  async getPayDetailsMessageTelN(KpDTO: KpParamDTO) {
    const params = [
      {
        param: '사업장명',
        value: KpDTO['conm'],
      },
      {
        param: '근로자명',
        value: KpDTO['korname'],
      },
      {
        param: '임금명세서 링크',
        value: KpDTO['link'],
      },
      {
        param: '해당월',
        value: KpDTO['yyyymm'].substring(4),
      },
    ];

    const msgInfo = {
      phones: KpDTO['mobile'],
      params: params,
    };
    return msgInfo;
  }

  async getPayDetailsMessageTelY(KpDTO: KpParamDTO) {
    const params = [
      {
        param: '사업장명',
        value: KpDTO['conm'],
      },
      {
        param: '근로자명',
        value: KpDTO['korname'],
      },
      {
        param: '임금명세서 링크',
        value: KpDTO['link'],
      },
      {
        param: '해당월',
        value: KpDTO['yyyymm'].substring(4),
      },
      {
        param: '사업장전화번호',
        value: KpDTO['companyTel'],
      },
    ];

    const msgInfo = {
      phones: KpDTO['mobile'],
      params: params,
    };
    return msgInfo;
  }

  async getPayDetailOnMessage(KpDTO: KpParamDTO) {
    const params = [
      {
        param: '사업장명',
        value: KpDTO['conm'],
      },
      {
        param: '근로자명',
        value: KpDTO['korname'],
      },
      {
        param: '임금명세서 링크',
        value: KpDTO['link'],
      },
      {
        param: '해당월',
        value: KpDTO['yyyymm'].substring(4),
      },
      {
        param: '사업장전화번호',
        value: KpDTO['companyTel'],
      },
      {
        param: '임금명세서',
        value: KpDTO['paymentContent'],
      },
      {
        param: '근로자생년월일',
        value: KpDTO['birth'],
      },
    ];

    const msgInfo = {
      phones: KpDTO['mobile'],
      params: params,
    };
    return msgInfo;
  }

  async getLaborContMessage(KpDTO: KpParamDTO) {
    const params = [
      {
        param: '사업장명',
        value: KpDTO['conm'],
      },
      {
        param: '현장명',
        value: KpDTO['bdwknm'],
      },
    ];

    const msgInfo = {
      phones: KpDTO['mobile'],
      params: params,
    };
    return msgInfo;
  }

  async getDesContMessage(KpDTO: KpParamDTO) {
    const params = [
      {
        param: '근로자명',
        value: KpDTO['korname'],
      },
      {
        param: '사업장명',
        value: KpDTO['conm'],
      },
      {
        param: '현장명',
        value: KpDTO['bdwknm'],
      },
      {
        param: '근로계약시작년월일',
        value: KpDTO['startDt'],
      },
      {
        param: '근로계약종료년월일',
        value: KpDTO['endDt'],
      },
      {
        param: '사유',
        value: KpDTO['reason'],
      },
    ];
    const msgInfo = {
      phones: KpDTO['mobile'],
      params: params,
    };
    return msgInfo;
  }

  async getDemoMsg(demoDto : KakaoTalkDemoDTO){
    const kakaoIdx = demoDto.kakaoIdx
    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    const demoParamDTO = demoDto.params;
    try {
      
      let msg = kakaoMessage[0].kakaoMessage;
      if(kakaoIdx === 'webkbz_demo_approval_2' ){
        msg = msg.replace(/#{사업장명}/gi, demoParamDTO.coNm);
        msg = msg.replace(/#{신청아이디}/gi,  demoParamDTO.userId);
        msg = msg.replace(/#{데모사용기간}/gi, demoParamDTO.startDt+' ~ ' + demoParamDTO.lastDt);
      }
      return { msg };
    } catch (error) {}
  }

  async getQnaMsg(demoDto : KakaoTalkDemoDTO){
    const kakaoIdx = demoDto.kakaoIdx
    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    const demoParamDTO = demoDto.params;
    try {
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{질문내용 40자}/gi, demoParamDTO.question);
      msg = msg.replace(/#{답변링크}/gi,  demoParamDTO.answerLink);
      return { msg };
    } catch (error) {}
  }

  async getNoticeMsg(demoDto : KakaoTalkDemoDTO){
    const kakaoIdx = demoDto.kakaoIdx
    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    const demoParamDTO = demoDto.params;
    try {
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{상담요청_담당자명}/gi, demoParamDTO.ddjNm);
      msg = msg.replace(/#{상담요청_회사명}/gi,  demoParamDTO.coNm);
      return { msg };
    } catch (error) {}
  }

  async makeMmsMessage(KpDTO: KpParamDTO) {
    const conm = KpDTO.conm;
    const yyyy = KpDTO.yyyymm.substring(0, 4);
    const mm = KpDTO.yyyymm.substring(4);
    const korname = KpDTO.korname;
    const bdwknm = KpDTO.bdwknm;
    const link = KpDTO.link;
    const companyTel =
      KpDTO.companyTel != undefined
        ? '임금명세서 관련 문의는 ' + KpDTO.conm + '(' + KpDTO.companyTel + ')에서 확인해주시기 바랍니다.'
        : '임금명세서 관련 문의는 ' + KpDTO.conm + '에서 확인해주시기 바랍니다.';
    const message =
      '[김반장]' +
      conm +
      ' ' +
      mm +
      '월 급여명세서 발송 안내. \n' +
      korname +
      '님의 ' +
      bdwknm +
      ' ' +
      yyyy +
      '년' +
      mm +
      '월 급여명세서가 발송되었습니다. \n' +
      '급여명세서는 [' +
      link +
      ' ]' +
      '에서 다운로드 하실 수 있습니다. \n' +
      companyTel +
      ' [ 안드로이드 : https://play.google.com/store/apps/details?id=kr.co.gspoll.empapp ] [ 아이폰 : https://apps.apple.com/kr/app/apple-store/id1483544688 ] \n'
      +korname+'님의 노고에 진심으로 감사드립니다.';

    return message;
  }

  async makeMmsMessageForText(KpDTO: KpParamDTO) {
    const conm = KpDTO.conm;
    const yyyy = KpDTO.yyyymm.substring(0, 4);
    const mm = KpDTO.yyyymm.substring(4);
    const korname = KpDTO.korname;
    const bdwknm = KpDTO.bdwknm;
    const link = KpDTO.link;
    const paymentContent = KpDTO.paymentContent;
    const companyTel =
      KpDTO.companyTel != undefined
        ? '임금명세서 관련 문의는 ' + KpDTO.conm + '(' + KpDTO.companyTel + ')에서 확인해주시기 바랍니다.'
        : '임금명세서 관련 문의는 ' + KpDTO.conm + '에서 확인해주시기 바랍니다.';
    const message =
      '[김반장]' +
      conm +
      ' ' +
      mm +
      '월 급여명세서 발송 안내. \n' +
      korname +
      '님의 ' +
      bdwknm +
      ' ' +
      yyyy +
      '년' +
      mm +
      '월 급여명세서가 발송되었습니다. \n' +
      '급여명세서 \n' +
      paymentContent +
      companyTel +
      ' [ 명세서 수신확인링크 : '+link+' ]\n'
      +korname+'님의 노고에 진심으로 감사드립니다.';

    return message;
  }
  async makeContMmsMessage(KpDTO: KpParamDTO) {
    const conm = KpDTO.conm;
    const link = KpDTO.link;
    const message =
      conm +'에서 회원님께 근로계약서 서명요청을 보냈습니다. \n'+
      '아래의 링크를 클릭하여 서명요청을 진행해주세요. \n '+
      '[' +link +' ]' ;
    return message;
  }

  async makeDesContMmsMessage(KpDTO: KpParamDTO) {
    const message =
      `${KpDTO.korname}님 안녕하세요
      ${KpDTO.conm} 의 ${KpDTO.bdwknm}에서
      ${KpDTO.startDt} 부터 
      ${KpDTO.endDt} 까지 
       작성하신 근로계약서가 ${KpDTO.reason}로 파기하고자 합니다. 
       파기 된 계약서는 더 이상 유효하지 않습니다.`

    return message;
  }


  async sendTalksUseFailBack(
    param: {
      tokenInfo: { token: string; responseCode: string; senderKey: string };
      kakaoIdx: string;
      phones: string[];
      params: { param: string; value: string }[];
      idx: string;
      button : {name:string; type:string; url_mobile:string; url_pc:string};
    },
    failBackParam: {
      callback: string;
      mmsContent: string;
      subject: string;
    },
  ) {
    // 중복 수신 제거
    const recipients = Array.from(new Set(param.phones));
    const message = await this.kakaotalkBiz.makeMessage(param.kakaoIdx, param.params);
    await Promise.all(
      recipients.map(async (recipient) => {
        const sendParam ={
          countryCode: 82,
          msgIdx: param.idx,
          resMethod: 'PUSH',
          recipient: recipient,
          senderKey: param.tokenInfo.senderKey,
          tmpltCode: param.kakaoIdx,
          message: message.kakaoMessage,
          useFailback: 'Y',
          mmsAttach: {
            mmsContent: failBackParam.mmsContent,
            callback: failBackParam.callback,
            subject: failBackParam.subject,
          },
        };
        if(param.button != undefined && param.button != null ){ 
          sendParam["attach"] = { 
            button: [
                      { name : param.button.name,
                        type : param.button.type,
                        url_mobile : param.button.url_mobile,
                        url_pc : param.button.url_pc
              }
            ]
          }
        };

        this.logger.log(`KAKAO :: SEND MESSAGE ${message.kakaoMessage} TO [ ${recipient} ] `);

        const response = await this.axios.post(
          '/kko/sendAlimTalk',
          sendParam,
          {
            headers: {
              post: {
                'bt-token': param.tokenInfo.token,
              },
            },
          },
        );
        console.log(response.data);
      }),
    );
  }

  async updateSendYn(KpwMonPayDTO: KpwMonPay) {
    await this.kpwMonPay.update(KpwMonPayDTO.payno, {
      kakaoSendYn: KpwMonPayDTO.kakaoSendYn,
      mmsSendYn: KpwMonPayDTO.mmsSendYn,
      failSendYn: KpwMonPayDTO.failSendYn,
      sendType: KpwMonPayDTO.sendType,
      resultCode: KpwMonPayDTO.resultCode,
      sendingYn: KpwMonPayDTO.sendingYn,
    });
  }
  async makeButton(KpDTO: KpParamDTO , flag?: number){
    const name = flag == 0 ? "근로계약서 서명" : flag == 1 ? "파기동의" : "임금명세서 수신확인";
    const type = "WL";
    const url_mobile = KpDTO.link;
    const url_pc = KpDTO.link;
    
    const button = 
      {
        "name" : name,
        "type" : type,
        "url_mobile" : url_mobile,
        "url_pc" :url_pc,
      }
    return button;
  }
}
