import LoggerService from '@modules/common/logger/logger.service';
import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {RecruitStatusBiz} from './recruitStatus.biz'

@Injectable()
export class RecruitTask {
    constructor(
        private readonly recruitStatusBiz: RecruitStatusBiz,
        private readonly logger: LoggerService,
    ) {
    }

    //0520 이후로는 1시에 한번만 상태변경 
    @Cron('0 0 1 * * *')
    async recruitScheduler() {
        this.logger.log('모집 게시글 상태 변경 시작');
        await this.recruitStatusBiz.updateRecruitToEnd();
        this.logger.log(`모집 게시글 상태 변경 완료`);
    }
}

