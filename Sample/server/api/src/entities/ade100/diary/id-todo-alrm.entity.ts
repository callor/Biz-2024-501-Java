import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { IdTodo } from './id-todo.entity';

// 할일_알림
@Entity()
export class IdTodoAlrm {
  // 사용자키
  @PrimaryColumn()
  userId: string;
  // 할일키
  @PrimaryColumn()
  todoId: string;
  //  알림타입
  @Column({ enum: ['W', 'D', 'H', 'M'] })
  type: 'W' | 'D' | 'H' | 'M';
  // 알림지정
  @Column()
  num: number;
  // 알림시간
  @Column()
  alrmTime?: string;

  @OneToOne(() => IdTodo, (todo) => todo.alrm)
  todo: IdTodo;
}
