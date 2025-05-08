import { IdCalendarEvent } from '@entities/ade100/diary/id-calendar-event.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventAlrm } from '@entities/ade100/diary/id-event-alrm.entity';
import { IdEventReply } from '@entities/ade100/diary/id-event-reply.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { IdRepeat } from '@entities/ade100/diary/id-repeat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAction } from './event.action';
import { EventBiz } from './event.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IdCalendarUsr, IdCalendarEvent, IdEventReply, IdEvent, IdEventAlrm, IdRepeat])],
  controllers: [EventAction],
  providers: [EventBiz],
})
export class EventModule {}
