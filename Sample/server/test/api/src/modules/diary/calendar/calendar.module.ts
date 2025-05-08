import { IdCalendarEvent } from '@entities/ade100/diary/id-calendar-event.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdCalendar } from '@entities/ade100/diary/id-calendar.entity';
import { IdEventAlrm } from '@entities/ade100/diary/id-event-alrm.entity';
import { IdEventReply } from '@entities/ade100/diary/id-event-reply.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { IdRepeat } from '@entities/ade100/diary/id-repeat.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarAction } from './calendar.action';
import { CalendarBiz } from './calendar.biz';
import { AlrmModule } from '@modules/alrm/alrm.module';
import { EventModule } from './event/event.module';
import { ReplyModule } from './event/reply/reply.module';
import { UserModule } from '@modules/user/user.module';
import { IdCommonCalendar } from '@entities/ade100/diary/id-common-calendar.entity';

@Module({
  imports: [
    // 사용자
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      IdCalendar,
      IdCommonCalendar,
      IdCalendarEvent,
      IdCalendarUsr,
      IdEvent,
      IdRepeat,
      IdEventAlrm,
      IdEventReply,
    ]),
    // 캘린더 일정
    EventModule,
    // 캘린더 일정 댓글
    ReplyModule,
    // 사용자 알림
    AlrmModule,
  ],
  controllers: [CalendarAction],
  providers: [CalendarBiz],
  exports: [CalendarBiz],
})
export class CalendarModule {}
