import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KmsComservice {
  @PrimaryColumn()
  agencyid: string;
  @PrimaryColumn()
  coid: number;
  @PrimaryColumn()
  serviceid: string;
  @Column()
  status: number;
  @Column()
  svcstdt: Date;
  @Column()
  svceddt: Date;
  @Column()
  regdt: Date;
  @Column()
  deldt: Date;
  @Column()
  uptdt: Date;
  @Column()
  admitid: string;
  @Column()
  admituser: number;
  @Column()
  admitdt: Date;
  @Column()
  servicetype: number;
  @Column()
  limitusercnt: number;
  @Column()
  demoyn: number;
  @Column()
  memo: string;
  @Column()
  chargeType: number;
  @Column()
  chargeAdmitid: string;
  @Column()
  chargeDate: Date;
  @Column()
  workAuthYn: number;
  @Column()
  dependNomuRoleYn: string;
}
