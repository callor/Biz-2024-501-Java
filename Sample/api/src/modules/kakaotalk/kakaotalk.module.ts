import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { IcKakaoService } from '@entities/ade100/common/ic-kakao-service.entity';
import { IcKakaoToken } from '@entities/ade100/common/ic-kakao-token.entity';
import { SgKakaomovmanurl } from '@entities/sg100/kakaotalk/kakaotalk.entity';
import { ToPtptKkoHsty } from '@entities/sgn2/coop/to-ptpt-kko-hsty.entity';
import { LoggerModule } from '@modules/common/logger/logger.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SG100, SGN2 } from '@utils/constants';
import { KakaoTalkCoopModule } from './coop/kakaotalk-coop.module';
import { KakaoTalkAction } from './kakaotalk.action';
import { KakaoTalkBiz } from './kakaotalk.biz';
import { KakaoTalkKpModule } from './kp/kakaotalk-kp.module';
import { TemplateModule } from './template/template.module';
import { KakaoTalkSsModule } from './ss/kakaotalk-ss.module';
import { KakaoTalkKafkaModule } from './kafka/kakaotalk-kafka.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([SgKakaomovmanurl], SG100),
    TypeOrmModule.forFeature([ToPtptKkoHsty], SGN2),
    TypeOrmModule.forFeature([IcKakaoService, IcKakaoMessage , IcKakaoToken]),
    // 카카오 템플릿
    TemplateModule,
    // 상호협력
    KakaoTalkCoopModule,
    // 김반장웹
    KakaoTalkKpModule,
    // 업무톡
    KakaoTalkSsModule,
    //카프카
    KakaoTalkKafkaModule,

  ],
  controllers: [KakaoTalkAction],
  providers: [KakaoTalkBiz],
  exports: [KakaoTalkBiz],
})
export class KakaoTalkModule {}
