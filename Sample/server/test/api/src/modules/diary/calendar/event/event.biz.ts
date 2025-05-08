import { IdCalendarEvent } from '@entities/ade100/diary/id-calendar-event.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventAlrm } from '@entities/ade100/diary/id-event-alrm.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { IdRepeat } from '@entities/ade100/diary/id-repeat.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';
import { Brackets, Connection, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateEventDTO } from './dto/create-event.dto';
import { DeleteEventDTO } from './dto/delete-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';

@Injectable()
export class EventBiz {
  constructor(
    @InjectRepository(IdCalendarUsr)
    private readonly idCalendarUsr: Repository<IdCalendarUsr>,
    @InjectRepository(IdCalendarEvent)
    private readonly idCalendarEvent: Repository<IdCalendarEvent>,
    @InjectRepository(IdEvent)
    private readonly idEvent: Repository<IdEvent>,
    @InjectRepository(IdEventAlrm)
    private readonly idEventAlrm: Repository<IdEventAlrm>,
    @InjectRepository(IdRepeat)
    private readonly idRepeat: Repository<IdRepeat>,
    private readonly connection: Connection,
  ) {}

  // 일정 생성
  async createEvent(eventDTO: CreateEventDTO) {
    await this.connection.transaction(async (manager) => {
      const eventId = SecurityUtil.getShortUUID();
      const insertData = { ...eventDTO, eventId, repeat: undefined };
      await manager.insert(IdEvent, insertData);
      await manager.insert(IdCalendarEvent, { calendarId: eventDTO.calendarId, eventId });
      // 알림 항목이 존재한다면
      if (eventDTO.alrms?.length > 0) {
        await manager.insert(
          IdEventAlrm,
          eventDTO.alrms.map((alrm, idx) => this.idEventAlrm.create({ ...alrm, eventId, sno: idx })),
        );
      }
      // 반복된 항목 수정
      if (eventDTO.repeat) {
        await manager.insert(IdRepeat, this.idRepeat.create({ ...eventDTO.repeat, eventId }));
      }
    });
  }

  // 일정 수정
  async updateEvent(eventDTO: UpdateEventDTO) {
    const { applyType, calendarId } = eventDTO;
    // 최상위 이벤트 불러온다.
    const topEvent = await this.topLevelEvent(eventDTO.eventId);
    // 본인 일정 확인
    const { event } = await this.detailEvent(eventDTO);

    // 최상위나 현재 일정의 반복이 존재하는데 적용 타입이 없을 경우 서버 오류
    if ((topEvent?.repeat ?? event.repeat) && !applyType) {
      throw new InternalServerErrorException();
    }

    // 일정이 본인것일 경우이거나, 관리자일경우
    if ((await this.checkCalendarAuth(eventDTO)) || event.userId === eventDTO.userId) {
      // 트랜잭션
      await this.connection.transaction(async (manager) => {
        // 이벤트 키 설정
        const eventId = topEvent?.eventId ?? eventDTO.eventId;
        // 반복된 일정이 아니거나 반복 전체적용일 경우
        if (!applyType || applyType === 'ALL') {
          // 최상위 부모가 있다면 부모 적용
          const startDt = topEvent?.startDt ?? eventDTO.startDt;
          const endDt = DateUtil.addDay(startDt, DateUtil.diffDay(eventDTO.endDt, eventDTO.startDt));
          // 부모로 있는 모든 일정 삭제 하위 항목들 자동 삭제
          await manager.delete(IdEvent, { parentId: eventId });
          // 이벤트 수정 ( 사용자 키는 최초 입력한 사용자의 키값 )
          await manager.update(
            IdEvent,
            { eventId },
            {
              name: eventDTO.name,
              note: eventDTO.note,
              allDayYn: eventDTO.allDayYn,
              startDt,
              endDt,
              replyYn: eventDTO.replyYn,
            },
          );
          // 알림 삭제 후 재 추가
          await manager.delete(IdEventAlrm, { eventId });
          if (eventDTO.alrms?.length > 0) {
            await manager.insert(
              IdEventAlrm,
              eventDTO.alrms.map((alrm, sno) => this.idEventAlrm.create({ ...alrm, eventId, sno })),
            );
          }
          // 반복일정 삭제 후 재 추가
          await manager.delete(IdRepeat, { eventId });

          if (eventDTO.repeat) {
            await manager.insert(IdRepeat, this.idRepeat.create({ ...eventDTO.repeat, eventId }));
          }
        } else if (eventDTO.repeat && applyType === 'CURRENT') {
          // 반복이 아닌 일정이 현재 등록된 일정 삭제
          if (eventDTO.startDt === event.startDt && !event.repeat) {
            await manager.delete(IdEvent, event.eventId);
          }
          const newEventId = SecurityUtil.getShortUUID();
          // 이 일정만 수정될 경우 새로 추가 해준다.
          await manager.insert(IdEvent, {
            eventId: newEventId,
            parentId: eventId,
            name: eventDTO.name,
            note: eventDTO.note,
            userId: eventDTO.userId,
            allDayYn: eventDTO.allDayYn,
            startDt: eventDTO.startDt,
            endDt: eventDTO.endDt,
            replyYn: eventDTO.replyYn,
          });
          await manager.insert(IdCalendarEvent, { calendarId, eventId: newEventId });
        } else if (eventDTO.repeat && applyType === 'AFTER') {
          // 현재 이후의 일정이 수정될 경우
          const newEventId = SecurityUtil.getShortUUID();
          // 이후 일정들을 삭제 ( 이미 숨김(삭제) 처리된 내용들은 제외 )
          await manager.delete(IdEvent, {
            parentId: eventId,
            startDt: MoreThanOrEqual(eventDTO.startDt),
            hiddenYn: 'N',
          });
          // 이전 반복된 일정을 하루 전날 로 종료 시킨 후 신규 추가
          await manager.update(IdRepeat, eventDTO.eventId, { finishDt: DateUtil.addDay(eventDTO.startDt, -1) });
          // 신규 추가
          await manager.insert(IdEvent, { ...eventDTO, eventId: newEventId, parentId: eventId, repeat: undefined });
          await manager.insert(IdCalendarEvent, { calendarId, eventId: newEventId });
          // 신규 반복 등록
          await manager.insert(IdRepeat, this.idRepeat.create({ ...eventDTO.repeat, eventId: newEventId }));
        }
      });
    }
  }

  // 일정 삭제
  async deleteEvent(eventDTO: DeleteEventDTO) {
    const { eventId, applyType, startDt, userId, calendarId } = eventDTO;
    // 최상위 이벤트 불러온다.
    const topEvent = await this.topLevelEvent(eventId);

    // 본인 일정 확인
    const { event } = await this.detailEvent(eventDTO);

    // 최상위나 현재 일정의 반복이 존재하는데 적용 타입이 없을 경우 서버 오류
    if ((topEvent?.repeat ?? event.repeat) && !applyType) {
      throw new InternalServerErrorException();
    }
    // 일정이 본인것일 경우이거나, 관리자일경우
    if ((await this.checkCalendarAuth(eventDTO)) || event.userId === userId) {
      await this.connection.transaction(async (manager) => {
        // 최상위 부모 이벤트
        const { eventId: topEventId, ...topEvent } = await this.topLevelEvent(eventId);

        // 전체 삭제 인경우
        if (!applyType || applyType === 'ALL') {
          const _eventId = topEventId ?? eventId;
          // 하위 이벤트 삭제
          await manager.delete(IdEvent, { parentId: _eventId });

          // // 캘린더 에서 일정 삭제
          // await manager.delete(IdEventReply, { eventId: _eventId });
          // await manager.delete(IdCalendarEvent, { eventId: _eventId });
          // // 이벤트 알림 삭제
          // await manager.delete(IdEventAlrm, _eventId);
          // // 이벤트 반복 삭제
          // await manager.delete(IdRepeat, _eventId);
          // 이벤트 삭제
          await manager.delete(IdEvent, _eventId);
        } else if (applyType === 'CURRENT') {
          // 상위 이벤트가 있으며 현재 이벤트만 수정이 되어있는게 있다면
          if (topEvent && event.startDt === eventDTO.startDt && !event.repeat) {
            await manager.update(IdEvent, eventDTO.eventId, { hiddenYn: 'Y' });
          } else {
            const eventId = SecurityUtil.getShortUUID();
            // 현재 일정 삭제 될 경우 새로 추가 해준다.(숨김처리)
            await manager.insert(
              IdEvent,
              this.idEvent.create({
                ...topEvent,
                startDt: eventDTO.startDt,
                eventId,
                parentId: eventId,
                hiddenYn: 'Y',
              }),
            );
            await manager.insert(IdCalendarEvent, { calendarId, eventId });
          }
        } else if (applyType === 'AFTER') {
          // 현재 일정의 반복 마지막날짜 설정
          await manager.update(IdRepeat, eventId, { finishDt: DateUtil.addDay(startDt, -1) });
          // 오늘 이후의 하위 일정 제거
          await manager.delete(IdEvent, { parentId: topEventId, startDt: MoreThanOrEqual(startDt) });
        }
      });
    }
  }

  async getEvents({ calendarId, yyyymm }: { calendarId: string; yyyymm: number }) {
    const searchStart = DateUtil.getCalendarStartDay(DateUtil.ymdToDate(yyyymm + '01'));
    const searchEnd = DateUtil.getCalendarLastDay(DateUtil.ymdToDate(yyyymm + '01'));

    // 쿼리 생성 및 실행
    const calendarEvents = await this.idCalendarEvent
      .createQueryBuilder('calendar')
      .leftJoinAndSelect('calendar.event', 'event')
      .leftJoinAndSelect('event.repeat', 'repeat')
      .where('calendar.calendarId = :calendarId', { calendarId })
      .andWhere(
        new Brackets((qb) =>
          qb
            // 시작일이 해당 월에 존재 하거나
            .where('event.startDt BETWEEN :searchStart AND :searchEnd', { searchStart, searchEnd })
            // 종료가 아직 안된 일정이 있거나
            .orWhere('event.startDt <= :searchStart AND event.endDt >= :searchStart ', { searchStart })
            .orWhere(
              new Brackets((qb) =>
                qb
                  // 시작일이 이전이면서
                  .where('event.startDt < :searchStart', { searchStart })
                  .andWhere(
                    new Brackets((qb) =>
                      qb
                        // 반복종료가 설정 안되어있거나
                        .where('repeat.finishDt IS NOT NULL')
                        // 종료가 이번달 이후 인 경우
                        .orWhere('repeat.finishDt >= :searchStart', { searchStart }),
                    ),
                  ),
              ),
            ),
        ),
      )
      .getMany();

    let events: IdEvent[] = [];
    calendarEvents.forEach(({ event }) => {
      // 반복이 있을경우
      if (event.repeat) {
        const {
          startDt,
          endDt,
          repeat: { type, num, byWeek, byDay },
        } = event;

        if (type === 'D' || type === 'W') {
          // 일자 및 주별 반복
          const repeatDay = type === 'W' ? num * 7 : num;
          // 반복 시작일과 현재 월의 시작일 비교
          const diff = DateUtil.diffDay(searchStart, startDt);
          // 비교된 값이 1보다 작은 경우 시작일이 현재 월보다 전이기 때문에 현재월의 가장 첫번째 돌아오는 날짜를 가져온다.
          let eventDt = diff < 1 ? startDt : DateUtil.addDay(searchStart, repeatDay - (diff % repeatDay));

          while (
            // 반복 마지막이 설정되지 않았거나 설정되어있는경우 일정 반복이 종료 되지 않았을 경우
            (!event.repeat.finishDt || DateUtil.diffDay(event.repeat.finishDt, eventDt) <= 0) &&
            DateUtil.diffDay(eventDt, searchEnd) < 0
          ) {
            // 일정의 마지막날 설정
            const eventEndDt = DateUtil.addDay(eventDt, DateUtil.diffDay(endDt, startDt));

            // 이벤트 생성
            const repeatEvent = { ...event, startDt: eventDt, endDt: eventEndDt };

            const overwriteEventIndex = events.findIndex((_event) => {
              return (
                repeatEvent.parentId &&
                (repeatEvent.parentId === _event.parentId ?? _event.eventId) &&
                DateUtil.isSameDay(repeatEvent.startDt, _event.startDt)
              );
            });
            // 덮여쓰여진 데이터가 없을경우에만 넣는다
            if (overwriteEventIndex < 0) {
              events.push(repeatEvent);
            }

            // 일자 재 수정
            eventDt = DateUtil.addDay(eventDt, repeatDay);
          }
        } else if (type === 'M' || type === 'Y') {
          const diffMonth = DateUtil.diffMonth(searchStart, startDt);
          const repeatMonth = type === 'Y' ? num * 12 : num;
          // 월 반복 일 경우 현재 월이 맞는지만 체크 한다.
          if (diffMonth > -1 && diffMonth % repeatMonth === 0) {
            const eventDt = diffMonth === 0 ? startDt : DateUtil.addMonth(startDt, diffMonth / repeatMonth);
            if (byWeek && byDay) {
              // 요일 조정
              let settingDt = DateUtil.setDayOfWeek(eventDt, byDay);
              // 이 달의 몇 번째 주인지
              const week = DateUtil.getWeekOfMonth(settingDt);
              // 차이 나는 주 만큼 더해준다
              settingDt = DateUtil.addDay(settingDt, (Number(byWeek) - week) * 7);
              while (DateUtil.diffDay(searchStart, settingDt) !== 0) {
                // 월 차이가 난다면 재수정
                settingDt = DateUtil.addDay(settingDt, DateUtil.diffMonth(searchStart, settingDt) * 7);
              }

              const evnetEndDt = DateUtil.addDay(settingDt, DateUtil.diffDay(endDt, startDt));

              const repeatEvent = { ...event, startDt: eventDt, endDt: evnetEndDt };
              const overwriteEventIndex = events.findIndex(
                (_event) =>
                  !_event.repeat &&
                  (repeatEvent.parentId === _event.parentId ?? _event.eventId) &&
                  DateUtil.isSameDay(repeatEvent.startDt, _event.startDt),
              );

              // 덮여쓰여진 데이터가 없을경우에만 넣는다
              if (overwriteEventIndex < 0) {
                events.push(repeatEvent);
              }
            } else {
              const evnetEndDt = DateUtil.addDay(eventDt, DateUtil.diffDay(endDt, startDt));

              const repeatEvent = { ...event, startDt: eventDt, endDt: evnetEndDt };
              const overwriteEventIndex = events.findIndex(
                (_event) =>
                  !_event.repeat &&
                  (repeatEvent.parentId === _event.parentId ?? _event.eventId) &&
                  DateUtil.isSameDay(repeatEvent.startDt, _event.startDt),
              );

              // 덮여쓰여진 데이터가 없을경우에만 넣는다
              if (overwriteEventIndex < 0) {
                events.push(repeatEvent);
              }
            }
          }
        }
      } else {
        // 반복이벤트가 이니면서 부모키가 있을 경우 기존 이벤트를 찾아 덮어쓴다
        if (event.parentId) {
          // 수정 할 이벤트 index 값
          const overwriteEventIndex = events.findIndex(
            (_event) =>
              (event.parentId === _event.parentId ?? _event.eventId) &&
              DateUtil.isSameDay(event.startDt, _event.startDt),
          );
          if (overwriteEventIndex > -1) {
            if (event.hiddenYn === 'Y') {
              // 삭제 처리
              events = [...events.slice(0, overwriteEventIndex), ...events.slice(overwriteEventIndex + 1)];
            } else {
              // 덮어쓰기
              events = [...events.slice(0, overwriteEventIndex), event, ...events.slice(overwriteEventIndex + 1)];
            }
          } else {
            events.push(event);
          }
        } else {
          events.push(event);
        }
      }
    });
    return events.sort((event1, event2) => DateUtil.diffDay(event1.startDt, event2.startDt));
  }

  async detailEvent({ calendarId, eventId }: { calendarId: string; eventId: string }) {
    const event = (
      await this.idCalendarEvent.find({
        where: { calendarId, eventId },
        relations: [
          'event',
          'event.member',
          'event.replys',
          'event.replys.member',
          'event.repeat',
          'event.modifys',
          'event.alrms',
        ],
      })
    )[0];

    const parentId = event.event.parentId;

    if (parentId) {
      const parentEvent = await this.idEvent.findOne(parentId, { relations: ['repeat', 'alrms'] });
      event.event.repeat = parentEvent.repeat;
      event.event.alrms = parentEvent.alrms;
    }

    return event;
  }

  // 캘린더 관리자 권한 체크
  async checkCalendarAuth({ calendarId, userId }: { calendarId: string; userId: string }) {
    const calendar = (await this.idCalendarUsr.find({ calendarId, userId }))[0];
    return [5, 9].includes(calendar?.lv);
  }

  // 최상위 이벤트
  async topLevelEvent(eventId: string) {
    const event = await this.getParentEvent(eventId);
    if (event?.parentId) {
      await this.topLevelEvent(event.parentId);
    } else {
      return event;
    }
  }

  // 현재 상위 이벤트
  async getParentEvent(eventId: string) {
    const event = await this.idEvent.findOne(eventId, { relations: ['modifyEvent'] });
    return event?.modifyEvent;
  }
}
