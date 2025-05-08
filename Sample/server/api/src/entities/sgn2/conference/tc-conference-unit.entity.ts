import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TcConferenceUnit {
  @PrimaryColumn()
  conferenceUnitId: number;
  @Column()
  conferenceId: number;
  @Column()
  conferenceHallId: number;
  @Column()
  userid: number;
  @Column()
  startDt: Date;
  @Column()
  endDt: Date;
  @Column()
  dispDt: string;
  @Column()
  deadlineDt: Date;
  @Column()
  startlineDt: Date;
  @Column()
  receiveCount: number;
  @Column()
  status: string;
  @Column()
  memberYn: string;
  @Column()
  retDt: Date;
  @Column()
  contents: string;
}
