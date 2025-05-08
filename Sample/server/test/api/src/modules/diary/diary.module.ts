import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { SpecialModule } from './special/special.module';
import { TipModule } from './tip/tip.module';

@Module({
  imports: [
    // 다이어리 캘린더
    CalendarModule,
    // 다이어리 팁
    TipModule,
    // 특일정보
    SpecialModule,
  ],
})
export class DiaryModule {}
