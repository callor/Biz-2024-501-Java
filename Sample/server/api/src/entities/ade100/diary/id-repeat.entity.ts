import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IdEvent } from './id-event.entity';

// 일정_반복
@Entity()
export class IdRepeat {
  // 일정키
  @PrimaryColumn()
  eventId: string;
  // 타입
  @Column({ enum: ['W', 'Y', 'D', 'M'] })
  type: 'W' | 'Y' | 'D' | 'M';
  // 반복주기
  @Column()
  num: number;
  // 반복_주단위
  @Column({ enum: ['1', '2', '3', '4', '5'] })
  byWeek?: '1' | '2' | '3' | '4' | '5';
  // 반복_요일
  @Column({ enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] })
  byDay?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  // 반복_마지막일
  @Column()
  finishDt: Date;

  @OneToOne(() => IdEvent, (event) => event.repeat)
  @JoinColumn({ name: 'EVENT_ID' })
  event: IdEvent;
}
