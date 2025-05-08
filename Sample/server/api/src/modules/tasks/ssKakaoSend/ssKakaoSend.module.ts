import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KAFKA, SSDB } from '@utils/constants';
import { SsKakaoSendBiz } from './ssKakaoSend.biz';
import { SsKakaoSendTask } from './ssKakaoSend.task';
import { SsKakaoSend } from '@entities/ssdb/ss-kakao-send.entity';
import { GojiIssueInfo } from '@entities/kafka/goji-issue-info.entity';
import { KakaoTalkModule } from '@modules/kakaotalk/kakaotalk.module';
import { BizGojitt } from '@entities/kafka/biz-gojitt.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SsKakaoSend], SSDB),TypeOrmModule.forFeature([GojiIssueInfo,BizGojitt], KAFKA),KakaoTalkModule,],
    providers:[SsKakaoSendTask, SsKakaoSendBiz],
    exports:[SsKakaoSendBiz]
})

export class SsKakaoSendModule{}