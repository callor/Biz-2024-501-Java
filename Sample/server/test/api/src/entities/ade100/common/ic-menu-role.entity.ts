import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { IcMenu } from './ic-menu.entity';
import { IcRole } from './ic-role.entity';

// 메뉴 권한
@Entity()
export class IcMenuRole {
  // 서비스키
  @PrimaryColumn()
  serviceId: string;
  // 메뉴키
  @PrimaryColumn()
  menuId: number;
  // 권한키
  @PrimaryColumn()
  roleId: string;

  @OneToOne(
    () => IcMenu,
    menu => menu.roles,
  )
  menu: IcMenu;

  @ManyToOne(
    () => IcRole,
    role => role.menus,
  )
  role: IcRole;
}
