import { SG100 } from '@utils/constants';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoTalkAction } from './kakaotalk.action';
import { KakaoTalkBiz } from './kakaotalk.biz';
import { SgKakaomovmanurl } from '@entities/sg100/kakaotalk/kakaotalk.entity';
import { LoggerModule } from '@modules/common/logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([SgKakaomovmanurl], SG100)],
  controllers: [KakaoTalkAction],
  providers: [KakaoTalkBiz],
})
export class KakaoTalkModule {}
