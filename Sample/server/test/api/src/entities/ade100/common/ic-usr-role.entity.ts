import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IcRole } from './ic-role.entity';
import { IcService } from './ic-service.entity';
import { IcUsr } from './ic-usr.entity';

// 사용자 권한
@Entity()
export class IcUsrRole {
  // 서비스키
  @PrimaryColumn()
  serviceId: string;
  // 권한키
  @PrimaryColumn()
  roleId: string;

  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 권한 시작일
  @Column()
  startDt: Date;
  // 권한 종료일
  @Column()
  endDt: Date | null;
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  @ManyToOne(
    () => IcService,
    service => service.users,
  )
  service: IcService;

  @ManyToOne(
    () => IcUsr,
    user => user.roles,
  )
  user: IcUsr;

  @ManyToOne(
    () => IcRole,
    role => role.users,
  )
  role: IcRole;
}
