import { IdCalendarEvent } from '@entities/ade100/diary/id-calendar-event.entity';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventReply } from '@entities/ade100/diary/id-event-reply.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';
import { Connection, Repository } from 'typeorm';
import { CreateReplyDTO } from './dto/create-reply.dto';
import { DeleteReplyDTO } from './dto/delete-reply.dto';

@Injectable()
export class ReplyBiz {
  constructor(
    @InjectRepository(IdCalendarUsr)
    private readonly idCalendarUsr: Repository<IdCalendarUsr>,
    @InjectRepository(IdEventReply)
    private readonly idEventReply: Repository<IdEventReply>,
    @InjectRepository(IdCalendarEvent)
    private readonly idCalendarEvent: Repository<IdCalendarEvent>,
    private readonly connection: Connection,
  ) {}

  async list({ eventId }: { calendarId: string; eventId: string }) {
    return await this.idEventReply.find({ where: { eventId }, relations: ['member'], order: { retdt: 'ASC' } });
  }

  async create(replyDTO: CreateReplyDTO) {
    const { calendarId, event } = (
      await this.idCalendarEvent.find({
        where: { calendarId: replyDTO.calendarId, eventId: replyDTO.eventId },
        relations: ['event', 'event.repeat'],
      })
    )[0];

    await this.connection.transaction(async (manager) => {
      // 날짜가 다르면 반복일정이라 판단
      if (event.repeat) {
        const newEventId = SecurityUtil.getShortUUID();
        const startDt = replyDTO.eventDt;
        const endDt = DateUtil.addDay(replyDTO.eventDt, DateUtil.diffDay(event.endDt, event.startDt));
        // 이 일정만 수정될 경우 새로 추가 해준다.
        await manager.insert(IdEvent, {
          eventId: newEventId,
          parentId: event.eventId,
          name: event.name,
          note: event.note,
          userId: event.userId,
          allDayYn: event.allDayYn,
          replyYn: event.replyYn,
          startDt,
          endDt,
        });
        await manager.insert(IdCalendarEvent, { calendarId, eventId: newEventId });

        replyDTO.eventId = newEventId;
      }
      const replyId = SecurityUtil.getShortUUID();
      await manager.insert(IdEventReply, { ...replyDTO, replyId });
    });
    return replyDTO.eventId;
  }

  async delete({ calendarId, userId, eventId, replyId }: DeleteReplyDTO) {
    const calendar = (await this.idCalendarUsr.find({ calendarId, userId }))[0];
    const existReply = await this.idEventReply.count({ where: { eventId, replyId, userId } });

    // 관리자이거나 댓글 본인일 경우
    if ([5, 9].includes(calendar?.lv) || existReply) {
      await this.idEventReply.delete({ eventId, replyId });
    } else {
      throw new ForbiddenException();
    }
  }
}
