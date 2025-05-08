import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IcUsr } from '../common/ic-usr.entity';
import { IdCalendar } from './id-calendar.entity';

// 캘린더 사용자
@Entity()
export class IdCalendarUsr {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 캘린더키
  @PrimaryColumn()
  calendarId: string;
  // 캘린더명
  @Column()
  name: string;
  // 배경
  @Column()
  bgColor: string;
  // 색상
  @Column()
  color: string;
  // 레벨
  @Column()
  lv: number;
  // 초대응답여부
  @Column({ enum: ['Y', 'N'] })
  inviteYn: YN;
  // 사용여부
  @Column({ enum: ['Y', 'N'] })
  useYn: YN;
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  @ManyToOne(() => IcUsr, (user) => user.calendars)
  user: IcUsr;

  @ManyToOne(() => IdCalendar, (calendar) => calendar.users)
  calendar: IdCalendar;
}
