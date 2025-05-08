import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IdCalendar } from './id-calendar.entity';
import { IdEvent } from './id-event.entity';

// 캘린더_일정
@Entity()
export class IdCalendarEvent {
  // 캘린더키
  @PrimaryColumn()
  calendarId: string;
  // 일정키
  @PrimaryColumn()
  eventId: string;

  @ManyToOne(() => IdCalendar, (calendar) => calendar.events)
  calendar: IdCalendar;

  @ManyToOne(() => IdEvent, (event) => event.calendars)
  event: IdEvent;
}
