import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KpwMonPay {
  @PrimaryColumn()
  payno: number;
  @Column()
  yyyymm: string;
  @Column()
  reportid: number;
  @Column()
  commuteEmpId: number;
  @Column()
  empid: number;
  @Column()
  korname: string;
  @Column()
  resino: string;
  @Column()
  teamName: string;
  @Column()
  bankid: string;
  @Column()
  acctno: string;
  @Column()
  ddpay: number;
  @Column()
  totWkddcnt: number;
  @Column()
  totpay: number;
  @Column()
  subpay: number;
  @Column()
  receiptpay: number;
  @Column()
  baTotpay: number;
  @Column()
  gyInsu: number;
  @Column()
  kabguntax: number;
  @Column()
  jumintax: number;
  @Column()
  ggInsu: number;
  @Column()
  ggOrgInsu: number;
  @Column()
  ggOldInsu: number;
  @Column()
  kmInsu: number;
  @Column()
  etcpay: number;
  @Column()
  totwage: number;
  @Column()
  totbenefitpay: number;
  @Column()
  taxbenefitpay: number;
  @Column()
  ntaxbenefitpay: number;
  @Column()
  jigupymd: string;
  @Column()
  workTime: number;
  @Column()
  kakaoSendYn: number;
  @Column()
  mmsSendYn: number;
  @Column()
  failSendYn: number;
  @Column()
  sendType: string;
  @Column()
  resultCode: string;
  @Column()
  sendingYn: number;
  @Column()
  mobile: string;
  @Column()
  sendStatus: number;
}
