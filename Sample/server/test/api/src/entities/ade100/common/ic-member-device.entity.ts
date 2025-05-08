import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IcMember } from './ic-member.entity';

// 사용자_디바이스
@Entity()
export class IcMemberDevice {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 알림키
  @PrimaryColumn()
  notifyId: string;
  // 알림여부
  @Column({ enum: ['Y', 'N'] })
  notifyYn: 'Y' | 'N';
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  @ManyToOne(() => IcMember, (member) => member.devices)
  member: IcMember;
}
