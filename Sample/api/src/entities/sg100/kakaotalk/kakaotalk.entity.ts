import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SgKakaomovmanurl {
  @PrimaryColumn()
  cateid: string;
  @Column()
  parCateid: string;
  @Column()
  mangubun: string;
  @Column()
  catename: string;
  @Column()
  youtUrl: string;
  @Column()
  kakaoMsgidx: string;
  @Column()
  kakaoMessage: string;
}
