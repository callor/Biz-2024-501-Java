import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Request } from '@nestjs/common';
import { CalendarBiz } from './calendar.biz';
import { FastifyRequest } from 'fastify';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
import { InviteCalendarDTO } from './dto/invite-calendar.dto';
import { UpdateCalendarDTO } from './dto/update-calendar.dto';
import { PatchCalendarUserDTO } from './dto/patch-calendar-user.dto';
import { Role } from '@modules/auth/decorator/role.decorator';
import { ROLE_TYPE } from '@utils/constants';

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

  @Delete(':calendarId')
  async deleteCalendar(@Request() req: FastifyRequest, @Param('calendarId') calendarId: string) {
    await this.calendarBiz.deleteCalendar({ userId: req.user.userId, calendarId });
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

  @Patch(':calendarId')
  async patchUserAdmin(
    @Request() req: FastifyRequest,
    @Param('calendarId') calendarId: string,
    @Body() patchCalendarUserDTO: PatchCalendarUserDTO,
  ) {
    patchCalendarUserDTO.userId = req.user.userId;
    patchCalendarUserDTO.calendarId = calendarId;
    await this.calendarBiz.updateCalendarUserAdminYn(patchCalendarUserDTO);
  }

  @Delete(':calendarId/:benId')
  async deleteCalendarUser(
    @Request() req: FastifyRequest,
    @Param('calendarId') calendarId: string,
    @Param('benId') benId: string,
  ) {
    await this.calendarBiz.deleteCalendarUser({ userId: req.user.userId, benId, calendarId });
  }

  @Get(':calendarId/users')
  async getCalendarUsers(@Request() req: FastifyRequest, @Param('calendarId') calendarId: string) {
    return await this.calendarBiz.getCalendarUsers({ userId: req.user.userId, calendarId });
  }

  @Get(':calendarId')
  async getCalendar(@Request() req: FastifyRequest, @Param('calendarId') calendarId: string) {
    return await this.calendarBiz.getUserCalendar({ calendarId, userId: req.user.userId });
  }
}
