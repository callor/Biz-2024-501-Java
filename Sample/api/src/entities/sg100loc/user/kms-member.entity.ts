import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KmsMember {
  @PrimaryColumn()
  ukey: number;
  @Column()
  korname: string;
  @Column()
  engname: string;
  @Column()
  zipcode: string;
  @Column()
  addr: string;
  @Column()
  phone: string;
  @Column()
  mobile: string;
  @Column()
  email: string;
  @Column()
  frgnyn: number;
  @Column()
  duty: string;
  @Column()
  dept: string;
  @Column()
  regdt: Date;
  @Column()
  uptdt: Date;
  @Column()
  site: string;
  @Column()
  birth: string;
  @Column()
  sex: string;
  @Column()
  resino: string;
  @Column()
  deviceId: string;
}
