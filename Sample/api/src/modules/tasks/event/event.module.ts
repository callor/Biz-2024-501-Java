import { IcUsr } from '@entities/ade100/common/ic-usr.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventAlrmPush } from '@entities/ade100/diary/id-event-alrm-push.entity';
import { AlrmModule } from '@modules/alrm/alrm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTaskBiz } from './event.biz';
import { EventTask } from './event.task';

@Module({
  imports: [TypeOrmModule.forFeature([IdCalendarUsr, IcUsr, IdEventAlrmPush]), AlrmModule],
  providers: [EventTask, EventTaskBiz],
  exports: [EventTask],
})
export class EventModule {}
