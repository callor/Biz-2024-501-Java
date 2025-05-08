import { IdCalendarEvent } from '@entities/ade100/diary/id-calendar-event.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdCommonCalendar } from '@entities/ade100/diary/id-common-calendar.entity';
import { IdEventAlrm } from '@entities/ade100/diary/id-event-alrm.entity';
import { IdEventFile } from '@entities/ade100/diary/id-event-file.entity';
import { IdEventReply } from '@entities/ade100/diary/id-event-reply.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { IdRepeat } from '@entities/ade100/diary/id-repeat.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAction } from './event.action';
import { EventBiz } from './event.biz';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IdCommonCalendar,
      IdCalendarUsr,
      IdCalendarEvent,
      IdEventReply,
      IdEvent,
      IdEventAlrm,
      IdRepeat,
      IdEventFile,
    ]),
  ],
  controllers: [EventAction],
  providers: [EventBiz],
  exports: [EventBiz],
})
export class EventModule {}
