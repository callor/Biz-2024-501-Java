import { IcAlrm } from '@entities/ade100/common/ic-alrm.entity';
import { IcMemberDevice } from '@entities/ade100/common/ic-member-device.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlrmAction } from './alrm.action';
import { AlrmBiz } from './alrm.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IcAlrm, IcMemberDevice])],
  controllers: [AlrmAction],
  providers: [AlrmBiz],
  exports: [AlrmBiz],
})
export class AlrmModule {}
