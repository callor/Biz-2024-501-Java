import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IdTodo } from './id-todo.entity';

// 할일_알림_전송
@Entity()
export class IdTodoAlrmPush {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 할일키
  @PrimaryColumn()
  todoId: string;
  // 전솔날짜
  @Column()
  pushDt: Date;
  // 데몬동기화여부
  @Column({ default: 'N', enum: ['Y', 'N'] })
  syncYn: YN;

  @OneToOne(() => IdTodo, (todo) => todo.push)
  todo: IdTodo;
}
