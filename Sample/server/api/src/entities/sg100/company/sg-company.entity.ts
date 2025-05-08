import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SgCompany {
  @PrimaryColumn()
  coid: number;
  @Column()
  conm: string;
  @Column()
  bcoyn: string;
  @Column()
  bizrgno: string;
  @Column()
  bcorgno: string;
  @Column()
  uptae: string;
  @Column()
  jongmok: string;
  @Column()
  zipcode: string;
  @Column()
  addr: string;
  @Column()
  sndzipcode: string;
  @Column()
  sndaddr: string;
  @Column()
  tel: string;
  @Column()
  fax: string;
  @Column()
  email: string;
  @Column()
  pripdt: string;
  @Column()
  grpid: number;
  @Column()
  comemo: string;
  @Column()
  oldCoid: number;
  @Column()
  dispconm: string;
  @Column()
  inputdt: Date;
  @Column()
  kisconId: string;
  @Column()
  cmpdatadt: Date;
  @Column()
  cmpdataid: Date;
  @Column()
  hphone: string;
  @Column()
  laborSndyn: string;
  @Column()
  retiredPay: string;
  @Column()
  gjInout: string;
  @Column()
  agencyid: string;
  @Column()
  bankaccno: string;
  @Column()
  protokoll: string;
  @Column()
  accounting: string;
  @Column()
  certnm: string;
  @Column()
  notbeforedt: Date;
  @Column()
  notafterdt: Date;
  @Column()
  retiredDt: string;
  @Column()
  retiredManagement: string;
  @Column()
  subState: string;
  @Column()
  chgempid: string;
  @Column()
  tel2: string;
  @Column()
  kisconPasswd: string;
  @Column()
  certpasswd: string;
  @Column()
  koritem: string;
  @Column()
  paymentremote: string;
  @Column()
  kmggexpSetKplus: string;
  @Column()
  closedt: string;
  @Column()
  closedtscrapdt: Date;
}
