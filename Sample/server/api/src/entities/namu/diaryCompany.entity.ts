import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'diaryCompany' })
export class DiaryCompany {
  @PrimaryColumn()
  coid: string;
  @PrimaryColumn()
  dyear: number;
  @PrimaryColumn()
  ukey: string;

  @Column()
  conm: string;
  @Column()
  bizrgno: string;
  @Column()
  sndzipcode: string;
  @Column()
  sndaddr: string;
  @Column()
  tel: string;
  @Column()
  fax: string;
  @Column()
  loginnm: string;
  @Column()
  whois: string;
  @Column()
  requestyn: string;
  @Column()
  lastTel: string;
  @Column()
  lastZip: string;
  @Column()
  lastAddr: string;
  @Column()
  lastFax: string;
  @Column()
  lastMngName: string;
  @Column()
  regdt: number;
}
