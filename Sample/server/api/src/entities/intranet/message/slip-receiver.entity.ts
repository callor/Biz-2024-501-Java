import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SlipReceiver {
  @PrimaryColumn()
  readonly idx: string;
  @Column()
  readonly site: string;
  @Column()
  readonly smidx: number;
  @Column()
  readonly rmidx: number;
  @Column()
  readonly title: string;
  @Column()
  readonly memo: string;
  @Column()
  readonly offeridx: number;
  @Column()
  readonly readok: number;
  @Column({ type: 'timestamp' })
  readonly readtime: Date;
  @Column()
  readonly noticeok: number;
  @Column({ type: 'timestamp' })
  readonly noticetime: Date;
  @Column()
  readonly status: number;
  @Column({ type: 'timestamp' })
  readonly datetime: Date;
  @Column({ nullable: true })
  readonly sHidden: number;
  @Column({ nullable: true })
  readonly grpIdx: number;
  @Column({ nullable: true })
  readonly rHidden: number;
}
