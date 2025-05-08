import { IcKakaoBtn } from '@entities/ade100/common/ic-kakao-btn.entity';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import { IcKakaoService } from '@entities/ade100/common/ic-kakao-service.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateAction } from './template.action';
import { TemplateBiz } from './template.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IcKakaoService, IcKakaoMessage, IcKakaoBtn])],
  controllers: [TemplateAction],
  providers: [TemplateBiz],
})
export class TemplateModule {}
