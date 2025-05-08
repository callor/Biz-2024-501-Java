import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// 사용자 인증
@Entity()
export class IcAuthenticate {
  // 인증키
  @PrimaryColumn()
  authId: string;
  @PrimaryColumn()
  userId: string;
  @Column()
  token?: string;
  // 비밀번호
  @Column()
  passwd: string;
  // 사용자이름
  @Column()
  name?: string;
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 등록일
  @UpdateDateColumn()
  uptdt: Date;
  // 만료일
  @Column()
  expiredDt: Date;
}
