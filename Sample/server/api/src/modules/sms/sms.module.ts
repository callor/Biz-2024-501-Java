import { SGN2 } from '@utils/constants';
import { IcSmsCert } from '@entities/ade100/common/ic-sms-cert.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsBiz } from './sms.biz';
import { SdkSmsSend } from '@entities/sgn2/sms/sdk-sms-send.entity';
import { LoggerModule } from '@modules/common/logger/logger.module';
import { SdkMmsSend } from '@entities/sgn2/sms/sdk-mms-send.entity';
import { SmsAction } from './sms.action';

@Module({
  imports: [
    TypeOrmModule.forFeature([IcSmsCert]),
    TypeOrmModule.forFeature([SdkSmsSend, SdkMmsSend], SGN2),
    LoggerModule,
  ],
  providers: [SmsBiz],
  controllers: [SmsAction],
  exports: [SmsBiz],
})
export class SmsModule {}
