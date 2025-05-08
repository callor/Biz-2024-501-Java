import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdEvent } from '@entities/ade100/diary/id-event.entity';
import { AlrmBiz } from '@modules/alrm/alrm.biz';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ALRM_TYPE } from '@utils/constants';
import { In, Repository } from 'typeorm';

@Injectable()
export class EventTaskBiz {
  constructor(
    @InjectRepository(IdCalendarUsr) private idCalendarUsr: Repository<IdCalendarUsr>,
    private alrmBiz: AlrmBiz,
  ) {}

  async sendEvent(event: IdEvent) {
    const calendarIds = event.calendars.map(({ calendarId }) => calendarId);
    const calendars = await this.idCalendarUsr.find({ where: { calendarId: In(calendarIds) } });
    const userIds = calendars.map(({ userId }) => userId);
    await this.alrmBiz.sendAlrm({ users: userIds, type: ALRM_TYPE.EVENT_ALRM, title: event.name, note: event.note });
  }
}
