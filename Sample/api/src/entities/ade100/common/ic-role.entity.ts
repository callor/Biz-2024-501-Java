import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IcMenuRole } from './ic-menu-role.entity';
import { IcUsrRole } from './ic-usr-role.entity';

@Entity()
export class IcRole {
  @PrimaryColumn()
  roleId: string;

  @Column()
  roleNm: string;

  @Column()
  roleLv: number;

  @Column({ enum: ['Y', 'N'] })
  useYn: 'Y' | 'N';

  @OneToMany(
    () => IcUsrRole,
    user => user.role,
  )
  users: IcUsrRole[];

  @OneToMany(
    () => IcMenuRole,
    menu => menu.role,
  )
  menus: IcMenuRole[];
}
