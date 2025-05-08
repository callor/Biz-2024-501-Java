import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KpwLaborCont {
  @PrimaryColumn()
  laborContId: number;
  @Column()
  sendType: string;
  @Column()
  resultCode: string;
}
