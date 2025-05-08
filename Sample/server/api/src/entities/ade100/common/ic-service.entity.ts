import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IcFile } from './ic-file.entity';
import { IcMenu } from './ic-menu.entity';
import { IcUsrRole } from './ic-usr-role.entity';

// 서비스
@Entity()
export class IcService {
  // 서비스키
  @PrimaryColumn()
  serviceId: string;
  // 서비스명
  @Column()
  name: string;
  // 서비스상태
  @Column()
  status: number;
  // 정렬순서
  @Column()
  sortIdx: number;

  @OneToMany(
    () => IcMenu,
    menu => menu.service,
  )
  menus: IcMenu[];

  @OneToMany(
    () => IcFile,
    file => file.service,
  )
  files: IcFile[];

  @OneToMany(
    () => IcUsrRole,
    userRole => userRole.service,
  )
  users: IcUsrRole[];
}
