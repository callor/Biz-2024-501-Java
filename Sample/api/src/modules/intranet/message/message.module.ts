import { INTRANET } from './../../../utils/constants';
import { SlipReceiver } from '@entities/intranet/message/slip-receiver.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageAction } from './message.action';
import { MessageBiz } from './message.biz';

@Module({
  imports: [TypeOrmModule.forFeature([SlipReceiver], INTRANET)],
  controllers: [MessageAction],
  providers: [MessageBiz],
})
export class MessageModule {}
