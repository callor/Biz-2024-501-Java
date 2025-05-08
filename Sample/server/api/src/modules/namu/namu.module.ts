import { Module } from '@nestjs/common';
import { DiaryCompanyModule } from './diary/diary.module';

@Module({
  imports: [DiaryCompanyModule],
})
export class NamuModule {}
