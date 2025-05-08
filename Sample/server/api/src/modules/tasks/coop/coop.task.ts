import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CoopBiz } from './coop.biz';

@Injectable()
export class CoopTask {
  constructor(private readonly coopBiz: CoopBiz, private readonly logger: LoggerService) {}
  // 상호협력 14시 데몬
  @Cron('00 00 14 * * *')
  async notOnlineUploadDoc() {
    this.logger.log(`상호협력 온라인 첨부파일 독려문자 전송 시작`);
    await this.coopBiz.notOnlineUploadDoc();
    this.logger.log(`상호협력 온라인 첨부파일 독려문자 전송 완료`);

    this.logger.log(`상호협력 온라인 교육 총인원 전송 시작`);
    await this.coopBiz.sendOnlineTotalPersonnel('econ_auto-message_004');
    this.logger.log(`상호협력 온라인 교육 총인원 전송 완료`);

    this.logger.log(`상호협력 온라인 일반 교육 총인원 전송 시작`);
    await this.coopBiz.sendNormalOnlineTotalPersonnel('econ_auto-message_017');
    this.logger.log(`상호협력 온라인 일반 교육 총인원 전송 완료`);

    this.logger.log(`상호협력 온라인 교육비 입금 전송 시작`);
    await this.coopBiz.notOnlineDeposit('econ_auto-message_006');
    this.logger.log(`상호협력 온라인 교육비 입금 전송 완료 `);

    this.logger.log(`상호협력 일반과정 교육비 입금 전송 시작`);
    await this.coopBiz.notNormalDeposit('econ_auto-message_008');
    this.logger.log(`상호협력 일반과정 교육비 입금 전송 완료`);

    this.logger.log(`상호협력 원청사 납부 온라인과정 교육비 입금 전송 시작`);
    await this.coopBiz.notOnlinePayByWondo('econ_auto-message_013');
    this.logger.log(`상호협력 원청사 납부 온라인과정 교육비 입금 전송 완료`);

    this.logger.log(`상호협력 집체 일반과정 교육참석 알림 전송 시작`);
    await this.coopBiz.sendAttendNormal('econ_auto-message_015');
    this.logger.log(`상호협력 집체 일반과정 교육참석 알림 전송 완료`);
  }

  // 강습회 1시 데몬
  @Cron('0 0 1 * * *')
  async ConfernceUnitSts() {
    this.logger.log(`강습회 접수시작일 상태 변경 시작`);
    await this.coopBiz.conferenceSts();
    this.logger.log(`강습회 접수시작일 상태 변경 완료`);
  }

  // 결과수신 및 업데이트
  @Cron('30 */1 * * * *')
    async alimTalkScheduler() {
        this.logger.log('이콘 카카오톡 전송 상태변경 시작');
        const result = await this.coopBiz.updateResult();
        this.logger.log(`이콘 카카오톡 전송 상태변경 완료 ${JSON.stringify(result)}`);
    }
}
