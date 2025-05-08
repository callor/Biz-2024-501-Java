import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { IdEventAlrm } from './id-event-alrm.entity';
import { IdEvent } from './id-event.entity';

// 일정_알람_전송
@Entity()
export class IdEventAlrmPush {
  // 일정키
  @PrimaryColumn()
  eventId: string;
  // 알림순번
  @PrimaryColumn()
  sno: number;
  // 알림전송날짜
  @Column()
  pushDt: Date;
  // 데몬실행여부
  @Column()
  syncYn: YN;

  @ManyToOne(() => IdEvent, (event) => event.pushes)
  @JoinColumn({ name: 'EVENT_ID' })
  event: IdEvent;

  @OneToOne(() => IdEventAlrm, (alrm) => alrm.push)
  @JoinColumn([{ name: 'EVENT_ID' }, { name: 'SNO' }])
  alrm: IdEventAlrm;
}
