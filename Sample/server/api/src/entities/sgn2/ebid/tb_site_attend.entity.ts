import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TbSiteAttend {
  @PrimaryColumn()
  attendId: number;
  @Column()
  bidId: number;
  @Column()
  addr: string;
  @Column()
  zipCode: string;
  @Column()
  addrDetail: string;
  @Column()
  inspectionDt: Date;
}
