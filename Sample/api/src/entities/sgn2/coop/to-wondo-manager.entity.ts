import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ToWondoManager {
  @PrimaryColumn()
  coid: number;
  @Column()
  name1: string;
  @Column()
  position1: string;
  @Column()
  tel1: string;
  @Column()
  fax1: string;
  @Column()
  email1: string;
  @Column()
  name2: string;
  @Column()
  position2: string;
  @Column()
  tel2: string;
  @Column()
  fax2: string;
  @Column()
  email2: string;
  @Column()
  hp1: string;
  @Column()
  hp2: string;
  @Column()
  retdt: Date;
  @Column()
  moddt: Date;
}
