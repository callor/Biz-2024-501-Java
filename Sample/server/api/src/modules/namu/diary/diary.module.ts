import { DiaryCompany } from '@entities/namu/diaryCompany.entity';
import { KmsComservice } from '@entities/sg100loc/service/kms-comservice.entity';
import { KmsMember } from '@entities/sg100loc/user/kms-member.entity';
import { SgCompany } from '@entities/sg100/company/sg-company.entity';
import { TcEmp } from '@entities/sgn2/user/tc-emp.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NAMU, SG100, SG100LOC, SGN2 } from '@utils/constants';
import { DiaryCompanyAction } from './diary.action';
import { DiaryCompanyBiz } from './diary.biz';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryCompany], NAMU),
    TypeOrmModule.forFeature([KmsComservice, KmsMember], SG100LOC),
    TypeOrmModule.forFeature([TcEmp], SGN2),
    TypeOrmModule.forFeature([SgCompany], SG100),
  ],
  controllers: [DiaryCompanyAction],
  providers: [DiaryCompanyBiz],
  exports: [DiaryCompanyBiz],
})
export class DiaryCompanyModule {}
