import config from '@config';
import { format } from 'date-fns';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SdkMmsSend {
  @PrimaryColumn()
  msgId: number;
  @Column()
  private userId: string;
  @Column()
  scheduleType?: number;
  @Column()
  subject?: string;
  @Column()
  mmsMsg: string;
  @Column()
  nowDate?: string;
  @Column()
  sendDate?: string;
  @Column()
  callback?: string;
  @Column()
  destType?: string;
  @Column()
  destCount?: number;
  @Column()
  destInfo: string;
  @Column()
  ktOfficeCode?: string;
  @Column()
  cdrId?: string;
  @Column()
  reserved1?: string;
  @Column()
  reserved2?: string;
  @Column()
  reserved3?: string;
  @Column()
  reserved4?: string;
  @Column()
  reserved5?: string;
  @Column()
  reserved6?: string;
  @Column()
  reserved7?: string;
  @Column()
  reserved8?: string;
  @Column()
  reserved9?: string;
  @Column()
  sendStatus?: number;
  @Column()
  sendCount?: number;
  @Column()
  sendResult?: number;
  @Column()
  sendProcTime?: string;
  @Column()
  stdId?: string;

  @BeforeInsert()
  setDefault() {
    this.nowDate = format(new Date(), 'yyyyMMddHHmmss');
    this.sendDate = this.sendDate ?? format(new Date(), 'yyyyMMddHHmmss');
    this.destCount = 1;
    this.userId = config.sms.userid;
    this.callback = config.sms.tel.its;
  }
  @BeforeInsert()
  setDestInfo() {
    this.destInfo = `0^${this.destInfo.replace(/[^\d]/g, '')}`;
  }
}
