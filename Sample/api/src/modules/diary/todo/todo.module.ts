import { IcUsr } from '@entities/ade100/common/ic-usr.entity';
import { IdSetting } from '@entities/ade100/diary/id-setting.entity';
import { IdTodoAlrmPush } from '@entities/ade100/diary/id-todo-alrm-push.entity';
import { IdTodoAlrm } from '@entities/ade100/diary/id-todo-alrm.entity';
import { IdTodo } from '@entities/ade100/diary/id-todo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoAction } from './todo.action';
import { TodoBiz } from './todo.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IdSetting, IdTodo, IcUsr, IdTodoAlrm, IdTodoAlrmPush])],
  controllers: [TodoAction],
  providers: [TodoBiz],
  exports: [TodoBiz],
})
export class TodoModule {}
