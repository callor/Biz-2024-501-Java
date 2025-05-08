import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { EventBiz } from './event.biz';
import { FastifyRequest } from 'fastify';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import DateUtil from '@utils/date.util';
import { DeleteEventDTO } from './dto/delete-event.dto';
import { Role } from '@modules/auth/decorator/role.decorator';
import { ROLE_TYPE } from '@utils/constants';
type Param = {
  calendarId: string;
  eventId: string;
};

@Controller('diary/calendar/:calendarId/event')
export class EventAction {
  constructor(private readonly eventBiz: EventBiz) {}

  @Get()
  @Role(ROLE_TYPE.PUBLIC)
  async getEvents(@Param('calendarId') calendarId: string, @Query('yyyymm') yyyymm: number) {
    yyyymm = !yyyymm || isNaN(yyyymm) ? Number(DateUtil.format(new Date(), 'yyyyMM')) : yyyymm;
    return await this.eventBiz.getEvents({ calendarId, yyyymm });
  }

  @Post()
  async createEvent(@Request() req: FastifyRequest, @Body() eventDTO: CreateEventDTO) {
    eventDTO.userId = req.user.userId;
    await this.eventBiz.createEvent(eventDTO);
  }

  @Put()
  async updateEvent(@Request() req: FastifyRequest, @Body() eventDTO: UpdateEventDTO) {
    eventDTO.userId = req.user.userId;
    await this.eventBiz.updateEvent(eventDTO);
  }

  @Put('delete')
  async deleteEvent(@Request() req: FastifyRequest, @Body() eventDTO: DeleteEventDTO) {
    eventDTO.userId = req.user.userId;
    await this.eventBiz.deleteEvent(eventDTO);
  }

  @Get(':eventId')
  @Role(ROLE_TYPE.PUBLIC)
  async getEventData(@Param() { calendarId, eventId }: Param) {
    return await this.eventBiz.detailEvent({ calendarId, eventId });
  }
}
