import config from '@config';
import { IcSmsCert } from '@entities/ade100/common/ic-sms-cert.entity';
import { SdkMmsSend } from '@entities/sgn2/sms/sdk-mms-send.entity';
import { SdkSmsSend } from '@entities/sgn2/sms/sdk-sms-send.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import { StringUtils } from '@utils/string.utils';
import * as crypto from 'crypto';
import { addMinutes } from 'date-fns';
import { Connection, MoreThan, Repository } from 'typeorm';
import { CertDTO } from './dto/cert.dto';
import { SendSmsDTO } from './dto/send-sms.dto';
@Injectable()
export class SmsBiz {
  constructor(
    @InjectRepository(IcSmsCert) private readonly icSmsCert: Repository<IcSmsCert>,
    @InjectRepository(SdkSmsSend, SGN2) private readonly sdkSmsSend: Repository<SdkSmsSend>,
    @InjectRepository(SdkMmsSend, SGN2) private readonly sdkMmsSend: Repository<SdkMmsSend>,
    @InjectConnection(SGN2) private readonly sgn2Connect: Connection,
    private readonly logger: LoggerService,
  ) {}

  async send(msg: SendSmsDTO) {
    const byte = StringUtils.getBytes(msg.message);
    if (byte > 250) {
      await this.sendMms(msg);
    } else {
      const [{ MSG_ID: msgId }] = await this.sgn2Connect.query(`SELECT SDK_SMS_SEQ.NEXTVAL AS MSG_ID FROM DUAL`);
      const sdkSmsSend = this.sdkSmsSend.create({
        ...msg,
        msgId,
        smsMsg: msg.message.normalize('NFC'),
        destInfo: msg.mobile,
      });
      this.logger.log(`MESSAGE :: 보내요 ~ [ ${msg.mobile} ] => [ ${msg.message} ]`);
      await this.sdkSmsSend.insert(sdkSmsSend);
    }
  }

  async sendMms(msg: SendSmsDTO) {
    const [{ MSG_ID: msgId }] = await this.sgn2Connect.query(`SELECT SDK_MMS_SEQ.NEXTVAL AS MSG_ID FROM DUAL`);
    const sdkMmsSend = this.sdkMmsSend.create({
      ...msg,
      msgId,
      mmsMsg: msg.message.normalize('NFC'),
      destInfo: msg.mobile,
      subject: msg.subject,
      reserved1: msg.reserved1,
    });
    this.logger.log(`MESSAGE :: 보내요 ~ [ ${msg.mobile} ] => [ ${msg.message} ]`);
    await this.sdkMmsSend.insert(sdkMmsSend);
  }

  async cert(certDTO: CertDTO) {
    // 번호
    const mobile = certDTO.mobile.replace(/-/g, '');
    // 5분동안 몇회했는지
    const certCnt = await this.icSmsCert.count({ where: { mobile, sendDt: MoreThan(addMinutes(new Date(), -5)) } });
    if (certCnt > 5) {
      throw new HttpException('요청횟수를 초과 하였습니다.', HttpStatus.BAD_REQUEST);
    }
    // 인증번호 6자리 생성
    const certMsg = crypto.randomBytes(6).readUIntBE(0, 6).toString().slice(0, 6);
    // 마지막 sno
    const { SNO: sno } = await this.icSmsCert
      .createQueryBuilder()
      .select('NVL(MAX(SNO),0) AS sno')
      .where({ mobile })
      .getRawOne();
    await this.icSmsCert.insert({ mobile, certMsg, sno: sno + 1 });
    const message = `[본인확인] 인증번호 [${certMsg}]를 입력창에 입력해 주세요.`;
    // 메시지 전송
    await this.send({ mobile, message });

    return sno + 1;
  }

  async certConfirm(certDTO: CertDTO) {
    let { mobile } = certDTO;
    mobile = mobile.replace(/-/g, '');
    const lastData = await this.icSmsCert.find({
      where: { mobile, sendDt: MoreThan(addMinutes(new Date(), -3)) },
      order: { sno: 'DESC' },
    });
    return lastData[0]?.certMsg === certDTO.certMsg;
  }

  async certConfirmBySno(certDTO: CertDTO) {
    if (config.dev) {
      return true;
    }
    certDTO.mobile = certDTO.mobile.replace(/-/g, '');
    if (!certDTO.sno || !certDTO.mobile) {
      throw new HttpException('ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const existCnt = await this.icSmsCert.count({ sno: certDTO.sno, certMsg: certDTO.certMsg, mobile: certDTO.mobile });
    return existCnt > 0;
  }
}
