import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TcCompany {
  @PrimaryColumn()
  coid: number;
  @Column()
  conm: string;
}
