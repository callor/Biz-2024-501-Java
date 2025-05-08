import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IdCalendarEvent } from './id-calendar-event.entity';
import { IdCalendarUsr } from './id-calendar-usr.entity';
import { IdCommonCalendar } from './id-common-calendar.entity';

// 캘린더
@Entity()
export class IdCalendar {
  // 캘린더키
  @PrimaryColumn()
  calendarId: string;
  // 기본_캘린더명
  @Column()
  name: string;
  // 배경_색상
  @Column()
  bgColor: string;
  // 기본_색상
  @Column()
  color: string;
  // 등록일
  @CreateDateColumn()
  regdt: string;
  // 수정일
  @UpdateDateColumn()
  uptdt: string;

  @OneToMany(() => IdCalendarUsr, (user) => user.calendar)
  users: IdCalendarUsr[];

  @OneToMany(() => IdCalendarEvent, (event) => event.calendar)
  events: IdCalendarEvent[];

  @OneToOne(() => IdCommonCalendar, (calendar) => calendar.calendar)
  @JoinColumn({ name: 'CALENDAR_ID' })
  commonCalendar: IdCommonCalendar;
}
