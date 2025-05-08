import { Column, Entity, ManyToOne, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { IcMember } from './ic-member.entity';

// 광고동의여부
@Entity()
export class IcMemberAdAgree {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 순번
  @PrimaryColumn()
  sno: number;
  // 동의여부
  @Column()
  agreeYn: 'Y' | 'N';
  // 등록일
  @CreateDateColumn()
  regdt?: Date;

  @ManyToOne(
    () => IcMember,
    member => member.agrees,
  )
  member: IcMember;
}
