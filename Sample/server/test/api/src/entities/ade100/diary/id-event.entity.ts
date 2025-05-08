import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IcMember } from '../common/ic-member.entity';
import { IdCalendarEvent } from './id-calendar-event.entity';
import { IdEventAlrm } from './id-event-alrm.entity';
import { IdEventReply } from './id-event-reply.entity';
import { IdRepeat } from './id-repeat.entity';

// 일정
@Entity()
export class IdEvent {
  // 일정키
  @PrimaryColumn()
  eventId: string;
  // 부모일정키
  @Column()
  parentId: string;
  // 일정타입
  @Column({ enum: 'E', default: 'E' })
  type?: 'E';
  // 일정명
  @Column()
  name: string;
  // 상세내용
  @Column()
  note?: string;
  // 종일여부
  @Column({ enum: ['Y', 'N'] })
  allDayYn: 'Y' | 'N';
  // 시작일
  @Column()
  startDt: Date;
  // 종료일
  @Column()
  endDt: Date;
  // 등록자
  @Column()
  userId: string;
  // 숨김여부
  @Column({ enum: ['Y', 'N'] })
  hiddenYn: 'Y' | 'N';
  // 댓글여부
  @Column({ enum: ['Y', 'N'] })
  replyYn: 'Y' | 'N';
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  // 사용자
  @ManyToOne(() => IcMember, (member) => member.events)
  member: IcMember;

  // 캘린더
  @OneToMany(() => IdCalendarEvent, (calendar) => calendar.event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'EVENT_ID' })
  calendars: IdCalendarEvent[];

  // 알림
  @OneToMany(() => IdEventAlrm, (alrm) => alrm.event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'EVENT_ID' })
  alrms: IdEventAlrm[];

  // 반복
  @OneToOne(() => IdRepeat, (repeat) => repeat.event, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'EVENT_ID' })
  repeat: IdRepeat;

  @OneToMany(() => IdEvent, (event) => event.modifyEvent)
  @JoinColumn({ name: 'EVENT_ID' })
  modifys: IdEvent[];

  @ManyToOne(() => IdEvent, (event) => event.modifys)
  @JoinColumn({ name: 'PARENT_ID' })
  modifyEvent: IdEvent;

  @OneToMany(() => IdEventReply, (replys) => replys.event, { onDelete: 'CASCADE' })
  replys: IdEventReply[];
}
