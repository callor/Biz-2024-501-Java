import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IcMember } from '../common/ic-member.entity';
import { IdEvent } from './id-event.entity';

// 일정_댓글
@Entity({ orderBy: { RETDT: 'ASC' } })
export class IdEventReply {
  // 일정키
  @PrimaryColumn()
  eventId: string;
  // 댓글키
  @PrimaryColumn()
  replyId: string;
  // 등록자
  @Column()
  userId: string;
  // 댓글
  @Column()
  reply: string;
  // 등록일
  @CreateDateColumn()
  retdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  @ManyToOne(() => IdEvent, (event) => event.replys, { onDelete: 'CASCADE' })
  event: IdEvent;

  @ManyToOne(() => IcMember, (member) => member.replys)
  @JoinColumn({ name: 'USER_ID' })
  member: IcMember;
}
