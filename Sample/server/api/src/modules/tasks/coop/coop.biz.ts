import { ToCourseScd } from '@entities/sgn2/coop/to-course-scd.entity';
import { ToPtptReq } from '@entities/sgn2/coop/to-ptpt-req.entity';
import { ToWondoManager } from '@entities/sgn2/coop/to-wondo-manager.entity';
import { KakaoTalkBiz } from '@modules/kakaotalk/kakaotalk.biz';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { SGN2 } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { Connection, EntityManager, In, Not, Repository } from 'typeorm';
import notOnlineUploadDocQuery from './not-online-upload-doc.query';
import { format } from 'date-fns';
import { TcConferenceUnit } from '@entities/sgn2/conference/tc-conference-unit.entity';

type Manager = {
  coid: number;
  conm: string;
  srvId: string;
  userid: number;
  kornm: string;
  mp?: string;
  tel?: string;
  divEmpNm: string;
  stsNm: string;
  ownerPhone: string;
  ownerName: string;
};
@Injectable()
export class CoopBiz {
  constructor(
    private readonly kakaoTalkBiz: KakaoTalkBiz,
    private readonly connection: Connection,
    @InjectRepository(ToCourseScd, SGN2) private readonly toCourseScd: Repository<ToCourseScd>,
    @InjectRepository(ToWondoManager, SGN2) private readonly toWondoManager: Repository<ToWondoManager>,
    @InjectRepository(ToPtptReq, SGN2) private readonly toPtptReq: Repository<ToPtptReq>,
    @InjectRepository(TcConferenceUnit, SGN2) private readonly tcConferenceUnit: Repository<TcConferenceUnit>,
    @InjectEntityManager(SGN2) private readonly manager: EntityManager,
  ) {}

 async updateResult() {
  const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
  const result = await this.kakaoTalkBiz.getResult(tokenInfo.token);
  return result;
 }
  // 담당자 리스트
  async managerList(where: { coid: number; userid?: number; srvId?: string }) {
    const manager = (await this.manager
      .createQueryBuilder()
      .select('coid', 'coid')
      .addSelect(`GET_CONM(coid)`, 'conm')
      .addSelect('hp1', 'mp')
      .addSelect('hp2', 'ownerPhone')
      .from('TO_WONDO_MANAGER', 'wondo')
      .where('coid = :coid', { coid: where.coid })
      .getRawOne()) as Manager;

    if (manager?.mp === undefined && manager?.ownerPhone === undefined) {
      const query = this.manager
        .createQueryBuilder()
        .select('"duty".coid', 'coid')
        .addSelect(`GET_CONM("duty".coid)`, 'conm')
        .addSelect('"duty".userid', 'userid')
        .addSelect('"emp".kornm', 'kornm')
        .addSelect('"emp".mp', 'mp')
        .addSelect('"emp".tel', 'tel')
        .addSelect(
          `(SELECT CODE_NM FROM TC_CODE C WHERE GROUP_ID = 'DIV_EMP' AND  C.CODE_ID = "emp".DIV_EMP)`,
          'divEmpNm',
        )
        .addSelect(`(SELECT CODE_NM FROM TC_CODE C WHERE GROUP_ID = 'STS_EMP' AND  C.CODE_ID = "emp".STS)`, 'stsNm')
        .addSelect(`GET_OWNER_PHONE("duty".COID)`, 'ownerPhone')
        .addSelect(`GET_OWNERNM("duty".COID)`, 'ownerNm')
        .from('TC_COMPANY_DUTY_MANAGER', 'duty')
        .innerJoin('TC_USR', 'usr', '"duty".coid = "usr".coid AND "duty".userid = "usr".userid')
        .innerJoin('TC_EMP', 'emp', '"duty".coid = "emp".coid AND "usr".empid = "emp".empid')
        .where('"duty".coid = :coid', { coid: where.coid });

      if (where.userid) {
        query.andWhere('"duty".userid = :userid', { userid: where.userid });
      }
      if (where.srvId) {
        query.andWhere('"duty".srv_id = :srvId', { srvId: where.srvId });
      }
      return await query.getRawMany<Manager>();
    } else {
      return [manager];
    }
  }

  // 온라인 협력사 납부 환급 일반 둘다 포함
  async sendOnlineTotalPersonnel(kakaoIdx: string) {
    const msgIdx = 'totCnt'
    const scdId = Number(DateUtil.format(new Date(), 'yyyyMMdd'));
    const checkDay = new Date().getDay() === 5 ? 3 : 1;
    // 오늘날짜의 온라인 교육 리스트
    const courses = await this.toCourseScd
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.reqs', 'req')
      .where({
        trt: In(['3', '4', '5']),
      })
      .andWhere(`course.scdId NOT IN (:...scdIds)`, {
        scdIds: [
          '8914',
          '8974',
          '8975',
          '8575',
          '8853',
          '8996',
          '8997',
          '8998',
          '8999',
          '9005',
          '9010',
          '9016',
          '9015',
          '9018',
          '9020',
          '9632'
        ],
      })
      .andWhere(`req.WONDO_COID != req.COOP_COID`)
      .andWhere(`"course".DANDOK_YN = 'N'`)
      .andWhere(`course.stdt = ( TRUNC(SYSDATE) + :checkDay )`, { checkDay })
      .getMany();

    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    if (courses.length > 0) {
      const { stdt } = courses[0];
      // const eddt = DateUtil.getBeforeDate(new Date(stdt.getFullYear(),11,31), DateUtil.addDay(DateUtil.addMonth(stdt, 3), -1));
      const eddt = new Date(stdt.getFullYear(),11,31); // 23년 부터 마감기간 12월 31일
      const groupByWondo = courses.reduce((map, value) => {
        value.reqs.forEach((req) => {
          (map[req.wondoCoid] = map[req.wondoCoid] ?? []).push(req);
        });
        return map;
      }, {} as { [key: string]: ToPtptReq[] });

      for await (const wondoCoid of Object.keys(groupByWondo)) {
        const managers = await this.managerList({ coid: Number(wondoCoid), srvId: 'COOP' });
        // 핸드폰번호가 있는 인원만
        const phones = managers
          .map((manager) => (manager.mp ?? manager.ownerPhone ?? '').replace(/[^0-9]/g, ''))
          .filter((str) => !!str);
        if (phones.length > 0) {
          const params = [
            {
              param: '원청사명',
              value: managers[0].conm,
            },
            {
              param: '교육참석일자',
              value: DateUtil.format(stdt, 'yyyy-MM-dd'),
            },
            {
              param: '지원기간',
              value: DateUtil.format(eddt, 'yyyy-MM-dd'),
            },
            {
              param: '신청인원',
              value: groupByWondo[wondoCoid].length.toString(),
            },
          ];
          await this.kakaoTalkBiz.sendTalks({ tokenInfo, kakaoIdx, phones, params, scdId, msgIdx });
        }
      }
    }
  }

    // 온라인일반교육 원청사납부 총 인원 전송
    async sendNormalOnlineTotalPersonnel(kakaoIdx: string) {
      const msgIdx = 'totCnt'
      const scdId = Number(DateUtil.format(new Date(), 'yyyyMMdd'));
      const checkDay = new Date().getDay() === 5 ? 3 : 1;
      // 오늘날짜의 온라인 교육 리스트
      const courses = await this.toCourseScd
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.reqs', 'req')
        .where({
          trt: In(['5']),
        })
        .andWhere(`req.WONDO_COID != req.COOP_COID`)
        .andWhere(`"course".DANDOK_YN = 'Y'`)
        .andWhere(`course.stdt = ( TRUNC(SYSDATE) + :checkDay )`, { checkDay })
        .getMany();
  
      // 토큰 가져오기
      const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
      if (courses.length > 0) {
        const { stdt } = courses[0];
        const groupByWondo = courses.reduce((map, value) => {
          value.reqs.forEach((req) => {
            (map[req.wondoCoid] = map[req.wondoCoid] ?? []).push(req);
          });
          return map;
        }, {} as { [key: string]: ToPtptReq[] });
  
        for await (const wondoCoid of Object.keys(groupByWondo)) {
          const managers = await this.managerList({ coid: Number(wondoCoid), srvId: 'COOP' });
          // 핸드폰번호가 있는 인원만
          const phones = managers
            .map((manager) => (manager.mp ?? manager.ownerPhone ?? '').replace(/[^0-9]/g, ''))
            .filter((str) => !!str);
          if (phones.length > 0) {
            const params = [
              {
                param: '원청사명',
                value: managers[0].conm,
              },
              {
                param: '교육참석일자',
                value: DateUtil.format(stdt, 'yyyy-MM-dd'),
              },
              {
                param: '신청인원',
                value: groupByWondo[wondoCoid].length.toString(),
              },
            ];
            await this.kakaoTalkBiz.sendTalks({ tokenInfo, kakaoIdx, phones, params, scdId, msgIdx });
          }
        }
      }
    }

  // 온라인 가입증명원, 통장사본, 전자서명 독려 전송
  async notOnlineUploadDoc() {
    const checkDay = 4;
    const coops: {
      SCD_ID: number;
      COID: number;
      NOT_UPLOAD_DOC: string;
    }[] = await this.manager.query(notOnlineUploadDocQuery, [checkDay]);
    const msgIdx = 'upload';

    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');

    await Promise.all(
      coops.map(async (coop) => {
        const students = await this.toPtptReq
          .createQueryBuilder('req')
          .select('req.SCD_ID','scdId')
          .addSelect('WONDO_COID', 'wondoCoid')
          .addSelect('COOP_COID', 'coopCoid')
          .addSelect('GET_CONM(WONDO_COID)', 'wondoConm')
          .addSelect('GET_CONM(COOP_COID)', 'coopConm')
          .addSelect('NAME', 'name')
          .addSelect('MP', 'mp')
          .addSelect('"course".stdt', 'stdt')
          .addSelect('"course".dandokYn', 'dandokYn')
          .innerJoin('req.course', 'course')
          .where({ scdId: coop.SCD_ID, coopCoid: coop.COID })
          .getRawMany<{
            scdId:number;
            wondoCoid: number;
            coopCoid: number;
            wondoConm: string;
            coopConm: string;
            name: string;
            mp: string;
            stdt: Date;
            dandokYn : string;
          }>();
        await Promise.all(
          students.map(async ({ scdId, wondoConm, coopConm, name, stdt, mp , dandokYn }) => {
            const notOnlineUploadDoc = coop.NOT_UPLOAD_DOC;
            await this.kakaoTalkBiz.sendTalks({
              kakaoIdx : dandokYn == 'Y' ? 'econ_auto-message_018' : 'econ_auto-message_005',
              phones: [mp.replace(/[^0-9]/g, '')],
              tokenInfo,
              msgIdx,
              scdId,
              params: [
                {
                  param: '원청사명',
                  value: wondoConm,
                },
                {
                  param: '협력사명',
                  value: coopConm,
                },
                {
                  param: '참가자명',
                  value: name,
                },
                {
                  param: '교육참석일자',
                  value: DateUtil.format(stdt, 'yyyy-MM-dd'),
                },
                {
                  param: '[미업로드건]',
                  value: notOnlineUploadDoc,
                },
                {
                  param: '미업로드건',
                  value: notOnlineUploadDoc,
                },
              ],
            });
          }),
        );
      }),
    );
  }

  // 온라인 입금 독려
  async notOnlineDeposit(kakaoIdx: string) {
    const msgIdx = 'ondepo';
   const checkDay = 4  ;
    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');

    const students = await this.toPtptReq
      .createQueryBuilder('req')
      .select('req.scdId','scdId')
      .innerJoinAndSelect('req.course', 'course')
      .leftJoinAndSelect('req.wondo', 'wondo')
      .leftJoinAndSelect('req.coop', 'coop')
      .where({
        sts: '1',
      })
      .andWhere(`course.scdId NOT IN (:...scdIds)`, {
        scdIds: [
          '8914',
          '8974',
          '8975',
          '8575',
          '8853',
          '8996',
          '8997',
          '8998',
          '8999',
          '9005',
          '9010',
          '9016',
          '9015',
          '9018',
          '9020',
          '9632'
        ],
      })
      .andWhere(`"course".DANDOK_YN = 'N'`)
      .andWhere(`course.trt IN ('3', '4')`)
      .andWhere(`course.sts < '9'`)
      .andWhere(`course.stdt = ( TRUNC(SYSDATE) + :checkDay )`, { checkDay})
      .getMany();

    await Promise.all(
      students.map(async ({ scdId ,wondo, coop, course, name, mp }) => {
        await this.kakaoTalkBiz.sendTalks({
          kakaoIdx,
          phones: [mp],
          tokenInfo,
          msgIdx,
          scdId,
          params: [
            {
              param: '원청사명',
              value: wondo.conm,
            },
            {
              param: '협력사명',
              value: coop.conm,
            },
            {
              param: '참가자명',
              value: name,
            },
            {
              param: '교육참석일자',
              value: DateUtil.format(course.stdt, 'yyyy-MM-dd'),
            },
          ],
        });
      }),
    );
  }

  // 일반과정 입금 독려
  async notNormalDeposit(kakaoIdx: string) {
    const msgIdx = 'normal';
    const scdId = Number(DateUtil.format(new Date(), 'yyyyMMdd'));
    const checkDay = new Date().getDay() === 5 ? 3 : 1;
    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    const students = await this.toPtptReq
      .createQueryBuilder('req')
      .innerJoinAndSelect('req.course', 'course')
      .where({
        sts: '1',
      })
      .andWhere(`course.trt = '2'`)
      .andWhere(`course.sts < '9'`)
      .andWhere(`course.stdt = ( TRUNC(SYSDATE) + :checkDay )`, { checkDay })
      .getMany();

    const groupByWondo = students.reduce((map, student) => {
      (map[student.wondoCoid] = map[student.wondoCoid] ?? []).push(student);
      return map;
    }, {} as { [key: string]: ToPtptReq[] });

    await Promise.all(
      Object.keys(groupByWondo).map(async (coid) => {
        const managers = await this.managerList({ coid: Number(coid), srvId: 'COOP' });
        // 핸드폰번호가 있는 인원만
        const phones = managers
          .map((manager) => (manager.mp ?? manager.ownerPhone ?? '').replace(/[^0-9]/g, ''))
          .filter((str) => !!str);
        const stdt = groupByWondo[coid][0].course.stdt;
        if (phones.length > 0) {
          const params = [
            {
              param: '원청사명',
              value: managers[0].conm,
            },
            {
              param: '교육참석일자',
              value: DateUtil.format(stdt, 'yyyy-MM-dd'),
            },
          ];

          await this.kakaoTalkBiz.sendTalks({ tokenInfo, kakaoIdx, phones, params ,scdId, msgIdx});
        }
      }),
    );
  }
  // 온라인교육 원도 납부 과정 입금독려
  async notOnlinePayByWondo(kakaoIdx: string) {
    const scdId = Number(DateUtil.format(new Date(), 'yyyyMMdd'));
    const msgIdx = 'wondo';
    const checkDay = 4;
    // 해당날짜의 온라인 교육 리스트
    const courses = await this.toCourseScd
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.reqs', 'req')
      .where({
        trt: In(['3', '4']),
      })
      .andWhere(`course.scdId NOT IN (:...scdIds)`, {
        // 요청에의한 4월 4일 현대엔지니어링 과정 독려 미발송
        scdIds: [
          '9405',
          '9406',
          '9632'
        ],
      })
      .andWhere(`req.sts= '1'`)
      // .andWhere(`req.WONDO_COID != req.COOP_COID`)
      .andWhere(`"course".DANDOK_YN = 'Y'`)
      .andWhere(`course.stdt = ( TRUNC(SYSDATE) + :checkDay )`, { checkDay })
      .getMany();

    // 토큰 가져오기
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');
    if (courses.length > 0) {
      const { stdt } = courses[0];
      const groupByWondo = courses.reduce((map, value) => {
        value.reqs.forEach((req) => {
          (map[req.wondoCoid] = map[req.wondoCoid] ?? []).push(req);
        });
        return map;
      }, {} as { [key: string]: ToPtptReq[] });

      for await (const wondoCoid of Object.keys(groupByWondo)) {
        const managers = await this.managerList({ coid: Number(wondoCoid), srvId: 'COOP' });
        // 핸드폰번호가 있는 인원만
        const phones = managers
          .map((manager) => (manager.mp ?? manager.ownerPhone ?? '').replace(/[^0-9]/g, ''))
          .filter((str) => !!str);
        if (phones.length > 0) {
          // 교육비 세팅(신청인원 중 미납자수 * 교육비 )
          const totalpriceNum = groupByWondo[wondoCoid].length * 50000;
          const totalprice = totalpriceNum.toString()+'원';
          const params = [
            {
              param: '원청사명',
              value: managers[0].conm,
            },
            {
              param: '학습시작일',
              value: DateUtil.format(stdt, 'yyyy-MM-dd'),
            },
            {
              param: '신청인원',
              value: groupByWondo[wondoCoid].length.toString(),
            },
            {
              param: '교육비',
              value: totalprice,
            },
          ];
          await this.kakaoTalkBiz.sendTalks({ tokenInfo, kakaoIdx, phones, msgIdx, params, scdId });
        }
      }
    }
  }

  // 집체일반과정 교육참석 알림 
  async sendAttendNormal(kakaoIdx: string) {
    const msgIdx = 'att';
    const checkDay = 4;
    const tokenInfo = await this.kakaoTalkBiz.getTokenByServiceId('ECON2');

    const students = await this.manager
    .createQueryBuilder()
    .select('"req".SCD_ID','scdId')
    .addSelect('WONDO_COID', 'wondoCoid')
    .addSelect('COOP_COID', 'coopCoid')
    .addSelect('GET_CONM(WONDO_COID)', 'wondoConm')
    .addSelect('GET_CONM(COOP_COID)', 'coopConm')
    .addSelect('NAME', 'name')
    .addSelect('MP', 'mp')
    .addSelect('"course".stdt', 'stdt')
    .addSelect('"place".PLACE_NM','placeNm')
    .from('TO_PTPT_REQ','req')
    .innerJoin('TO_COURSE_SCD', 'course','"req".SCD_ID = "course".SCD_ID')
    .innerJoin('TO_PLACE', 'place', '"course".PLACE_ID = "place".PLACE_ID')
    .where(`course.trt = '2'`)
    .andWhere(`course.sts < '9'`)
    .andWhere(`course.stdt = ( TRUNC(SYSDATE) + :checkDay )`, { checkDay})
    .getRawMany<{
      scdId: number;
      wondoCoid: number;
      coopCoid: number;
      wondoConm: string;
      coopConm: string;
      placeNm : string;
      name: string;
      mp: string;
      stdt: Date;
    }>();

    await Promise.all(
      students.map(async ({ scdId ,wondoConm, coopConm, stdt, name, mp , placeNm }) => {
        await this.kakaoTalkBiz.sendTalks({
          kakaoIdx,
          phones: [mp],
          tokenInfo,
          msgIdx,
          scdId,
          params: [
            {
              param: '원청사명',
              value: wondoConm,
            },
            {
              param: '협력사명',
              value: coopConm,
            },
            {
              param: '참가자명',
              value: name,
            },
            {
              param: '교육참석일자',
              value: DateUtil.format(stdt, 'yyyy-MM-dd'),
            },
            {
              param: '장소',
              value: placeNm,
            },
          ],
        });
      }),
    );
  }

  // 강습회 접수시작일 상태 변경
  async conferenceSts() {
    // 강습회 과정 접수시작일 조회
    const units = await this.tcConferenceUnit
      .createQueryBuilder('unit')
      .where(`unit.startlineDt IS NOT NULL`)
      .andWhere(`TRUNC(unit.startlineDt) = TRUNC(SYSDATE)`)
      .getMany();

    // 오늘날짜와 같은게 있다면, 상태 접수로 변경
    const sts = '0'; // 0:접수, 1:마감
    await Promise.all(
      units.map(async ({ conferenceUnitId }) => {
        await this.tcConferenceUnit.update(conferenceUnitId, { status: sts });
      }),
    );
  }
}
