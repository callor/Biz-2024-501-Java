import { Module } from '@nestjs/common';
import { AdminUserModule } from './admin/user/user.module';
import { CalendarModule } from './calendar/calendar.module';
import { DiarySettingModule } from './setting/setting.module';
import { SpecialModule } from './special/special.module';
import { TipModule } from './tip/tip.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // 다이어리 캘린더
    CalendarModule,
    // 다이어리 팁
    TipModule,
    // 특일정보
    SpecialModule,
    // 할일
    TodoModule,
    // 다이어리 관리자
    AdminUserModule,
    // 다이어리 세팅
    DiarySettingModule,
  ],
})
export class DiaryModule {}
