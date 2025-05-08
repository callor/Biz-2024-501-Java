import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IdEventReply } from '../diary/id-event-reply.entity';
import { IdEvent } from '../diary/id-event.entity';
import { IdTodo } from '../diary/id-todo.entity';
import { IcMemberAdAgree } from './ic-member-ad-agree.entity';
import { IcUsr } from './ic-usr.entity';

// 사용자정보
@Entity()
export class IcMember {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 한국이름
  @Column()
  kornm: string;
  // 핸드폰번호
  @Column()
  mobile: string;
  // 생년월일
  @Column()
  birth?: string;
  // 상태
  @Column()
  status: string;
  // 성별
  @Column()
  sex?: 'M' | 'W';
  // 이메일
  @Column()
  email: string;
  // 프로필사진
  @Column()
  photo?: string;
  // 등록일
  @CreateDateColumn()
  regdt?: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt?: Date;

  @OneToOne(() => IcUsr, (user) => user.member)
  @JoinColumn({ name: 'USER_ID' })
  user: IcUsr;

  @OneToMany(() => IcMemberAdAgree, (agree) => agree.member)
  agrees: IcMemberAdAgree[];

  @OneToMany(() => IdEventReply, (reply) => reply.member)
  replys: IdEventReply[];

  @OneToMany(() => IdEvent, (event) => event.member)
  events: IdEvent[];

  @OneToMany(() => IdTodo, (todos) => todos.member)
  todos: IdTodo[];
}
