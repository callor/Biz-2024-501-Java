import config from '@config';
import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CoopModule } from './coop/coop.module';
import { EbidModule } from './ebid/ebid.module';
import { KpwPayslipModule } from './kpwPayslip/kpwPayslip.module';
import { RecruitModule } from './recruit/recruit.module';
import { SpecialDayModule } from './special-day/special-day.module';
import { SsKakaoSendModule } from './ssKakaoSend/ssKakaoSend.module';
import { TodoModule } from './todo/todo.module';


@Module({})
export class TasksModule {
  static register() {
    const result = {
      module: TasksModule,
      imports: [ScheduleModule.forRoot(), SpecialDayModule, TodoModule, CoopModule, EbidModule, RecruitModule , KpwPayslipModule, SsKakaoSendModule],
      // imports: [ScheduleModule.forRoot(), SsKakaoSendModule ],
    };

    // 스케쥴 서버에서만 돌도록
    if (!config.schedule.server) {
      delete result['imports'];
    }
    return result as DynamicModule;
  }
}
