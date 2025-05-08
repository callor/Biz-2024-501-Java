import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// 공지사항
@Entity()
export class IcNotice {
  // 공지사항타입
  @PrimaryColumn()
  type: string;
  // 공지사항키
  @PrimaryColumn()
  noticeId: string;
  // 제목
  @Column()
  title: string;
  // 컨텐츠
  @Column()
  contents: string | null;
  // 시작일
  @Column()
  startDt: string;
  // 종료일
  @Column()
  endDt: string | null;
  // 등록일
  @CreateDateColumn()
  retdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;
}
