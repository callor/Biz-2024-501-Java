import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { IcKakaoService } from '@entities/ade100/common/ic-kakao-service.entity';
import { IcKakaoToken } from '@entities/ade100/common/ic-kakao-token.entity';
import { SgKakaomovmanurl } from '@entities/sg100/kakaotalk/kakaotalk.entity';
import { ToPtptKkoHsty } from '@entities/sgn2/coop/to-ptpt-kko-hsty.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository ,InjectEntityManager } from '@nestjs/typeorm';
import { KAKAO_BIZ_TALK_URL, SG100, SGN2 } from '@utils/constants';
import { StringUtils } from '@utils/string.utils';
import _axios from 'axios';
import { Repository, EntityManager } from 'typeorm';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';
import { KakaoTalkBodyDTO, KakaoTalkInfoDTO, SendKakaoTalkDTO } from './dto/kakaotalk.dto';

@Injectable()
export class KakaoTalkBiz {
  private readonly axios = _axios.create({
    baseURL: KAKAO_BIZ_TALK_URL,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });

  constructor(
    @InjectRepository(SgKakaomovmanurl, SG100)
    private readonly sgKakaomovmanurl: Repository<SgKakaomovmanurl>,
    @InjectRepository(IcKakaoService) private readonly icKakaoService: Repository<IcKakaoService>,
    @InjectRepository(IcKakaoMessage) private readonly icKakaoMessage: Repository<IcKakaoMessage>,
    @InjectRepository(IcKakaoToken) private readonly icKakaoToken: Repository<IcKakaoToken>,
    @InjectRepository(ToPtptKkoHsty, SGN2) private readonly toPtptKkoHsty: Repository<ToPtptKkoHsty>,
    @InjectEntityManager(SGN2) private readonly manager: EntityManager,
  ) {}

  // 토큰 가져오기
  async getToken(kakaoTalkDTO: KakaoTalkInfoDTO) {
    const { data } = await this.axios.post('/auth/getToken', {
      bsid: kakaoTalkDTO.bsid,
      passwd: kakaoTalkDTO.passwd,
    });
    return data as { token: string; responseCode: string };
  }
  async getTokenByServiceId(serviceId: 'ECON' | 'KP' | 'KPW' | 'ECON2' | 'KP2'| 'KPW2' | 'WEBKBZ2' | 'BIZSEE') {
    const dateId = DateUtil.format(new Date(), 'yyyyMMdd');
    const tokenInfo = await this.icKakaoToken
    .createQueryBuilder('tokenInfo')
    .select('token', 'token' )
    .addSelect('sender_Key', 'senderKey')
    .where('SERVICE_ID = :serviceId',{serviceId})
    .andWhere('DATE_ID = :dateId',{dateId})
    .getRawOne<{
      token: string;
      senderKey: string;
    }>();
    
    if(tokenInfo != undefined ){
      return { token : tokenInfo.token , responseCode : '1000', senderKey : tokenInfo.senderKey } ;
    } else{
      const serviceInfo = await this.icKakaoService.findOne(serviceId);
      const {data}  = await this.axios.post<{ token: string; responseCode: string }>('/auth/getToken', {
       bsid: serviceInfo.bsid,
       passwd: serviceInfo.passwd,
     });

    const insertToken = this.icKakaoToken.create({
      serviceId : serviceId,
      dateId : dateId,
      token : data.token,
      senderKey : serviceInfo.senderKey
    });
    await this.icKakaoToken.insert(insertToken);

    return { ...data, senderKey: serviceInfo.senderKey };
    }
  }
  // 메시지 가져오기
  async getMessage(kakaoTalkDTO: KakaoTalkBodyDTO) {
    // DB 조회
    const result = await this.sgKakaomovmanurl.findOne(kakaoTalkDTO.info.cateid);
    // 메시지
    let kakaoMessage = result.kakaoMessage;
    // 메시지 변경
    kakaoTalkDTO.params.forEach((param) => {
      // 정규식
      const regex = new RegExp(`#{${param.param}}`, 'g');
      // 해당 메시지로 수정
      kakaoMessage = kakaoMessage.replace(regex, param.value);
    });
    // \n 처리
    kakaoMessage = kakaoMessage.replace(/\\n/g, '\n');

    // 카카오 idx , 변경된 message 리턴
    return { kakaoMsgidx: result.kakaoMsgidx, kakaoMessage };
  }

  // 메시지 전송
  async sendMessage({ info, token: { token, responseCode }, message }: SendKakaoTalkDTO) {
    if (responseCode === '1000') {
      await this.axios.post(
        '/kko/sendAlimTalk',
        {
          msgIdx: '000000',
          countryCode: 82,
          recipient: info.recipient,
          senderKey: info.senderKey,
          message: message.kakaoMessage,
          tmpltCode: message.kakaoMsgidx,
          resMethod: 'PUSH',
        },
        {
          headers: {
            post: {
              'bt-token': token,
            },
          },
        },
      );
    }
  }

  // 알림톡 전송결과 조회
  async getResult(token: string) {
    try{
      const { data } = await this.axios.get('/kko/getResultAll', {
        headers: {
          get: {
            'bt-token': token,
          },
        },
      });
      console.log(data);
      await Promise.all(
        data.response?.map(async (res) => {
          const msgIdx = res.msgIdx;
          await this.toPtptKkoHsty.update(msgIdx, { resultCode: res.resultCode, receivedAt: res.receivedAt });
        }),
      );
      return data;
    }catch(e){
      return e
    }
  }

  async getResultKp(token: string) {
    try{
      const { data } = await this.axios.get('/kko/getResultAll', {
        headers: {
          get: {
            'bt-token': token,
          },
        },
      });
      return data;
    }catch(e){
      return e
    }
  }
  async makeMessage(kakaoIdx: string, params: { param: string; value: string }[]) {
    const message = (await this.icKakaoMessage.find({ where: { kakaoIdx }, relations: ['btns'] }))[0];
    // 메시지
    let kakaoMessage = message.kakaoMessage;
    // 메시지 변경
    params.forEach((param) => {
      // 정규식
      const regex = new RegExp(`#{${param.param.replace(/([\[\]])/g, '\\$1')}}`, 'g');
      // 해당 메시지로 수정
      kakaoMessage = kakaoMessage.replace(regex, param.value);
    });
    message.kakaoMessage = kakaoMessage;

    return message;
  }

  async sendTalks(param: {
    tokenInfo: { token: string; responseCode: string; senderKey: string };
    kakaoIdx: string;
    phones: string[];
    msgIdx: string;
    scdId: number;
    params: { param: string; value: string }[];
  }) {
    // 중복 수신 제거
    const recipients = Array.from(new Set(param.phones));
    const message = await this.makeMessage(param.kakaoIdx, param.params);
    console.log(message.kakaoMessage);
    await Promise.all(
      recipients.map(async (recipient, idx) => {
        const madeParam ={
          countryCode: 82,
          msgIdx: param.msgIdx + DateUtil.format(new Date(),'MMddhhmm') + SecurityUtil.randomString(2) ,
          resMethod: 'PUSH',
          recipient: recipient,
          senderKey: param.tokenInfo.senderKey,
          tmpltCode: param.kakaoIdx,
          message: message.kakaoMessage,
          attach: {
            button: message.btns.map((btn) => StringUtils.objectKeyToSnakeCase({ obj: btn, isUpper: false })),
          },
        };
        // 이력 insert
        const [{ HSTY_ID: hstyId }] = await this.manager.query(`SELECT KKO_HSTY_SEQ.NEXTVAL AS HSTY_ID FROM DUAL`);
        const kkoHsty = this.toPtptKkoHsty.create({
          hstyId,
          scdId: param.scdId,
          sno:idx,
          message: message.kakaoMessage,
          recipient: recipient,
          tmpltCode: param.kakaoIdx,
          msgIdx: madeParam.msgIdx,
        });
        await this.toPtptKkoHsty.insert(kkoHsty);
        await this.axios.post(
          '/kko/sendAlimTalk', madeParam,
          {
            headers: {
              post: {
                'bt-token': param.tokenInfo.token,
              },
            },
          },
        );
      }),
    );
  }

  //메세지 전송시 필요한 번호
  async getCallBackNumber(serviceId: 'ECON' | 'KP') {
    const callBackNumber = serviceId === 'ECON' ? '15883818' : '0625250770';
    return callBackNumber;
  }
}
