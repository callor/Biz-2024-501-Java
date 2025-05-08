import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// 일정_팁
@Entity()
export class IdTip {
  // 팁키
  @PrimaryColumn()
  tipId: string;
  // 팁_년월
  @Column()
  month: number;
  // 팁내용
  @Column()
  note: string;
  // 등록일
  @CreateDateColumn()
  retdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;
}
