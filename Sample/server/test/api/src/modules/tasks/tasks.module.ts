import config from '@config';
import { IdSpecialDay } from '@entities/ade100/diary/id-special-day.entity';
import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';

@Module({})
export class TasksModule {
  static register() {
    const result = {
      module: TasksModule,
      imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([IdSpecialDay])],
      providers: [TasksService],
    };

    // 스케쥴 서버에서만 돌도록
    if (!config.schedule.server) {
      delete result['imports'];
      delete result['providers'];
    }
    return result as DynamicModule;
  }
}
