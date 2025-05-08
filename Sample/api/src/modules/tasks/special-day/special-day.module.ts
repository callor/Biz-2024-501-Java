import { IdSpecialDay } from '@entities/ade100/diary/id-special-day.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialDayTask } from './special-day.task';

@Module({
  imports: [TypeOrmModule.forFeature([IdSpecialDay])],
  providers: [SpecialDayTask],
  exports: [SpecialDayTask],
})
export class SpecialDayModule {}
