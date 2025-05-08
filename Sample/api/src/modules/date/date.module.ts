import { Module } from '@nestjs/common';
import { DateAction } from './date.action';
import { DateBiz } from './date.biz';

@Module({
  providers: [DateBiz],
  controllers: [DateAction],
})
export class DateModule {}
