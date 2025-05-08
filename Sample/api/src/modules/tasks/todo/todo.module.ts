import { IdTodoAlrmPush } from '@entities/ade100/diary/id-todo-alrm-push.entity';
import { AlrmModule } from '@modules/alrm/alrm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoTask } from './todo.task';

@Module({
  imports: [TypeOrmModule.forFeature([IdTodoAlrmPush]), AlrmModule],
  providers: [TodoTask],
  exports: [TodoTask],
})
export class TodoModule {}
