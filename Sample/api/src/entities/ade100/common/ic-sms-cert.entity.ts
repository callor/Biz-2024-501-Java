import { Column, Entity, PrimaryColumn } from 'typeorm';

// 문자인증
@Entity()
export class IcSmsCert {
  // 전화번호
  @PrimaryColumn()
  mobile: string;
  // 순서
  @PrimaryColumn()
  sno: number;
  // 인증번호
  @Column()
  certMsg: string;
  // 보낸날짜
  @Column()
  sendDt: Date;
}
