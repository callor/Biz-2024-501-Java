import { IcKakaoBtn } from '@entities/ade100/common/ic-kakao-btn.entity';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { IcKakaoService } from '@entities/ade100/common/ic-kakao-service.entity';
import { ToCourseScd } from '@entities/sgn2/coop/to-course-scd.entity';
import { ToPtptKkoHsty } from '@entities/sgn2/coop/to-ptpt-kko-hsty.entity';
import { ToPtptReq } from '@entities/sgn2/coop/to-ptpt-req.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import { KakaoTalkModule } from '../kakaotalk.module';
import { KakaoTalkCoopAction } from './kakaotalk-coop.action';
import { KakaotalkCoopBiz } from './kakaotalk-coop.biz';

@Module({
  imports: [
    TypeOrmModule.forFeature([IcKakaoService, IcKakaoMessage, IcKakaoBtn]),
    TypeOrmModule.forFeature([ToCourseScd, ToPtptReq, ToPtptKkoHsty], SGN2),
    forwardRef(() => KakaoTalkModule),
  ],
  controllers: [KakaoTalkCoopAction],
  providers: [KakaotalkCoopBiz],
  exports: [KakaotalkCoopBiz],
})
export class KakaoTalkCoopModule {}
