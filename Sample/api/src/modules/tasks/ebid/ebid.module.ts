import { TbNotice } from '@entities/sgn2/ebid/tb-notice.entity';
import { SmsModule } from '@modules/sms/sms.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import { EBidTask } from './ebid.task';
import { EbidMsgBiz } from './ebidMsg.biz';
import { EbidStatusBiz } from './ebidStatus.biz';

@Module({
  imports: [TypeOrmModule.forFeature([TbNotice], SGN2), SmsModule],
  providers: [EBidTask, EbidMsgBiz, EbidStatusBiz],
  exports: [EbidMsgBiz, EbidStatusBiz],
})
export class EbidModule {}
