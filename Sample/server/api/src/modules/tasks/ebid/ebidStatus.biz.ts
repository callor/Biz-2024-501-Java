import { TbNotice } from '@entities/sgn2/ebid/tb-notice.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class EbidStatusBiz {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(TbNotice, SGN2) private readonly tbNotice: Repository<TbNotice>,
    @InjectEntityManager(SGN2) private readonly manager: EntityManager,
  ) {}

  async updateBidStatus() {
    // 진행중(1)인 공고 중에서, 입찰공고마감일이 되면 입찰마감(2)으로 변경
    await this.updateBidEnd();

    // 입찰마감(2)된 공고 중에서, 개찰일시가 되면 심사중(3)으로 변경
    await this.updateBidDeciding();
  }

  // 입찰 마감 상태로 변경
  async updateBidEnd() {
    const notices: {
      bidId: number;
      conm: string;
      name: string;
    }[] = await this.manager
      .createQueryBuilder()
      .select('bid_id', 'bidId')
      .addSelect(`GET_CONM(coid)`, 'conm')
      .addSelect('name', 'name')
      .from('TB_NOTICE', 'notice')
      .where(`"notice".status = '1'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .andWhere(`bid_eddt <= SYSDATE`)
      .getRawMany();

    notices.map(async (notice) => {
      await this.tbNotice.update(notice.bidId, { status: '2' });
      this.logger.log(`공고상태 변경 : 입찰마감 ===> [${notice.bidId}] ${notice.name}`);
    });
  }
  // 심사중 상태로 변경
  async updateBidDeciding() {
    const notices: {
      bidId: number;
      conm: string;
      name: string;
    }[] = await this.manager
      .createQueryBuilder()
      .select('bid_id', 'bidId')
      .addSelect(`GET_CONM(coid)`, 'conm')
      .addSelect('name', 'name')
      .from('TB_NOTICE', 'notice')
      .where(`"notice".status = '2'`)
      .andWhere(`"notice".chg_yn ='N'`)
      .andWhere(`open_dt <= SYSDATE`)
      .getRawMany();

    notices.map(async (notice) => {
      await this.tbNotice.update(notice.bidId, { status: '3' });
      this.logger.log(`공고상태 변경 : 심사중 ===> [${notice.bidId}] ${notice.name}`);
    });
  }
}
