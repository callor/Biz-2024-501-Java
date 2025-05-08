import { Controller, Delete, Param, Post, Request } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ReplyBiz } from './reply.biz';
type Param = {
  calendarId: string;
  eventId: string;
  replyId: string;
};

@Controller('diary/calendar/:calendarId/event/:eventId/reply')
export class ReplyAction {
  constructor(private readonly replyBiz: ReplyBiz) {}
  @Post()
  async createReply() {}

  @Delete(':replyId')
  async deleteReply(@Request() req: FastifyRequest, @Param() param: Param) {
    const userId = req.user.userId;
    await this.replyBiz.deleteReply({ ...param, userId });
  }
}
