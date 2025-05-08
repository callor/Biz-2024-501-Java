import { Role } from '@modules/auth/decorator/role.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { FastifyRequest } from 'fastify';
import { CalendarBiz } from './calendar.biz';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
import { InviteCalendarDTO } from './dto/invite-calendar.dto';
import { UpdateCalendarDTO } from './dto/update-calendar.dto';

@Controller('diary/calendar')
export class CalendarAction {
  constructor(private readonly calendarBiz: CalendarBiz) {}

  @Get('common')
  @Role(ROLE_TYPE.PUBLIC)
  async getCommonCalendar() {
    return await this.calendarBiz.getCommonCalendar();
  }

  @Get()
  async getCalendars(@Request() req: FastifyRequest) {
    return await this.calendarBiz.getCalendars({ userId: req.user.userId, useYn: 'Y' });
  }

  @Get('all')
  async getAllCalendars(@Request() req: FastifyRequest) {
    return await this.calendarBiz.getCalendars({ userId: req.user.userId });
  }

  @Post()
  async createCalendar(@Body() calendarDTO: CreateCalendarDTO, @Request() req: FastifyRequest) {
    calendarDTO.userId = req.user.userId;
    await this.calendarBiz.createCalendar(calendarDTO);
  }

  @Put()
  async updateCalendar(@Body() calendarDTO: UpdateCalendarDTO, @Request() req: FastifyRequest) {
    calendarDTO.userId = req.user.userId;
    await this.calendarBiz.updateUserCalendar(calendarDTO);
  }

  @Patch('lv')
  async updateCalendarUserLv(@Body() calendarDTO: UpdateCalendarDTO, @Request() req: FastifyRequest) {
    const calendar = await this.calendarBiz.getUserCalendar({
      calendarId: calendarDTO.calendarId,
      userId: req.user.userId,
    });
    if ([5, 9].includes(calendar.lv)) {
      await this.calendarBiz.updateCalendarUserLv(calendarDTO);
    }
  }

  @Post('invite')
  async inviteCalendar(@Body() calendarDTO: InviteCalendarDTO, @Request() req: FastifyRequest) {
    calendarDTO.userId = req.user.userId;
    await this.calendarBiz.inviteUser(calendarDTO);
  }

  @Put('invite')
  async updateInvite(@Body() calendarDTO: UpdateCalendarDTO, @Request() req: FastifyRequest) {
    if (!calendarDTO.inviteYn) {
      throw new BadRequestException();
    }
    calendarDTO.userId = req.user.userId;
    calendarDTO.inviteYn = calendarDTO.inviteYn === 'Y' ? undefined : 'N';
    await this.calendarBiz.updateInvite(calendarDTO);
  }

  @Delete(':calendarId/:benId')
  async deleteCalendarUser(
    @Request() req: FastifyRequest,
    @Param('calendarId') calendarId: string,
    @Param('benId') benId: string,
  ) {
    if (req.user.userId === benId) {
      await this.calendarBiz.deleteCalendar({ calendarId, userId: req.user.userId });
    } else {
      await this.calendarBiz.deleteCalendarUser({ userId: req.user.userId, benId, calendarId });
    }
  }

  @Get(':calendarId/users')
  async getCalendarUsers(@Request() req: FastifyRequest, @Param('calendarId') calendarId: string) {
    return await this.calendarBiz.getCalendarUsers({ userId: req.user.userId, calendarId });
  }

  @Get(':calendarId/allUsers')
  async getCalendarAllUsers(@Request() req: FastifyRequest, @Param('calendarId') calendarId: string) {
    return await this.calendarBiz.getCalendarAllUsers({ userId: req.user.userId, calendarId });
  }

  @Get(':calendarId')
  async getCalendar(@Request() req: FastifyRequest, @Param('calendarId') calendarId: string) {
    return await this.calendarBiz.getUserCalendar({ calendarId, userId: req.user.userId });
  }

  @Get('events')
  @Role(ROLE_TYPE.PUBLIC)
  async getCalendarsEvent(@Request() req: FastifyRequest, @Query('yyyymm') yyyymm: number) {
    yyyymm = !yyyymm || isNaN(yyyymm) ? Number(DateUtil.format(new Date(), 'yyyyMM')) : yyyymm;
    const userId = req.user?.userId;
    return await this.calendarBiz.getUserCalendarEvents({ userId, yyyymm });
  }

  @Get('search')
  async searchEvent(@Request() req: FastifyRequest, @Query() searchDTO: CalendarSearch) {
    const userId = req.user.userId;
    searchDTO.userId = userId;

    const diff = DateUtil.diffDay(new Date(searchDTO.end), new Date(searchDTO.start));
    if (diff < 0 || diff > 365 || !searchDTO.search) {
      throw new BadRequestException('조회할 수 없는 일정입니다.');
    }

    return await this.calendarBiz.getSearchList(searchDTO);
  }
}
