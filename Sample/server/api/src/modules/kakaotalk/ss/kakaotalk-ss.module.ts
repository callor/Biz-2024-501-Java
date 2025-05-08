import { IcKakaoBtn } from "@entities/ade100/common/ic-kakao-btn.entity";
import { IcKakaoMessage } from "@entities/ade100/common/ic-kakao-message.entity";
import { IcKakaoService } from "@entities/ade100/common/ic-kakao-service.entity";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KakaoTalkModule } from "../kakaotalk.module";
import { KakaoTalkSsAction } from "./kakaotalk-ss.action";
import { KakaotalkSsBiz } from "./kakaotalk-ss.biz";

@Module({
    imports: [
        TypeOrmModule.forFeature([IcKakaoService, IcKakaoMessage, IcKakaoBtn]),
        forwardRef(() => KakaoTalkModule),
    ],
    controllers: [KakaoTalkSsAction],
    providers: [KakaotalkSsBiz],
    exports: [KakaotalkSsBiz],
})
export class KakaoTalkSsModule {}