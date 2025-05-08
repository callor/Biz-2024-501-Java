import LoggerService from '@modules/common/logger/logger.service';
import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {KpwPayslipBiz} from "@modules/tasks/kpwPayslip/kpwPayslip.biz";
import { KakaotalkKpBiz } from '@modules/kakaotalk/kp/kakaotalk-kp.biz';

@Injectable()
export class KpwPayslipTask {
    constructor(
        private readonly kpwPayslipBiz: KpwPayslipBiz,
        // private readonly kakaotalkKpBiz: KakaotalkKpBiz,
        private readonly logger: LoggerService,
    ) {
    }

    @Cron('0 */1 * * * *')
    async payslipScheduler() {
        this.logger.log('카카오톡 전송 상태변경 시작');
        await this.kpwPayslipBiz.updatePay();
        this.logger.log(`카카오톡 전송 상태변경 완료`);
    }
}

