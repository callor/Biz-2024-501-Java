import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ToPtptKkoHsty {
  @Column()
  hstyId: number;
  @Column()
  scdId: number;
  @Column()
  wondoCoid: number;
  @Column()
  coopCoid: number;
  @Column()
  sno: number;
  @Column()
  retdt: Date;
  @Column()
  resultCode: string;
  @Column()
  receivedAt: Date;
  @Column()
  message: string;
  @Column()
  recipient: string;
  @Column()
  tmpltCode: string;
  @Column()
  smsType: string;
  @PrimaryColumn()
  msgIdx: string;
}
