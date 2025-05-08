import { TcPlayList } from '@entities/sgn2/youtube/tc-play-list.entity';
import { LoggerModule } from '@modules/common/logger/logger.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import { CrawlingAction } from './crawling.action';
import { CrawlingBiz } from './crawling.biz';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([TcPlayList], SGN2)],
  controllers: [CrawlingAction],
  providers: [CrawlingBiz],
})
export class CrawlingModule {}
