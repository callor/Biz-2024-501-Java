import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventReply } from '@entities/ade100/diary/id-event-reply.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { AlrmModule } from '@modules/alrm/alrm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyAction } from './reply.action';
import { ReplyBiz } from './reply.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IdCalendarUsr, IdEvent, IdEventReply]), AlrmModule],
  controllers: [ReplyAction],
  providers: [ReplyBiz],
})
export class ReplyModule {}
