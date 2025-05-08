import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEventReply } from '@entities/ade100/diary/id-event-reply.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { AlrmBiz } from '@modules/alrm/alrm.biz';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtil } from '@utils/security.util';
import { Repository } from 'typeorm';
import { CreateReplyDTO } from './dto/create-reply.dto';
import { DeleteReplyDTO } from './dto/delete-reply.dto';

@Injectable()
export class ReplyBiz {
  constructor(
    @InjectRepository(IdCalendarUsr)
    private readonly idCalendarUsr: Repository<IdCalendarUsr>,
    @InjectRepository(IdEventReply)
    private readonly idEventReply: Repository<IdEventReply>,
  ) {}

  async createReply(replyDTO: CreateReplyDTO) {
    const replyId = SecurityUtil.getShortUUID();
    await this.idEventReply.insert({ ...replyDTO, replyId });
  }

  async updateReply() {}

  async deleteReply({ calendarId, userId, eventId, replyId }: DeleteReplyDTO) {
    const calendar = (await this.idCalendarUsr.find({ calendarId, userId }))[0];
    const existReply = await this.idEventReply.count({ where: { eventId, replyId, userId } });
    // 관리자이거나 댓글 본인일 경우
    if ([5, 9].includes(calendar?.lv) && existReply) {
      await this.idEventReply.delete({ eventId, replyId });
    }
  }
}
