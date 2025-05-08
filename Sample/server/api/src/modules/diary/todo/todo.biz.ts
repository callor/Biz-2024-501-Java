import { IdSetting } from '@entities/ade100/diary/id-setting.entity';
import { IdTodoAlrmPush } from '@entities/ade100/diary/id-todo-alrm-push.entity';
import { IdTodoAlrm } from '@entities/ade100/diary/id-todo-alrm.entity';
import { IdTodo } from '@entities/ade100/diary/id-todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';
import { Connection, Repository } from 'typeorm';
import { CompleteTodoDTO } from './dto/complete-todo.dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoBiz {
  constructor(
    @InjectRepository(IdSetting) private readonly idSetting: Repository<IdSetting>,
    @InjectRepository(IdTodo) private readonly idTodo: Repository<IdTodo>,
    @InjectRepository(IdTodoAlrm) private readonly idTodoAlrm: Repository<IdTodoAlrm>,
    @InjectRepository(IdTodoAlrmPush) private readonly idTodoAlrmPush: Repository<IdTodoAlrmPush>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async list({ userId, yyyymm }: { userId: string; yyyymm: string }) {
    const setting = await this.idSetting.findOne(userId);

    const monthStart = DateUtil.ymdToDate(yyyymm + '01'); //          달의 시작일
    const start = DateUtil.getCalendarStartDay(monthStart); //  해당 달 1째주 일요일
    const end = DateUtil.getCalendarLastDay(monthStart); //     해당 달 마지막주 토요일

    const query = this.idTodo
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.alrm', 'alrm')
      .where('todo.userId = :userId', { userId })
      .andWhere('todo.startDt BETWEEN :searchStart AND :searchEnd', { searchStart: start, searchEnd: end })
      .orderBy({ 'todo.startDt': 'ASC' });

    if (setting?.todoEndShow === 'N') {
      query.andWhere(`todo.END_YN = 'N'`);
    }
    return await query.getMany();
  }

  async detail(where: { userId: string; todoId: string }) {
    return (await this.idTodo.find({ where, relations: ['alrm', 'member'] }))[0];
  }

  async create(createTodoDTO: CreateTodoDTO) {
    await this.connection.transaction(async (manager) => {
      const todo = this.idTodo.create(createTodoDTO);
      todo.todoId = SecurityUtil.getShortUUID();
      await manager.insert(IdTodo, { ...todo, alrm: undefined });
      if (createTodoDTO.alrm) {
        const { startDt, allDayYn, userId, alrm } = createTodoDTO;
        await manager.insert(IdTodoAlrm, this.idTodoAlrm.create({ ...alrm, todoId: todo.todoId, userId }));
        // 최초 알림 전송 세팅
        let pushDt = DateUtil.setAlrmDate(startDt, alrm.type, alrm.num);
        // 종일인 경우
        if (allDayYn === 'Y') {
          const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
          pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
        }
        // 현재 시간보다 클경우에만 집어넣어준다.
        if (pushDt.getTime() > Date.now()) {
          await manager.insert(IdTodoAlrmPush, { todoId: todo.todoId, userId, pushDt });
        }
      }
    });
  }

  async update(updateTodoDTO: UpdateTodoDTO) {
    await this.connection.transaction(async (manager) => {
      const { todoId, userId, name, allDayYn, startDt, note } = updateTodoDTO;
      await manager.update(
        IdTodo,
        { todoId, userId },
        {
          name,
          allDayYn,
          startDt,
          note,
        },
      );

      await manager.delete(IdTodoAlrm, { todoId, userId });
      if (updateTodoDTO.alrm) {
        const { startDt, allDayYn, todoId, userId, alrm } = updateTodoDTO;
        await manager.insert(IdTodoAlrm, this.idTodoAlrm.create({ ...alrm, todoId, userId }));
        // 최초 알림 전송 세팅
        let pushDt = DateUtil.setAlrmDate(startDt, alrm.type, alrm.num);
        // 종일인 경우
        if (allDayYn === 'Y') {
          const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
          pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
        }
        // 현재 시간보다 클경우에만 집어넣어준다.
        if (pushDt.getTime() > Date.now()) {
          await manager.insert(IdTodoAlrmPush, { todoId, userId, pushDt });
        }
      }
    });
  }

  async complete({ todoId, userId, endYn }: CompleteTodoDTO) {
    await this.connection.transaction(async (manager) => {
      await manager.update(IdTodo, { todoId, userId }, { endYn, endDt: endYn === 'Y' ? new Date() : null });
      // 완료 될 경우 알림 데몬 항목 삭제
      if (endYn === 'Y') {
        await manager.delete(IdTodoAlrmPush, { todoId, userId });
      } else {
        const todo = (await this.idTodo.find({ where: { todoId, userId }, relations: ['alrm'] }))[0];
        if (todo.alrm) {
          const { startDt, allDayYn, todoId, userId, alrm } = todo;

          //  알림 전송 세팅
          let pushDt = DateUtil.setAlrmDate(startDt, alrm.type, alrm.num);
          // 종일인 경우
          if (allDayYn === 'Y') {
            const [hours, minutes] = alrm.alrmTime.split(':').map((i) => Number(i));
            pushDt = DateUtil.set(pushDt, { hours, minutes, milliseconds: 0 });
          }
          // 현재 시간보다 클경우에만 집어넣어준다.
          if (pushDt.getTime() > Date.now()) {
            await manager.insert(IdTodoAlrmPush, { todoId, userId, pushDt });
          }
        }
      }
    });
  }

  async delete(where: { userId: string; todoId: string }) {
    await this.idTodo.delete(where);
  }
}
