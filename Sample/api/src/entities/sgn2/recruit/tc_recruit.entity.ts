import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TcRecruit {

  @PrimaryColumn()
  recruitId: number;
  @Column()
  coid: number;
  @Column()
  userId: number;
  @Column()
  recruitName: string;
  @Column()
  regDt: Date;
  @Column()
  recruitStdt: Date;
  @Column()
  recruitEddt: Date;
  @Column()
  coopStdt?: Date;
  @Column()
  coopEddt?: Date;
  @Column()
  status: string;
  @Column()
  qual?: string;
  @Column()
  appMethod?: string;
  @Column()
  memo?: string;
}
