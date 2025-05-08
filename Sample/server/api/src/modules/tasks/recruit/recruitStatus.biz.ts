import {TcRecruit} from '@entities/sgn2/recruit/tc_recruit.entity';
import LoggerService from '@modules/common/logger/logger.service';
import {Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {SGN2} from '@utils/constants';
import {EntityManager, Repository} from 'typeorm';

@Injectable()
export class RecruitStatusBiz {
    constructor(
        private readonly logger: LoggerService,
        @InjectRepository(TcRecruit, SGN2) private readonly tcRecruit: Repository<TcRecruit>,
        @InjectEntityManager(SGN2) private readonly manager: EntityManager,
    ) {
    }

    async updateRecruitToEnd() {
        const recruits: {
            recruitId: number;
            conm: string;
            recruitName: string;
        }[] = await this.manager
            .createQueryBuilder()
            .select('recruit_id', 'recruitId')
            .addSelect('GET_CONM(coid)', 'conm')
            .addSelect('recruit_name', 'recruitName')
            .from('TcRecruit', 'recruit')
            .where(`"recruit".status = '1'`)
            .andWhere(`"recruit".recruit_eddt < SYSDATE-1`)
            .getRawMany();
        recruits.map(async (recruit) => {
            await this.tcRecruit.update(recruit.recruitId, {status: '2'});
            this.logger.log(`상태변경:모집종료====>[${recruit.recruitId}] ${recruit.recruitName}`);
        });
    }
}