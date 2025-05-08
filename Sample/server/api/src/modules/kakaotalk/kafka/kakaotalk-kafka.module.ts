import { IcKakaoBtn } from "@entities/ade100/common/ic-kakao-btn.entity";
import { IcKakaoMessage } from "@entities/ade100/common/ic-kakao-message.entity";
import { IcKakaoService } from "@entities/ade100/common/ic-kakao-service.entity";
import { GojiIssueInfo } from "@entities/kafka/goji-issue-info.entity";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KakaoTalkModule } from "../kakaotalk.module";
import { KakaoTalkKafkaAction } from "./kakaotalk-kafka.action";
import { KakaotalkKafkaBiz } from "./kakaotalk-kafka.biz";
import { KAFKA } from "@utils/constants";
import { BizGojitt } from "@entities/kafka/biz-gojitt.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([IcKakaoService, IcKakaoMessage, IcKakaoBtn]),
        TypeOrmModule.forFeature([GojiIssueInfo , BizGojitt], KAFKA),
        forwardRef(() => KakaoTalkModule),
    ],
    controllers: [KakaoTalkKafkaAction],
    providers: [KakaotalkKafkaBiz],
    exports: [KakaotalkKafkaBiz],
})
export class KakaoTalkKafkaModule {}