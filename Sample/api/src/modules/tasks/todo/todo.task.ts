import { IdTodoAlrmPush } from '@entities/ade100/diary/id-todo-alrm-push.entity';
import { AlrmBiz } from '@modules/alrm/alrm.biz';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ALRM_TYPE } from '@utils/constants';
import { Connection, LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class TodoTask {
  constructor(
    private readonly logger: LoggerService,
    private readonly alrmBiz: AlrmBiz,
    @InjectRepository(IdTodoAlrmPush) private idTodoAlrmPush: Repository<IdTodoAlrmPush>,
    @InjectConnection() private conn: Connection,
  ) {}

  // 30초마다 서비스 호출
  @Cron('*/30 * * * * *')
  async sendEventNotification() {
    const currentTime = new Date();
    this.logger.log(`할 일 알림 전송시작 ${currentTime.toLocaleString()}`);
    const pushes = await this.idTodoAlrmPush.find({
      where: { syncYn: 'N', pushDt: LessThanOrEqual(new Date()) },
      relations: ['todo'],
    });

    await this.conn.transaction(async (manager) => {
      // 가져온 알림 전체 Y
      await Promise.all(
        pushes.map(async ({ todoId, userId }) => {
          await manager.update(IdTodoAlrmPush, { todoId, userId }, { syncYn: 'Y' });
        }),
      );
    });
    await this.conn.transaction(async (manager) => {
      await Promise.all(
        pushes.map(async ({ todo: { todoId, userId, name, note } }) => {
          await this.alrmBiz.sendAlrm({ users: [userId], type: ALRM_TYPE.TODO_ALRM, title: name, note });
          await manager.delete(IdTodoAlrmPush, { todoId, userId });
        }),
      );
    });
  }
}
