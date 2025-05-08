import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TbNotice {
  @PrimaryColumn()
  bidId: number;
  @Column()
  coid: number;
  @Column()
  bidNo: string;
  @Column()
  name: string;
  @Column()
  method: string;
  @Column()
  type: string;
  @Column()
  bidStdt: Date;
  @Column()
  bidEddt: Date;
  @Column()
  openDt: Date;
  @Column()
  content: string;
  @Column()
  status: string;
  @Column()
  chgYn: string;
  @Column()
  retdt: Date;
  @Column()
  uersid: number;
  @Column()
  discardSignYn: string;
}
