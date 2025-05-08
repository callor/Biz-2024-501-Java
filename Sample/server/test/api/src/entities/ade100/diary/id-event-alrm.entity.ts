import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IdEvent } from './id-event.entity';

// 일정_알람
@Entity()
export class IdEventAlrm {
  // 일정키
  @PrimaryColumn()
  eventId: string;
  // 알림순번
  @Column()
  sno: number;
  // 알림타입
  @Column({ enum: ['M', 'H', 'D', 'W'] })
  type: 'M' | 'H' | 'D' | 'W';
  // 알람지정
  @Column()
  num: number;

  @ManyToOne(() => IdEvent, (event) => event.alrms)
  event: IdEvent;
}
