import { IdSetting } from '@entities/ade100/diary/id-setting.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiarySettingAction } from './setting.action';
import { DiarySettingBiz } from './setting.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IdSetting])],
  controllers: [DiarySettingAction],
  providers: [DiarySettingBiz],
  exports: [DiarySettingBiz],
})
export class DiarySettingModule {}
