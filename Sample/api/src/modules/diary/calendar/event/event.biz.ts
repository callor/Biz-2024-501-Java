import { IdCalendarEvent } from '@entities/ade100/diary/id-calendar-event.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventAlrmPush } from '@entities/ade100/diary/id-event-alrm-push.entity';
import { IdEventAlrm } from '@entities/ade100/diary/id-event-alrm.entity';
import { IdEventFile } from '@entities/ade100/diary/id-event-file.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { IdRepeat } from '@entities/ade100/diary/id-repeat.entity';
import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DateUtil from '@utils/date.util';
import { KmemoUtil } from '@utils/kmemo.util';
import { SecurityUtil } from '@utils/security.util';
import { Brackets, Connection, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
    @InjectRepository(IdEventFile)
    private readonly idEventFile: Repository<IdEventFile>,
  ) {}

  // 일정 생성
  async createEvent(eventDTO: CreateEventDTO) {
    await this.connection.transaction(async (manager) => {
      const eventId = SecurityUtil.getShortUUID();
      const insertData = { ...eventDTO, eventId, repeat: undefined, files: undefined };
      await manager.insert(IdEvent, insertData);
      await manager.insert(IdCalendarEvent, { calendarId: eventDTO.calendarId, eventId });
      // 알림 항목이 존재한다면
      if (eventDTO.alrms?.length > 0) {
        const now = new Date();
        await Promise.all(
          eventDTO.alrms.map(async (alrm, sno) => {
            const { allDayYn, startDt } = eventDTO;
            await manager.insert(IdEventAlrm, this.idEventAlrm.create({ ...alrm, eventId, sno }));
            // 최초 알림 전송 세팅
            let pushDt = DateUtil.setAlrmDate(startDt, alrm.type, alrm.num);
            // 종일인 경우
            if (allDayYn === 'Y') {
              const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
              pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
            }
            // 현재 시간보다 클경우에만 집어넣어준다.
            if (pushDt.getTime() > now.getTime()) {
              await manager.insert(IdEventAlrmPush, { eventId, sno, pushDt });
            } else {
              // 반복된 일정이면 가장 최신의 일정을 집어넣어준다.
              if (eventDTO.repeat) {
                const { startDt: eventDt, repeat: option } = eventDTO;
                // 현재 와 비교하여 가장 최신의 알림 일자를 가져온다.
                let nextEventDt = KmemoUtil.getNextEventDtAfterBaseDt({
                  eventDt,
                  baseDt: now,
                  option,
                });
                // 최초 알림 전송 세팅
                let pushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
                // 종일인 경우
                if (allDayYn === 'Y') {
                  const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                  pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
                }
                // 다음알림이 맞춰질때까지
                while (pushDt.getTime() < now.getTime()) {
                  nextEventDt = KmemoUtil.getNextEventDt(nextEventDt, option);
                  pushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
                  // 종일인 경우
                  if (allDayYn === 'Y') {
                    const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                    pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
                  }
                }
              }
            }
          }),
        );
      }
      // 반복된 항목 수정
      if (eventDTO.repeat) {
        await manager.insert(IdRepeat, this.idRepeat.create({ ...eventDTO.repeat, eventId }));
      }

      // 첨부파일이 존재한다면
      if (eventDTO.files?.length > 0) {
        await manager.insert(
          IdEventFile,
          eventDTO.files.map(({ fileId }, sno) => this.idEventFile.create({ eventId, fileId, sno })),
        );
      }
    });
  }

  // 일정 수정
  async updateEvent(eventDTO: UpdateEventDTO) {
    const { applyType } = eventDTO;
    const currentEvent = await this.idEvent.findOne(eventDTO.eventId, { relations: ['calendars', 'repeat'] });
    if (!currentEvent) {
      throw new InternalServerErrorException('Event Not Found');
    }
    const isCalendarAuth = await this.checkCalendarAuth(eventDTO);
    if (!isCalendarAuth && currentEvent?.userId !== eventDTO.userId) {
      throw new ForbiddenException('Event Forbidden');
    }

    await this.connection.transaction(async (manager) => {
      // 수정
      const doEventUpdate = async (event: UpdateEventDTO) => {
        const { eventId } = event;
        // 알림 삭제
        await manager.delete(IdEventAlrm, { eventId });
        // 파일 삭제
        await manager.delete(IdEventFile, { eventId });
        // 반복 삭제
        await manager.delete(IdRepeat, { eventId });
        // 일정 수정
        await manager.update(
          IdEvent,
          { eventId },
          {
            name: event.name,
            note: event.note,
            allDayYn: event.allDayYn,
            startDt: event.startDt,
            endDt: event.endDt,
            replyYn: event.replyYn,
          },
        );
        if (event.repeat) {
          // 반복 추가
          await manager.insert(IdRepeat, this.idRepeat.create({ ...event.repeat, eventId }));
        }
        // 알림항목 존재시
        // 알림 항목이 존재한다면
        if (event.alrms?.length > 0) {
          const now = new Date();
          await Promise.all(
            event.alrms.map(async (alrm, sno) => {
              const { allDayYn, startDt } = event;
              await manager.insert(IdEventAlrm, this.idEventAlrm.create({ ...alrm, eventId, sno }));
              // 최초 알림 전송 세팅
              let pushDt = DateUtil.setAlrmDate(startDt, alrm.type, alrm.num);
              // 종일인 경우
              if (allDayYn === 'Y') {
                const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
              }
              // 현재 시간보다 클경우에만 집어넣어준다.
              if (pushDt.getTime() > now.getTime()) {
                await manager.insert(IdEventAlrmPush, { eventId, sno, pushDt });
              } else {
                // 반복된 일정이면 가장 최신의 일정을 집어넣어준다.
                if (event.repeat) {
                  const { startDt: eventDt, repeat: option } = event;
                  // 현재 와 비교하여 가장 최신의 알림 일자를 가져온다.
                  let nextEventDt = KmemoUtil.getNextEventDtAfterBaseDt({
                    eventDt,
                    baseDt: now,
                    option,
                  });
                  // 최초 알림 전송 세팅
                  let pushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
                  // 종일인 경우
                  if (allDayYn === 'Y') {
                    const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                    pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
                  }
                  // 다음알림이 맞춰질때까지
                  while (pushDt.getTime() < now.getTime()) {
                    nextEventDt = KmemoUtil.getNextEventDt(nextEventDt, option);
                    pushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
                    // 종일인 경우
                    if (allDayYn === 'Y') {
                      const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                      pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
                    }
                  }
                  await manager.insert(IdEventAlrmPush, { eventId, sno, pushDt });
                }
              }
            }),
          );
        }
        // 파일항목 존재시
        if (event.files?.length > 0) {
          await manager.insert(
            IdEventFile,
            event.files.map(({ fileId }, sno) => this.idEventFile.create({ eventId, fileId, sno })),
          );
        }
        // 캘린더 항목 변경시
        const isChangeCalendar = currentEvent.calendars.every(({ calendarId }) => calendarId !== event.calendarId);
        if (isChangeCalendar) {
          const { calendarId, eventId } = event;
          await manager.delete(IdCalendarEvent, { eventId });
          await manager.insert(IdCalendarEvent, { calendarId, eventId });
        }
      };

      // 추가
      const doEventInsert = async (event: CreateEventDTO) => {
        const eventId = SecurityUtil.getShortUUID();
        const insertData = {
          ...event,
          eventId,
          repeat: undefined,
          files: undefined,
          regdt: undefined,
          uptdt: undefined,
        };
        await manager.insert(IdEvent, insertData);
        await manager.insert(IdCalendarEvent, { calendarId: event.calendarId, eventId });
        if (event.alrms?.length > 0) {
          const now = new Date();
          await Promise.all(
            event.alrms.map(async (alrm, sno) => {
              const { allDayYn, startDt } = event;
              await manager.insert(IdEventAlrm, this.idEventAlrm.create({ ...alrm, eventId, sno }));
              // 최초 알림 전송 세팅
              let pushDt = DateUtil.setAlrmDate(startDt, alrm.type, alrm.num);
              // 종일인 경우
              if (allDayYn === 'Y') {
                const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
              }
              // 현재 시간보다 클경우에만 집어넣어준다.
              if (pushDt.getTime() > now.getTime()) {
                await manager.insert(IdEventAlrmPush, { eventId, sno, pushDt });
              } else {
                // 반복된 일정이면 가장 최신의 일정을 집어넣어준다.
                if (event.repeat) {
                  const { startDt: eventDt, repeat: option } = event;
                  // 현재 와 비교하여 가장 최신의 알림 일자를 가져온다.
                  let nextEventDt = KmemoUtil.getNextEventDtAfterBaseDt({
                    eventDt,
                    baseDt: now,
                    option,
                  });
                  // 최초 알림 전송 세팅
                  let pushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
                  // 종일인 경우
                  if (allDayYn === 'Y') {
                    const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                    pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
                  }
                  // 다음알림이 맞춰질때까지
                  while (pushDt.getTime() < now.getTime()) {
                    nextEventDt = KmemoUtil.getNextEventDt(nextEventDt, option);
                    pushDt = DateUtil.setAlrmDate(nextEventDt, alrm.type, alrm.num);
                    // 종일인 경우
                    if (allDayYn === 'Y') {
                      const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
                      pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
                    }
                  }
                  await manager.insert(IdEventAlrmPush, { eventId, sno, pushDt });
                }
              }
            }),
          );
        }
        // 반복된 항목 수정
        if (event.repeat) {
          await manager.insert(IdRepeat, this.idRepeat.create({ ...event.repeat, eventId }));
        }

        // 첨부파일이 존재한다면
        if (event.files?.length > 0) {
          await manager.insert(
            IdEventFile,
            event.files.map(({ fileId }, sno) => this.idEventFile.create({ eventId, fileId, sno })),
          );
        }
      };

      // 반복일정이 아닌 경우
      if (!applyType) {
        await doEventUpdate(eventDTO);
      } else {
        // 상위 이벤트를 불러온다.
        const parentEvent = await this.getParentEvent(eventDTO.eventId);
        // 부모 이벤트 키
        const parentId = parentEvent?.eventId ?? currentEvent.eventId;
        // 반복 일정 처리
        if (applyType === 'ALL') {
          // 부모가 있는지 판단하여 값 수정
          const startDt = parentEvent?.startDt ?? currentEvent.startDt;
          const endDt = parentEvent?.endDt ?? currentEvent.endDt;

          if (parentEvent) {
            // 부모로 있는 모든 일정 삭제 하위 항목들 자동 삭제
            await manager.delete(IdEvent, { parentId });
          }
          // 이벤트 업데이트
          await doEventUpdate({ ...eventDTO, eventId: parentId, startDt, endDt });
        } else if (applyType === 'CURRENT') {
          if (DateUtil.diffDay(eventDTO.startDt, currentEvent.startDt) === 0 && !currentEvent.repeat) {
            await doEventUpdate({ ...eventDTO, repeat: undefined, parentId });
          } else {
            await doEventInsert({ ...eventDTO, repeat: undefined, parentId });
          }
        } else if (applyType === 'AFTER') {
          // 이후 모든 일정 (숨김 제외) 삭제
          await manager.delete(IdEvent, {
            parentId,
            startDt: MoreThanOrEqual(eventDTO.startDt),
            hiddenYn: 'N',
          });

          // 이전 일정 중 마지막 반복 일정
          const lastEvent = (
            await manager.find(IdEvent, {
              where: { parentId, startDt: LessThanOrEqual(eventDTO.startDt) },
              order: { startDt: 'DESC' },
              join: {
                alias: 'event',
                innerJoinAndSelect: {
                  repeat: 'event.repeat',
                },
              },
            })
          )[0];

          const changeRepeatEventId = lastEvent?.eventId ?? currentEvent.eventId;
          await manager.update(IdRepeat, changeRepeatEventId, {
            finishDt: DateUtil.addDay(eventDTO.startDt, -1),
          });
          await doEventInsert({ ...eventDTO, parentId, repeat: { ...eventDTO.repeat, finishDt: undefined } });
        }
      }
    });
  }

  // 일정 삭제
  async deleteEvent(eventDTO: DeleteEventDTO) {
    const { applyType } = eventDTO;
    const currentEvent = await this.idEvent.findOne(eventDTO.eventId, { relations: ['repeat'] });
    if (!currentEvent) {
      throw new InternalServerErrorException('Event Not Found');
    }
    const isCalendarAuth = await this.checkCalendarAuth(eventDTO);
    if (!isCalendarAuth && currentEvent?.userId !== eventDTO.userId) {
      throw new ForbiddenException('Event Forbidden');
    }
    await this.connection.transaction(async (manager) => {
      if (!applyType) {
        await manager.delete(IdEvent, { eventId: eventDTO.eventId });
      } else {
        // 상위 이벤트를 불러온다.
        const parentEvent = await this.getParentEvent(eventDTO.eventId);
        // 부모 이벤트 키
        const parentId = parentEvent?.eventId ?? currentEvent.eventId;

        if (applyType === 'ALL') {
          await manager.delete(IdEvent, { eventId: parentId });
        } else if (applyType === 'CURRENT') {
          if (DateUtil.diffDay(eventDTO.startDt, currentEvent.startDt) === 0 && !currentEvent.repeat) {
            await manager.update(IdEvent, currentEvent.eventId, { hiddenYn: 'Y' });
          } else {
            const { calendarId, startDt } = eventDTO;
            const eventId = SecurityUtil.getShortUUID();
            const endDt = DateUtil.addDay(eventDTO.startDt, DateUtil.diffDay(currentEvent.endDt, currentEvent.startDt));
            // 현재 일정 삭제 될 경우 새로 추가 해준다.(숨김처리)
            await manager.insert(
              IdEvent,
              this.idEvent.create({
                ...currentEvent,
                eventId,
                parentId,
                startDt,
                endDt,
                hiddenYn: 'Y',
                repeat: undefined,
                regdt: undefined,
                uptdt: undefined,
              }),
            );
            await manager.insert(IdCalendarEvent, { calendarId, eventId });
          }
        } else if (applyType === 'AFTER') {
          // 이후 모든 일정 (숨김 제외) 삭제
          await manager.delete(IdEvent, {
            parentId,
            startDt: MoreThanOrEqual(eventDTO.startDt),
          });
          // 상위 이벤트 일정과 동일한 날짜의 경우
          if (parentEvent && DateUtil.diffDay(parentEvent.startDt, eventDTO.startDt) === 0) {
            await manager.delete(IdEvent, parentEvent.eventId);
          } else {
            // 상위 이벤트 없고 현재 이벤트 날짜와 지우려는 날짜가 동일한경우 전체 삭제
            if (!parentEvent && DateUtil.diffDay(currentEvent.startDt, eventDTO.startDt) === 0) {
              await manager.delete(IdEvent, currentEvent.eventId);
            } else {
              // 이전 일정 중 마지막 반복 일정
              const lastEvent = (
                await manager.find(IdEvent, {
                  where: { parentId, startDt: LessThanOrEqual(eventDTO.startDt) },
                  order: { startDt: 'DESC' },
                  join: {
                    alias: 'event',
                    innerJoinAndSelect: {
                      repeat: 'event.repeat',
                    },
                  },
                })
              )[0];

              const changeRepeatEventId = lastEvent?.eventId ?? currentEvent.eventId;
              await manager.update(IdRepeat, changeRepeatEventId, {
                finishDt: DateUtil.addDay(eventDTO.startDt, -1),
              });
            }
          }
        }
      }
    });
  }

  async getMonthEvents({ calendarIds, yyyymm }: { calendarIds: string[]; yyyymm: number }) {
    const monthStart = DateUtil.ymdToDate(yyyymm + '01'); //          달의 시작일
    const start = DateUtil.getCalendarStartDay(monthStart); //  해당 달 1째주 일요일
    const end = DateUtil.getCalendarLastDay(monthStart); //     해당 달 마지막주 토요일
    return await this.getEvents({ calendarIds, start, end });
  }

  async getEvents({
    calendarIds,
    start,
    end,
    search,
  }: {
    calendarIds: string[];
    start: Date;
    end: Date;
    search?: string;
  }) {
    // 쿼리 생성 및 실행
    const query = this.idCalendarEvent
      .createQueryBuilder('calendar')
      .leftJoinAndSelect('calendar.event', 'event')
      .leftJoinAndSelect('event.repeat', 'repeat')
      .leftJoinAndSelect('event.files', 'files')
      .where('calendar.calendarId IN ( :...calendarIds )', { calendarIds })
      .andWhere(
        new Brackets((qb) =>
          qb
            // 시작일이 해당 월에 존재 하거나
            .where('event.startDt BETWEEN :searchStart AND :searchEnd')
            // 종료가 아직 안된 일정이 있거나
            .orWhere('( event.startDt <= :searchStart AND event.endDt >= :searchStart )')
            .orWhere(
              new Brackets((qb) =>
                qb
                  // 시작일이 이전이면서
                  .where('event.startDt < :searchStart')
                  .andWhere(
                    new Brackets((qb) =>
                      qb
                        // 반복종료가 설정 안되어있거나
                        .where('repeat.eventId IS NOT NULL')
                        // 종료가 없거나, 이번달 이후 인 경우
                        .andWhere('( repeat.finishDt IS NULL OR repeat.finishDt >= :searchStart )'),
                    ),
                  ),
              ),
            ),
        ),
      )
      .orderBy({ 'event.hiddenYn': 'ASC', 'event.startDt': 'ASC' });
    // 검색어가 존재한다면
    if (search) {
      const _search = search.toLowerCase();
      query.andWhere(
        new Brackets((qb) =>
          qb
            .where(`LOWER(event.note) LIKE '%' || :search || '%'`, { search: _search })
            .orWhere(`LOWER(event.name) LIKE '%' || :search || '%'`, { search: _search }),
        ),
      );
    }

    // 쿼리 실행
    const calendarEvents = await query.setParameters({ searchStart: start, searchEnd: end }).getMany();

    let events: IdEvent[] = [];
    calendarEvents.forEach(({ event, calendarId }) => {
      const { repeat, parentId, startDt, hiddenYn, endDt, eventId } = event;

      event['calendarId'] = calendarId;
      // 일반적인 일정
      if (!repeat && !parentId) {
        events.push(event);
      }

      // 부모 키는 있는데 반복이 아닌 경우 = 반복 중 하루 만 덮어 쓴 일정
      if (!repeat && parentId) {
        const overwriteIdx = events.findIndex(
          (event) => parentId === (event.parentId ?? event.eventId) && DateUtil.isSameDay(startDt, event.startDt),
        );
        // 덮어쓰거나 지운다.
        if (overwriteIdx > -1) {
          if (hiddenYn === 'Y') {
            events = events.filter((_, idx) => idx !== overwriteIdx);
          } else {
            events[overwriteIdx] = event;
          }
        } else if (hiddenYn === 'N') {
          events.push(event);
        }
      }
      // 반복 일정
      if (repeat && hiddenYn === 'N') {
        const { finishDt } = repeat; // 반복 종료 일자
        const diffDay = DateUtil.diffDay(endDt, startDt); // 일정이 긴 경우

        // 검색 일자 기준으로 가장 최신의 일정을 가져온다.
        let nextEventDt = KmemoUtil.getNextEventDtAfterBaseDt({
          eventDt: event.startDt,
          baseDt: DateUtil.addDay(start, -diffDay),
          option: repeat,
        });
        while (
          // 종료일정이 없거나 있는 경우 종료일자 보다 작아야하며 다음 일정이 검색 종료일자보다 작은 경우
          (!finishDt || (finishDt && DateUtil.diffDay(finishDt, nextEventDt) > 0)) &&
          nextEventDt.getTime() < end.getTime()
        ) {
          const startDt = nextEventDt; // 시작일
          const endDt = DateUtil.addDay(nextEventDt, diffDay); // 종료일
          // 하루만 수정된 일정이 존재 하는지 체크
          const isOverwrite = events.some(
            (event) =>
              event.parentId &&
              !event.repeat &&
              (event.parentId === (parentId ?? eventId)) &&
              DateUtil.isSameDay(startDt, event.startDt),
          );

          if (!isOverwrite) {
            events.push({ ...event, startDt, endDt });
          }

          // 다음 일정 세팅
          nextEventDt = KmemoUtil.getNextEventDt(nextEventDt, repeat);
        }
      }
    });
    return events.sort((e1, e2) => e1.startDt.getTime() - e2.startDt.getTime());
  }

  async detailEvent({ calendarId, eventId, userId }: { calendarId: string; eventId: string; userId?: string }) {
    const isAdmin = userId ? [3, 5, 9].includes((await this.idCalendarUsr.find({ calendarId, userId }))[0]?.lv) : false;

    const event = (
      await this.idEvent.find({
        where: { eventId },
        relations: ['member', 'repeat', 'alrms', 'files', 'files.file'],
      })
    )[0];

    // 수정여부 한번 더 체크
    const isModify = isAdmin ? isAdmin : event.userId === userId;

    const parentId = event.parentId;

    if (parentId) {
      const parentEvent = await this.idEvent.findOne(parentId, { relations: ['repeat', 'alrms'] });
      event.repeat = parentEvent.repeat;
      event.alrms = parentEvent.alrms;
    }
    return { ...event, isModify };
  }

  // 캘린더 관리자 권한 체크
  async checkCalendarAuth({ calendarId, userId }: { calendarId: string; userId: string }) {
    const calendar = (await this.idCalendarUsr.find({ calendarId, userId }))[0];
    return [3, 5, 9].includes(calendar?.lv);
  }

  // 현재 상위 이벤트
  async getParentEvent(eventId: string) {
    const event = await this.idEvent.findOne(eventId, { relations: ['parent', 'parent.repeat'] });
    return event?.parent;
  }
}
