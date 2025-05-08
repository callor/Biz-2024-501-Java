import {
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IdCalendarUsr } from '../diary/id-calendar-usr.entity';
import { IcContact } from './ic-contact.entity';
import { IcKpConnect } from './ic-kp-connect.entity';
import { IcMember } from './ic-member.entity';
import { IcUsrRole } from './ic-usr-role.entity';

// 사용자
@Entity()
export class IcUsr {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 로그인아이디
  @Column()
  loginId: string;
  // 비밀번호
  @Column()
  password: string;
  // 상태
  @Column()
  status: string;
  // 등록일
  @CreateDateColumn()
  regdt?: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt?: Date;

  @OneToOne(
    () => IcMember,
    member => member.user,
  )
  @JoinColumn({ name: 'USER_ID' })
  member: IcMember;

  @OneToMany(
    () => IcUsrRole,
    userRole => userRole.user,
  )
  roles: IcUsrRole[];

  @OneToMany(
    () => IcKpConnect,
    connect => connect.user,
  )
  connects: IcKpConnect[];

  @OneToMany(
    () => IcContact,
    contact => contact.user,
  )
  contacts: IcContact[];

  @OneToMany(
    () => IdCalendarUsr,
    calendar => calendar.user,
  )
  calendars: IdCalendarUsr[];
}
