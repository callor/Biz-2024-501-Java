import { Column, Entity, PrimaryColumn } from 'typeorm';

// 로그인이력
@Entity()
export class IcLoginLog {
  // 서비스키
  @PrimaryColumn()
  serviceId: string;
  // 유저키
  @PrimaryColumn()
  userId: string;
  // 고유식별
  @PrimaryColumn()
  uuid: string;
  // 로그인날짜
  @Column()
  logdt: Date;
  // 디바이스명
  @Column()
  device: string;
  // 로그인IP
  @Column()
  ip: string;
}
