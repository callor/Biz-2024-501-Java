import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CreateReplyDTO } from './dto/create-reply.dto';
import { ReplyBiz } from './reply.biz';

type Param = {
  calendarId: string;
  eventId: string;
  replyId: string;
};

@Controller('diary/calendar/:calendarId/event/:eventId/reply')
export class ReplyAction {
  constructor(private readonly replyBiz: ReplyBiz) {}

  @Get()
  async replys(@Param() param: { calendarId: string; eventId: string }) {
    return await this.replyBiz.list(param);
  }
  @Post()
  async createReply(@Request() req: FastifyRequest, @Body() param: CreateReplyDTO) {
    param.userId = req.user.userId;
    const eventId = await this.replyBiz.create(param);
    return eventId;
  }

  @Delete(':replyId')
  async deleteReply(@Request() req: FastifyRequest, @Param() param: Param) {
    const userId = req.user.userId;
    await this.replyBiz.delete({ ...param, userId });
  }
}
