import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

// 사용자_알림
@Entity()
export class IcAlrm {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 알림_키
  @PrimaryColumn()
  alrmId: string;
  // 데이터 키
  @Column()
  dataId?: string;
  // 알림_타입
  @Column()
  type: string;
  // 알림_제목
  @Column()
  title?: string;
  // 알림_내용
  @Column()
  note: string;
  // 알림_일자
  @CreateDateColumn()
  sendDt: Date;
  // 알림_읽은일
  @Column()
  readDt?: Date;
}
