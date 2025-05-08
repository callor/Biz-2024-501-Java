import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KpwCont {
  @PrimaryColumn()
  contId: number;
  @Column()
  sendType: string;
  @Column()
  resultCode: string;
  @Column()
  desResultCode: string;
  @Column()
  desSendType: string;
}
