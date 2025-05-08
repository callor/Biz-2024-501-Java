import { IcKakaoBtn } from "@entities/ade100/common/ic-kakao-btn.entity";
import { IcKakaoMessage } from "@entities/ade100/common/ic-kakao-message.entity";
import { IcKakaoService } from "@entities/ade100/common/ic-kakao-service.entity";
import { KpwMonPay } from "@entities/sg100loc/pay/kpw-mon-pay.entity";
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SG100LOC } from "@utils/constants";
import { KakaoTalkModule } from "../kakaotalk.module";
import { KakaoTalkKpAction } from "./kakaotalk-kp.action";
import { KakaotalkKpBiz } from "./kakaotalk-kp.biz";

@Module({
    imports: [
        TypeOrmModule.forFeature([IcKakaoService, IcKakaoMessage, IcKakaoBtn]),
        TypeOrmModule.forFeature([KpwMonPay], SG100LOC),
        forwardRef(() => KakaoTalkModule),
    ],
    controllers: [KakaoTalkKpAction],
    providers: [KakaotalkKpBiz],
    exports: [KakaotalkKpBiz],
})
export class KakaoTalkKpModule {}