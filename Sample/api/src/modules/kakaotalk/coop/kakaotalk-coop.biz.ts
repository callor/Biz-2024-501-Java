import { IcKakaoBtn } from '@entities/ade100/common/ic-kakao-btn.entity';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { IcKakaoService } from '@entities/ade100/common/ic-kakao-service.entity';
import { ToCourseScd } from '@entities/sgn2/coop/to-course-scd.entity';
import { ToPtptKkoHsty } from '@entities/sgn2/coop/to-ptpt-kko-hsty.entity';
import { ToPtptReq } from '@entities/sgn2/coop/to-ptpt-req.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { KAKAO_BIZ_TALK_URL, SGN2 } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { StringUtils } from '@utils/string.utils';
import _axios from 'axios';
import { EntityManager, Repository } from 'typeorm';
import { CoopParamDTO } from '../dto/kakaotalk-coop.dto';
import { KakaoTalkBiz } from '../kakaotalk.biz';

@Injectable()
export class KakaotalkCoopBiz {
  private readonly axios = _axios.create({
    baseURL: KAKAO_BIZ_TALK_URL,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });
  private readonly SENDER_KEY = '15c47a63fff3230ae85f45b53bf6fcb6c1ee33fb';
  constructor(
    @Inject(forwardRef(() => KakaoTalkBiz))
    private readonly kakaotalkBiz: KakaoTalkBiz,
    @InjectRepository(IcKakaoService) private readonly icKakaoService: Repository<IcKakaoService>,
    @InjectRepository(IcKakaoMessage) private readonly icKakaoMessage: Repository<IcKakaoMessage>,
    @InjectRepository(IcKakaoBtn) private readonly icKakaoBtn: Repository<IcKakaoBtn>,
    @InjectRepository(ToCourseScd, SGN2) private readonly toCourseScd: Repository<ToCourseScd>,
    @InjectRepository(ToPtptReq, SGN2) private readonly toPtptReq: Repository<ToPtptReq>,
    @InjectRepository(ToPtptKkoHsty, SGN2) private readonly toPtptKkoHsty: Repository<ToPtptKkoHsty>,
    @InjectEntityManager(SGN2) private readonly manager: EntityManager,
  ) {}

  // 메시지 전송
  async sendMessage({ token: { token, responseCode, senderKey }, sendInfo }) {
    const param = {
      msgIdx: sendInfo.msgIdx,
      countryCode: 82,
      recipient: sendInfo.recipient,
      senderKey: senderKey,
      message: sendInfo.message,
      tmpltCode: sendInfo.tmpltCode,
      resMethod: 'PUSH',
    };

    // 버튼 추가
    const btns = await this.icKakaoBtn.find({ messageId: sendInfo.messageId });

    if (btns.length > 0) {
      param['attach'] = {
        button: btns.map((btn) => StringUtils.objectKeyToSnakeCase({ obj: btn, isUpper: false })),
      };
    }

    // 이력 insert
    const [{ HSTY_ID: hstyId }] = await this.manager.query(`SELECT KKO_HSTY_SEQ.NEXTVAL AS HSTY_ID FROM DUAL`);
    const kkoHsty = this.toPtptKkoHsty.create({
      hstyId,
      scdId: sendInfo.scdId,
      wondoCoid: sendInfo.wondoCoid,
      coopCoid: sendInfo.coopCoid,
      sno: sendInfo.sno,
      message: sendInfo.message,
      recipient: sendInfo.recipient,
      tmpltCode: sendInfo.tmpltCode,
      smsType: sendInfo.smsType,
      msgIdx: sendInfo.msgIdx,
    });
    await this.toPtptKkoHsty.insert(kkoHsty);

    if (responseCode === '1000') {
      await this.axios.post('/kko/sendAlimTalk', param, {
        headers: {
          post: {
            'bt-token': token,
          },
        },
      });
    }
  }

  // 메시지 가져오기
  async getMessage(kakaotalkCoopDTO: CoopParamDTO, kakaoIdx) {
    // DB 조회
    const result = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    // 메시지
    let kakaoMessage = result[0].kakaoMessage;
    // 메시지 변경
    kakaotalkCoopDTO.replaceParams.forEach((param) => {
      // 정규식
      const regex = new RegExp(`#{${param.param}}`, 'g');
      // 해당 메시지로 수정
      kakaoMessage = kakaoMessage.replace(regex, param.value);
    });
    // \n 처리
    kakaoMessage = kakaoMessage.replace(/\\n/g, '\n');

    return { kakaoMsgidx: kakaoIdx, kakaoMessage, messageId: result[0].messageId };
  }

  // 관리자 독려 메시지
  async getEncourageMsg(coopDTO: CoopParamDTO, smsType) {
    // 교육일정 정보 조회
    const courseScd = await this.toCourseScd.findOne(coopDTO.scdId);
    // 협력사별 교육생 정보 조회
    const ptptReqDTOs = await this.toPtptReq
      .createQueryBuilder('toPtptReq')
      .select('name', 'name')
      .addSelect('mp', 'mp')
      .addSelect('sno', 'sno')
      .addSelect('WONDO_COID', 'wondoCoid')
      .addSelect('DECODE(COOP_COID, NULL,COOP_CONM,GET_CONM(COOP_COID)) ', 'coopConm')
      .where(coopDTO)
      .getRawMany();

    // 메시지 조회
    let kakaoIdx = null;
    switch (smsType) {
      case '1': // 가입증명원 독려문자
        kakaoIdx = 'econ_manager-message_006';
        break;
      case '2': // 서명 독려문자
        kakaoIdx = courseScd.trt == '1' ? 'econ_manager-message_007' : 'econ_manager-message_008';
        break;
      case '3': // 통장사본 독려문자
        kakaoIdx = 'econ_manager-message_003';
        break;
      case '4':
        break;
      case '5': // 입금 독려문자
        kakaoIdx = courseScd.trt == '1' ? 'econ_manager-message_004' : 'econ_manager-message_015';
        break;
    }

    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    const sendList: {
      messageId: string;
      kakaoIdx: string;
      msg: string;
      mp: string;
      sno: string;
      wondoCoid: string;
    }[] = [];
    ptptReqDTOs.map((ptptReqDTO) => {
      const mp = ptptReqDTO.mp;
      const messageId = kakaoMessage[0].messageId;
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{협력사명}/gi, ptptReqDTO.coopConm);
      msg = msg.replace(/#{참가자명}/gi, ptptReqDTO.name);
      msg = msg.replace(/#{교육참석일자}/gi, DateUtil.format(courseScd.stdt, 'yyyy-MM-dd'));
      sendList.push({ messageId, kakaoIdx, msg, mp, sno: ptptReqDTO.sno, wondoCoid: ptptReqDTO.wondoCoid });
    });

    return sendList;
  }

  // 관리자 과정변경 메시지
  async getTrtChangeMsg(coopDTO: CoopParamDTO, smsType) {
    // 교육일정 정보조회
    const courseScd = await this.toCourseScd.findOne(coopDTO.scdId);
    // 메시지 조회
    let kakaoIdx = null;
    switch (smsType) {
      case '11': // 임원과정 변경문자
        kakaoIdx = 'econ_manager-message_001';
        break;
      case '12': // 환급과정 변경문자
        kakaoIdx = 'econ_manager-message_002';
        break;
      case '14': // 일반과정 변경문자
        kakaoIdx = 'econ_manager-message_014';
        break;
    }

    const kakaoMessage = await this.icKakaoMessage.find({ where: { kakaoIdx } });
    try {
      const messageId = kakaoMessage[0].messageId;
      let msg = kakaoMessage[0].kakaoMessage;
      msg = msg.replace(/#{협력사명}/gi, coopDTO.coopConm);
      msg = msg.replace(/#{참가자명}/gi, coopDTO.name);
      msg = msg.replace(/#{교육참석일자}/gi, DateUtil.format(courseScd.stdt, 'yyyy-MM-dd'));
      msg = msg.replace(/#{원청사명}/gi, coopDTO.wondoConm);

      return { messageId, kakaoIdx, msg };
    } catch (error) {}
  }

  // 교육 신청 및 취소 메시지
  async getEduMsg(coopDTO: CoopParamDTO) {
    // 교육일정 정보 조회
    const courseInfo = this.manager
      .createQueryBuilder()
      .select('"courseScd".stdt', 'stdt')
      .addSelect(`(SELECT PLACE_NM FROM TO_PLACE P where P.PLACE_ID = "courseScd".PLACE_ID)`, 'placeNm')
      .from('TO_COURSE_SCD', 'courseScd')
      .innerJoin('TO_PLACE', 'place', '"courseScd".PLACE_ID = "place".PLACE_ID')
      .where('"courseScd".SCD_ID = :scdId', { scdId: coopDTO['scdId'] })
      .getRawOne<{
        stdt: Date;
        placeNm: string;
      }>();

    const params = [
      {
        param: '원청사명',
        value: coopDTO['wondoConm'],
      },
      {
        param: '협력사명',
        value: coopDTO['coopConm'],
      },
      {
        param: '참가자명',
        value: coopDTO['name'],
      },
      {
        param: '교육참석일자',
        value: DateUtil.format((await courseInfo).stdt, 'yyyy-MM-dd'),
      },
      {
        param: '장소',
        value: (await courseInfo).placeNm,
      },
    ];

    const msgInfo = {
      phones: coopDTO['mp'],
      params: params,
    };
    return msgInfo;
  }
}
