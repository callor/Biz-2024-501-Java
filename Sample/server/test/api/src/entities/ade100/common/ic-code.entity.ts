import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// 공통코드
@Entity()
export class IcCode {
  // 그룹키
  @PrimaryColumn()
  groupId: string;
  // 코드키
  @Column()
  codeId: string;
  // 코드명
  @Column()
  name: string;
  // 상태
  @Column()
  status: number;
  // 정렬순서
  @Column()
  sortIdx: number;
  // 등록일
  @CreateDateColumn()
  retdt: string;
  // 수정일
  @UpdateDateColumn()
  uptdt: string;
  // 메모
  @Column()
  note: string | null;
}
