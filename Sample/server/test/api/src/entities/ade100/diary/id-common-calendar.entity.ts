import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IdCalendar } from './id-calendar.entity';

// 공용_캘린더
@Entity()
export class IdCommonCalendar {
  // 공용_캘린더키
  @PrimaryColumn()
  calendarId: string;
  // 사용여부
  @Column()
  useYn: YN;

  @OneToOne(() => IdCalendar, (calendar) => calendar.commonCalendar)
  @JoinColumn({ name: 'CALENDAR_ID' })
  calendar: IdCalendar;
}
