import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IcContactInfo } from './ic-contact-info.entity';
import { IcUsr } from './ic-usr.entity';

// 연락처
@Entity({ orderBy: { name: 'ASC' } })
export class IcContact {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 연락처ID
  @PrimaryColumn()
  telId: string;
  // 연락처명
  @Column()
  name: string;
  // 메모
  @Column()
  memo: string | null;
  // 즐겨찾기
  @Column({ enum: ['Y', 'N'] })
  favorYn: 'Y' | 'N';
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  @ManyToOne(() => IcUsr, (user) => user.contacts)
  user: IcUsr;

  @OneToMany(() => IcContactInfo, (info) => info.contact)
  infos: IcContactInfo[];
}
