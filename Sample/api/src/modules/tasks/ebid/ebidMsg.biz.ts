import LoggerService from '@modules/common/logger/logger.service';
import { SmsBiz } from '@modules/sms/sms.biz';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { EntityManager } from 'typeorm';

@Injectable()
export class EbidMsgBiz {
  constructor(
    private readonly smsBiz: SmsBiz,
    private readonly logger: LoggerService,
    @InjectEntityManager(SGN2) private readonly manager: EntityManager,
  ) {}

  // 현설참여 첨부서류 등록 요청 문자 To. 등록업체
  async uploadInspectionFile() {
    const notices: {
      conm: string;
      name: string;
      addr: string;
      bidNo: number;
      addrDetail: string;
      inspectionDt: Date;
      mp: string;
    }[] = await this.manager
      .createQueryBuilder()
      .select(`GET_CONM(coid)`, 'conm')
      .addSelect(`GET_DUTY_MANAGER_MP(coid, 'EBID')`, 'mp')
      .addSelect('name', 'name')
      .addSelect('addr', 'addr')
      .addSelect('"notice".bid_no', 'bidNo')
      .addSelect('addr_detail', 'addrDetail')
      .addSelect('inspection_dt', 'inspectionDt')
      .from('TB_NOTICE', 'notice')
      .innerJoin('TB_SITE_ATTEND', 'attend', '"notice".BID_ID = "attend".BID_ID')
      .where(`TRUNC(bid_stdt,'MI') = TRUNC(SYSDATE, 'MI')`)
      .andWhere(`"notice".status = '1'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .getRawMany();

    try {
      await Promise.all(
        notices.map((notice) => {
          const msg = {
            subject: 'ECON 민간입찰',
            reserved1: 'EBID_MMS_REG_1',
            mobile: notice.mp,
            message: `ECON 민간입찰\n
  공고 등록 업체 : ${notice.conm}
  공고명 : ${notice.name}(${notice.bidNo})
  현장설명장소 : ${notice.addr} ${notice.addrDetail}
  현장설명일시 : ${DateUtil.format(notice.inspectionDt, 'yyyy.MM.dd HH:mm')}
  
해당 입찰 공고의 현장설명회가 종료되었습니다.
                
"현장설명회 관련 참여서류"를 추가해주세요.
  
현장설명회 관련 참여서류 및 참여업체를 선택한 후 협력업체의 투찰이 가능합니다.

자세한 사항은 이콘 홈페이지에서 확인하시기 바랍니다.`,
          };
          this.smsBiz.sendMms(msg);
        }),
      );
    } catch (e) {
      this.logger.log(e);
    }
  }

  // 개찰일시 1일전 문자 To. 등록업체
  async openBidMsg() {
    const notices: {
      conm: string;
      name: string;
      openDt: Date;
      bidNo: number;
      mp: string;
    }[] = await this.manager
      .createQueryBuilder()
      .select(`GET_CONM(coid)`, 'conm')
      .addSelect(`GET_DUTY_MANAGER_MP(coid, 'EBID')`, 'mp')
      .addSelect('name', 'name')
      .addSelect('bid_no', 'bidNo')
      .addSelect('open_dt', 'openDt')
      .from('TB_NOTICE', 'notice')
      .where(`TRUNC(open_dt) = TRUNC(SYSDATE + 1)`)
      .andWhere(`"notice".status = '2'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .getRawMany();

    try {
      await Promise.all(
        notices.map((notice) => {
          const msg = {
            subject: 'ECON 민간입찰',
            reserved1: 'EBID_MMS_REG_3',
            mobile: notice.mp,
            message: `ECON 민간입찰\n
입찰 등록 업체 : ${notice.conm}
공고명 : ${notice.name}(${notice.bidNo})
개찰일시:${DateUtil.format(notice.openDt, 'yyyy.MM.dd HH:mm')}

해당 입찰 공고의 개찰일시 1일전입니다.
              
자세한 사항은 이콘 홈페이지에서 확인하시기 바랍니다.`,
          };
          this.smsBiz.sendMms(msg);
        }),
      );
    } catch (e) {
      this.logger.log(e);
    }
  }

  // 입찰공고일시 시작 시 참여업체 선정 알림 To. 지원업체
  async bidNoticeMsg() {
    const notices: {
      bidId: number;
      coid: number;
      conm: string;
      name: string;
      inspectionDt: Date;
      addr: string;
      bidNo: number;
      addrDetail: string;
    }[] = await this.manager
      .createQueryBuilder()
      .select(`GET_CONM(notice.coid)`, 'conm')
      .addSelect('"notice".bid_id', 'bidId')
      .addSelect(`"notice".coid`, 'coid')
      .addSelect(`"notice".name`, 'name')
      .addSelect(`"notice".bid_no`, 'bidNo')
      .addSelect(`"siteAttend".addr`, 'addr')
      .addSelect(`"siteAttend".addr_detail`, 'addrDetail')
      .addSelect(`"siteAttend".inspection_dt`, 'inspectionDt')
      .from('TB_NOTICE', 'notice')
      .addFrom('TB_SITE_ATTEND', 'siteAttend')
      .addFrom('TB_CHG_NOTICE', 'chgNotice')
      .where(`TRUNC("notice".notice_dt,'MI') = TRUNC(SYSDATE, 'MI')`)
      .andWhere(`"notice".bid_id = "chgNotice".bid_id`)
      .andWhere(`"chgNotice".par_bid_id IS NULL`)
      .andWhere(`"notice".bid_id = "siteAttend".bid_id(+)`)
      .andWhere(`"notice".status = '1'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .getRawMany();

    notices.map(async (notice) => {
      const coops: { conm: string; mp: string }[] = await this.manager
        .createQueryBuilder()
        .select(`GET_CONM(coid)`, 'conm')
        .addSelect(`GET_DUTY_MANAGER_MP(coid, 'EBID')`, 'mp')
        .from('TB_COOP', 'coop')
        .where('bid_id = (:bidId)', { bidId: notice.bidId })
        .getRawMany();

      try {
        await Promise.all(
          coops.map((coop) => {
            const msg = {
              subject: 'ECON 민간입찰',
              reserved1: 'EBID_MMS_COOP_1',
              mobile: coop.mp,
              message: `ECON 민간입찰\n
입찰 등록업체 : ${notice.conm}\n
공고명 : ${notice.name}(${notice.bidNo})

해당 입찰공고의 참여업체로 선정되었습니다.

${
  notice.addr
    ? `현장설명장소 : ${notice.addr} ${notice.addrDetail}
현장설명회 일시 : ${DateUtil.format(notice.inspectionDt, 'yyyy.MM.dd HH:mm')}
`
    : ''
}
자세한 사항은 이콘 홈페이지에서 확인하시기 바랍니다.`,
            };
            this.smsBiz.sendMms(msg);
          }),
        );
      } catch (e) {
        this.logger.log(e);
      }
    });
  }
  // 현장설명회 3시간 전 알림 To. 지원업체
  async attendSiteMsg() {
    const notices: {
      bidId: number;
      coid: number;
      conm: string;
      name: string;
      inspectionDt: Date;
      addr: string;
      bidNo: number;
      addrDetail: string;
    }[] = await this.manager
      .createQueryBuilder()
      .select(`GET_CONM(notice.coid)`, 'conm')
      .addSelect('"notice".bid_id', 'bidId')
      .addSelect('"notice".bid_no', 'bidNo')
      .addSelect(`"notice".coid`, 'coid')
      .addSelect(`"notice".name`, 'name')
      .addSelect(`"siteAttend".addr`, 'addr')
      .addSelect(`"siteAttend".addr_detail`, 'addrDetail')
      .addSelect(`"siteAttend".inspection_dt`, 'inspectionDt')
      .from('TB_NOTICE', 'notice')
      .addFrom('TB_SITE_ATTEND', 'siteAttend')
      .where(`TRUNC("siteAttend".inspection_dt,'MI') = TRUNC(SYSDATE + 3/24, 'MI')`)
      .andWhere(`"notice".bid_id = "siteAttend".bid_id`)
      .andWhere(`"notice".status = '1'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .getRawMany();

    notices.map(async (notice) => {
      const coops: { conm: string; mp: string }[] = await this.manager
        .createQueryBuilder()
        .select(`GET_CONM(coid)`, 'conm')
        .addSelect(`GET_DUTY_MANAGER_MP(coid, 'EBID')`, 'mp')
        .from('TB_COOP', 'coop')
        .where('bid_id = (:bidId)', { bidId: notice.bidId })
        .getRawMany();

      try {
        await Promise.all(
          coops.map((coop) => {
            const msg = {
              subject: 'ECON 민간입찰',
              reserved1: 'EBID_MMS_COOP_2',
              mobile: coop.mp,
              message: `ECON 민간입찰\n
입찰 등록업체 : ${notice.conm}
공고명 : ${notice.name}(${notice.bidNo})
현장설명회 일시 : ${DateUtil.format(notice.inspectionDt, 'yyyy.MM.dd HH:mm')}
현장설명회 장소 : ${notice.addr} ${notice.addrDetail}

해당 입찰공고의 현장설명회가 오늘 ${
                DateUtil.format(notice.inspectionDt, 'HH') > '12' ? '오후' : '오전'
              } ${DateUtil.format(notice.inspectionDt, 'HH:mm')}에 진행됩니다.

자세한 사항은 이콘 홈페이지에서 확인하시기 바랍니다.`,
            };
            this.smsBiz.sendMms(msg);
          }),
        );
      } catch (e) {
        this.logger.log(e);
      }
    });
  }
  // 입찰공고마감일 1일전 마감 알림 To. 지원업체
  async bidEddtMsg() {
    const notices: {
      bidId: number;
      conm: string;
      name: string;
      bidStdt: Date;
      bidEddt: Date;
      openDt: Date;
      bidNo: number;
    }[] = await this.manager
      .createQueryBuilder()
      .select(`GET_CONM(coid)`, 'conm')
      .addSelect('"notice".bid_id', 'bidId')
      .addSelect('"notice".bid_no', 'bidNo')
      .addSelect('name', 'name')
      .addSelect('bid_stdt', 'bidStdt')
      .addSelect('bid_eddt', 'bidEddt')
      .addSelect('open_dt', 'openDt')
      .from('TB_NOTICE', 'notice')
      .where(`TRUNC(bid_eddt) = TRUNC(SYSDATE + 1)`)
      .andWhere(`"notice".status = '1'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .getRawMany();

    notices.map(async (notice) => {
      const coops: { conm: string; mp: string }[] = await this.manager
        .createQueryBuilder()
        .select(`GET_CONM(coid)`, 'conm')
        .addSelect(`GET_DUTY_MANAGER_MP(coid, 'EBID')`, 'mp')
        .from('TB_COOP', 'coop')
        .where('bid_id = (:bidId)', { bidId: notice.bidId })
        .getRawMany();

      try {
        await Promise.all(
          coops.map((coop) => {
            const msg = {
              subject: 'ECON 민간입찰',
              reserved1: 'EBID_MMS_COOP_4',
              mobile: coop.mp,
              message: `ECON 민간입찰\n
입찰 등록업체 : ${notice.conm}
공고명 : ${notice.name}(${notice.bidNo})
입찰공고 일시 : ${DateUtil.format(notice.bidStdt, 'yyyy.MM.dd HH:mm')} ~ ${DateUtil.format(
                notice.bidEddt,
                'yyyy.MM.dd HH:mm',
              )}
개찰일시 : ${DateUtil.format(notice.openDt, 'yyyy.MM.dd HH:mm')}

해당 공고의 입찰 마감 1일 전입니다.

자세한 사항은 이콘 홈페이지에서 확인하시기 바랍니다.`,
            };
            this.smsBiz.sendMms(msg);
          }),
        );
      } catch (e) {
        this.logger.log(e);
      }
    });
  }
  // 재입찰공고 시작 알림 To. 지원업체
  async reBidNoticeMsg() {
    const notices: {
      bidId: number;
      coid: number;
      conm: string;
      name: string;
      bidStdt: Date;
      bidEddt: Date;
      openDt: Date;
      bidNo: number;
    }[] = await this.manager
      .createQueryBuilder()
      .select(`GET_CONM(notice.coid)`, 'conm')
      .addSelect('"notice".bid_id', 'bidId')
      .addSelect('"notice".bid_no', 'bidNo')
      .addSelect(`"notice".name`, 'name')
      .addSelect(`"notice".bid_stdt`, 'bidStdt')
      .addSelect(`"notice".bid_eddt`, 'bidEddt')
      .addSelect(`"notice".open_dt`, 'openDt')
      .from('TB_NOTICE', 'notice')
      .addFrom('TB_CHG_NOTICE', 'chgNotice')
      .where(`"notice".bid_id = "chgNotice".bid_id`)
      .andWhere(`"chgNotice".par_bid_id IS NOT NULL`)
      .andWhere(`"notice".status = '1'`)
      .andWhere(`"notice".chg_yn = 'N'`)
      .andWhere(`TRUNC("notice".notice_dt,'MI') = TRUNC(SYSDATE, 'MI')`)
      .getRawMany();

    notices.map(async (notice) => {
      const coops: { conm: string; mp: string }[] = await this.manager
        .createQueryBuilder()
        .select(`GET_CONM(coid)`, 'conm')
        .addSelect(`GET_DUTY_MANAGER_MP(coid, 'EBID')`, 'mp')
        .from('TB_COOP', 'coop')
        .where('bid_id = (:bidId)', { bidId: notice.bidId })
        .getRawMany();

      try {
        await Promise.all(
          coops.map((coop) => {
            const msg = {
              subject: 'ECON 민간입찰',
              reserved1: 'EBID_MMS_COOP_13',
              mobile: coop.mp,
              message: `ECON 민간입찰\n
입찰 등록업체 : ${notice.conm}\n
공고명 : ${notice.name}(${notice.bidNo})
재입찰공고 일시 : ${DateUtil.format(notice.bidStdt, 'yyyy.MM.dd HH:mm')} ~ ${DateUtil.format(
                notice.bidEddt,
                'yyyy.MM.dd HH:mm',
              )}
개찰일시 : ${DateUtil.format(notice.openDt, 'yyyy.MM.dd HH:mm')}

해당공고의 재입찰 참여업체로 선정되어 투찰이 가능합니다.

자세한 사항은 이콘 홈페이지에서 확인하시기 바랍니다.`,
            };
            this.smsBiz.sendMms(msg);
          }),
        );
      } catch (e) {
        this.logger.log(e);
      }
    });
  }
}
