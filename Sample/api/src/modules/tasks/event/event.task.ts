import { IdEventAlrmPush } from '@entities/ade100/diary/id-event-alrm-push.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import DateUtil from '@utils/date.util';
import { KmemoUtil } from '@utils/kmemo.util';
import { Connection, LessThanOrEqual, Repository } from 'typeorm';
import { EventTaskBiz } from './event.biz';

@Injectable()
export class EventTask {
  constructor(
    private readonly logger: LoggerService,
    private readonly eventTaskBiz: EventTaskBiz,
    @InjectRepository(IdEventAlrmPush) private idEventAlrmPush: Repository<IdEventAlrmPush>,
    @InjectConnection() private conn: Connection,
  ) {}

  // 30초마다 서비스 호출
  @Cron('*/30 * * * * *')
  async sendEventNotification() {
    const currentTime = new Date();
    this.logger.log(`일정 알림 전송시작 ${currentTime.toLocaleString()}`);
    const pushes = await this.idEventAlrmPush.find({
      where: { syncYn: 'N', pushDt: LessThanOrEqual(new Date()) },
      relations: ['alrm', 'event', 'event.calendars', 'event.repeat'],
    });

    await this.conn.transaction(async (manager) => {
      // 가져온 알림 전체 Y
      await Promise.all(
        pushes.map(async ({ eventId, sno }) => {
          await manager.update(IdEventAlrmPush, { eventId, sno }, { syncYn: 'Y' });
        }),
      );
    });
    await this.conn.transaction(async (manager) => {
      await Promise.all(
        pushes.map(async ({ pushDt, sno, event, alrm }) => {
          if (!event.repeat) {
            await this.eventTaskBiz.sendEvent(event);
            await manager.delete(IdEventAlrmPush, { eventId: event.eventId, sno });
          } else {
            const { repeat, eventId, allDayYn } = event;
            // 현재 이벤트 일정 찾기
            let currentEventDt = DateUtil.getAlrmDate(pushDt, alrm.type, alrm.num);
            // 종일인 경우
            if (allDayYn === 'Y') {
              currentEventDt = DateUtil.set(currentEventDt, { hours: 0, minutes: 0, milliseconds: 0 });
            }
            // 종료된 반복 일정인 경우 삭제
            if (repeat.finishDt && repeat.finishDt.getTime() <= currentEventDt.getTime()) {
              await manager.delete(IdEventAlrmPush, { eventId: event.eventId, sno });
            } else {
              // 부모 일정
              const parent = await manager.findOne(IdEvent, event.parentId ?? event.eventId, {
                relations: ['childrens', 'childrens.repeat', 'childrens.alrms', 'repeat'],
              });

              // 덮어쓴 일정이 존재할 경우
              const isSkip = parent.childrens.some(
                ({ repeat, startDt }) => !repeat && DateUtil.diffDay(startDt, currentEventDt) === 0,
              );

              if (!isSkip) {
                await this.eventTaskBiz.sendEvent(event);
              }
              // 다음 알림 세팅
              const nextEventDt = KmemoUtil.getNextEventDt(currentEventDt, repeat);
              let nextPushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
              // 종일인 경우
              if (allDayYn === 'Y') {
                const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                nextPushDt = DateUtil.set(nextPushDt, { hours, minutes, milliseconds: 0 });
              }

              await manager.update(IdEventAlrmPush, { eventId, sno }, { syncYn: 'N', pushDt: nextPushDt });
            }
          }
        }),
      );
    });
  }
}
