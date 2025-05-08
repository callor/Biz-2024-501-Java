import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { IcFile } from '../common/ic-file.entity';
import { IdEvent } from './id-event.entity';

// 일정_첨부파일
@Entity()
export class IdEventFile {
  // 일정키
  @PrimaryColumn()
  eventId: string;
  // 일정순번
  @PrimaryColumn()
  sno: number;
  // 파일ID
  @Column()
  fileId: string;

  @ManyToOne(() => IdEvent, (event) => event.files)
  event: IdEvent;

  @OneToOne(() => IcFile, (file) => file.fileIds)
  @JoinColumn({ name: 'FILE_ID' })
  file: IcFile;
}
