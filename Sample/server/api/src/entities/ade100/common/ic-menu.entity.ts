import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { IcMenuRole } from './ic-menu-role.entity';
import { IcService } from './ic-service.entity';

// 메뉴
@Entity()
export class IcMenu {
  // 서비스키
  @PrimaryColumn()
  serviceId: string;
  // 메뉴키
  @PrimaryColumn()
  menuId: number;
  // 상위 키
  @Column()
  topId: number | null;
  // 메뉴이름
  @Column()
  name: string;
  // 메뉴상태
  @Column()
  status: number;
  // URL
  @Column()
  url: string;
  // 정렬순서
  @Column()
  sortIdx: number;
  // 등록일
  @CreateDateColumn()
  retdt: string;
  // 아이콘키
  @Column()
  icon: string | null;

  @ManyToOne(
    () => IcService,
    service => service.menus,
  )
  service: IcService[];

  @OneToOne(
    () => IcMenuRole,
    role => role.menu,
  )
  roles: IcMenuRole;
}
