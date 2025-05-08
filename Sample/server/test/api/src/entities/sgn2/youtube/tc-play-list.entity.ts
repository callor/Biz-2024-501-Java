import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TcPlayList {
  @PrimaryColumn()
  readonly channelId: string;
  @PrimaryColumn()
  readonly crawlingDt: string;
  @PrimaryColumn()
  readonly sno: number;

  @Column()
  readonly title: string;
  @Column()
  readonly videoId: string;
  @Column()
  readonly thumbnail: string;
}
