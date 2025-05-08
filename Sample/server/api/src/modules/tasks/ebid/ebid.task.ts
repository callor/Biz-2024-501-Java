import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EbidMsgBiz } from './ebidMsg.biz';
import { EbidStatusBiz } from './ebidStatus.biz';

@Injectable()
export class EBidTask {
  constructor(
    private readonly ebidMsgBiz: EbidMsgBiz,
    private readonly ebidStatusBiz: EbidStatusBiz,
    private readonly logger: LoggerService,
  ) {}

  // @Cron('0 */1 * * * *')
  async test() {}

  // 입찰 사용업체 등장으로 인한 1분 주기로 재변경
  @Cron('0 */1 * * * *')
  async bidScheduler() {
    this.logger.log(`공고 진행상태 변경 시작`);
    await this.ebidStatusBiz.updateBidStatus();
    this.logger.log(`공고 진행상태 변경 완료`);

    this.logger.log(`To.등록업체 : 현설참여 첨부서류 등록 요청 시작`);
    await this.ebidMsgBiz.uploadInspectionFile();
    this.logger.log(`To.등록업체 : 현설참여 첨부서류 등록 요청 완료`);

    this.logger.log(`To.지원업체 : 입찰공고 알림 시작`);
    await this.ebidMsgBiz.bidNoticeMsg();
    this.logger.log(`To.지원업체 : 입찰공고 알림 완료`);

    this.logger.log(`To.지원업체 : 현장설명회 당일 알림 시작`);
    await this.ebidMsgBiz.attendSiteMsg();
    this.logger.log(`To.지원업체 : 현장설명회 당일 알림 완료`);

    this.logger.log(`To.지원업체 : 재입찰공고 알림 시작`);
    await this.ebidMsgBiz.reBidNoticeMsg();
    this.logger.log(`To.지원업체 : 재입찰공고 알림 완료`);
  }

  // 10시
  @Cron('0 0 10 * * *')
  async openBid() {
    this.logger.log(`To.등록업체 : 개찰일시 1일 전 알림문자 전송 시작`);
    await this.ebidMsgBiz.openBidMsg();
    this.logger.log(`To.등록업체 : 개찰일시 1일 전 알림문자 전송 완료`);

    this.logger.log(`To.지원업체 : 입찰공고 마감 1일 전 알림문자 전송 시작`);
    await this.ebidMsgBiz.bidEddtMsg();
    this.logger.log(`To.지원업체 : 입찰공고 마감 1일 전 알림문자 전송 완료`);
  }
}
