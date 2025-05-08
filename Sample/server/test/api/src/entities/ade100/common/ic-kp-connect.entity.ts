import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IcUsr } from './ic-usr.entity';

// 김반장_연동
@Entity()
export class IcKpConnect {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 회사ID
  @PrimaryColumn()
  coid: number;
  // KP유저키
  @PrimaryColumn()
  ukey: number;
  // 등록일
  @CreateDateColumn()
  regdt: string;

  @ManyToOne(
    () => IcUsr,
    user => user.connects,
  )
  user: IcUsr;
}
