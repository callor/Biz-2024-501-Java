import { IdSpecialDay } from '@entities/ade100/diary/id-special-day.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialAction } from './special.action';
import { SpecialBiz } from './special.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IdSpecialDay])],
  controllers: [SpecialAction],
  providers: [SpecialBiz],
})
export class SpecialModule {}
