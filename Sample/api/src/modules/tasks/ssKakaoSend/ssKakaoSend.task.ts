import LoggerService from '@modules/common/logger/logger.service';
import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import { SsKakaoSendBiz } from './ssKakaoSend.biz';

@Injectable()
export class SsKakaoSendTask {
    constructor(
        private readonly ssKakaoSendBiz: SsKakaoSendBiz,
        private readonly logger: LoggerService,
    ) {
    }

    @Cron('30 */1 * * * *')
    async ssKakaoScheduler() {
        this.logger.log('카카오톡 전송 상태변경 시작');
        await this.ssKakaoSendBiz.updateKakaoSend();
        // await this.ssKakaoSendBiz.updateBizseeSend();
        this.logger.log(`카카오톡 전송 상태변경 완료`);
    }
}