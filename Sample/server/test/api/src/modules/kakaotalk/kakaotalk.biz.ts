import { KAKAO_BIZ_TALK_URL, SG100 } from '@utils/constants';
import { SgKakaomovmanurl } from '@entities/sg100/kakaotalk/kakaotalk.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _axios from 'axios';
import {
  KakaoTalkBodyDTO,
  KakaoTalkInfoDTO,
  SendKakaoTalkDTO,
} from './dto/kakaotalk.dto';

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
  ) {}

  // 토큰 가져오기
  async getToken(kakaoTalkDTO: KakaoTalkInfoDTO) {
    const { data } = await this.axios.post('/auth/getToken', {
      bsid: kakaoTalkDTO.bsid,
      passwd: kakaoTalkDTO.passwd,
    });
    return data as { token: string; responseCode: string };
  }
  // 메시지 가져오기
  async getMessage(kakaoTalkDTO: KakaoTalkBodyDTO) {
    // DB 조회
    const result = await this.sgKakaomovmanurl.findOne(
      kakaoTalkDTO.info.cateid,
    );
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
  async sendMessage({
    info,
    token: { token, responseCode },
    message,
  }: SendKakaoTalkDTO) {
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
    const { data } = await this.axios.get('/kko/getResultAll', {
      headers: {
        get: {
          'bt-token': token,
        },
      },
    });

    return data;
  }
}
