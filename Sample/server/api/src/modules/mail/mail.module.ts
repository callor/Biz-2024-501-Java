import { LoggerModule } from '@modules/common/logger/logger.module';
import { Module } from '@nestjs/common';
import { MailBiz } from './mail.biz';

@Module({
  imports: [LoggerModule],
  providers: [MailBiz],
  exports: [MailBiz],
})
export class MailModule {}
