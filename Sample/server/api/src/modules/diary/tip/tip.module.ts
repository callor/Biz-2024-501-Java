import { IdTip } from '@entities/ade100/diary/id-tip.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipAction } from './tip.action';
import { TipBiz } from './tip.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IdTip])],
  controllers: [TipAction],
  providers: [TipBiz],
})
export class TipModule {}
