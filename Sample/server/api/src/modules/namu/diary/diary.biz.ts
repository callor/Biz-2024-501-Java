import { DiaryCompany } from '@entities/namu/diaryCompany.entity';
import { SgCompany } from '@entities/sg100/company/sg-company.entity';
import { KmsComservice } from '@entities/sg100loc/service/kms-comservice.entity';
import { KmsMember } from '@entities/sg100loc/user/kms-member.entity';
import { TcEmp } from '@entities/sgn2/user/tc-emp.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NAMU, SG100, SG100LOC, SGN2 } from '@utils/constants';
import { In, Repository } from 'typeorm';
import { CreateDiaryCompanyDTO } from './dto/create-diary.dto';

@Injectable()
export class DiaryCompanyBiz {
  constructor(
    @InjectRepository(DiaryCompany, NAMU) private diaryCompany: Repository<DiaryCompany>,
    @InjectRepository(KmsComservice, SG100LOC) private kmsComservice: Repository<KmsComservice>,
    @InjectRepository(KmsMember, SG100LOC) private kmsMember: Repository<KmsMember>,
    @InjectRepository(TcEmp, SGN2) private tcEmp: Repository<TcEmp>,
    @InjectRepository(SgCompany, SG100) private sgCompany: Repository<SgCompany>,
  ) {}

  async insertData({ ukey, coid, econYn, dyear, ...dto }: CreateDiaryCompanyDTO) {
    // 제외 사업장코드
    if ([10000000, 10000001].includes(coid)) {
      throw new BadRequestException('데모사업장이거나 하도급 사업장입니다.');
    }

    const company = await this.sgCompany.findOne(coid);

    if (!company) {
      throw new BadRequestException('사업장 정보가 존재하지 않습니다.');
    }

    const services = await this.kmsComservice.find({
      where: { coid, agencyid: 'KMS', serviceid: In(['KP', 'PORTAL']) },
    });

    if (services.length === 0) {
      throw new BadRequestException('서비스가 존재하지 않습니다.');
    }

    const kpService = services.find(({ serviceid, servicetype }) => serviceid === 'KP' && [1, 3].includes(servicetype));
    const portalService = services.find(({ serviceid }) => serviceid === 'PORTAL');
    const param = {
      coid: coid.toString(),
      dyear : dyear,
      conm: company.conm,
      bizrgno: company.bizrgno,
      ...dto,
      ukey: ukey.toString(),
      whois: '',
      requestyn: dto.requestyn == 'Y' ? 'Y' : 'N' ,
      regdt: Math.floor(Date.now() / 1000),
    };
    // 김반장 서비스가 존재하는 경우
    if (kpService && econYn !== 'Y') {
      // const member = await this.kmsMember.findOne(ukey);
      // param.loginnm = member.korname;
      param.whois = kpService.servicetype === 1 ? 'KIMUSER' : 'KIMPAYUSER';
    } else {
      if (portalService.chargeType > 10) {
        // const member = await this.tcEmp.findOne(ukey);
        // param.loginnm = member.kornm;
        param.whois = 'ECON';
      } else {
        throw new BadRequestException('신청이 불가능한 사업장입니다.');
      }
    }
    
    const isExist = (await this.diaryCompany.count({ where: { coid, dyear } })) > 0;

    if (isExist) {
      return 'F';
    } else {
      await this.diaryCompany.insert(param);
      return 'S';
    }
  }

  async checkData(coid : number, dyear : number){
    const isExist = (await this.diaryCompany.count({ where: { coid, dyear } })) > 0;

    if (isExist) {
      return 'F';
    } else {
      return 'S';
    }
  } 
}
