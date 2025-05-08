import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IcMember } from '../common/ic-member.entity';
import { IdTodoAlrmPush } from './id-todo-alrm-push.entity';
import { IdTodoAlrm } from './id-todo-alrm.entity';

// 할일
@Entity()
export class IdTodo {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 할일키
  @PrimaryColumn()
  todoId: string;
  // 할일명
  @Column()
  name: string;
  // 상세내용
  @Column()
  note?: string;
  // 종일여부
  @Column()
  allDayYn: YN;
  // 시작일
  @Column()
  startDt: Date;
  // 완료일
  @Column()
  endDt?: Date;
  // 완료여부
  @Column({ default: 'N', enum: ['Y', 'N'] })
  endYn: YN;
  // 등록일
  @CreateDateColumn()
  regdt: Date;
  // 수정일
  @UpdateDateColumn()
  uptdt: Date;

  @OneToOne(() => IdTodoAlrm, (alrm) => alrm.todo)
  @JoinColumn([{ name: 'TODO_ID' }, { name: 'USER_ID' }])
  alrm: IdTodoAlrm;

  @OneToOne(() => IdTodoAlrmPush, (push) => push.todo)
  @JoinColumn([{ name: 'TODO_ID' }, { name: 'USER_ID' }])
  push: IdTodoAlrmPush;

  @ManyToOne(() => IcMember, (member) => member.todos)
  member: IcMember;
}
