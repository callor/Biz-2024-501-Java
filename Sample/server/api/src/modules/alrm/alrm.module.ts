import { IcAlrm } from '@entities/ade100/common/ic-alrm.entity';
import { IcAuthenticate } from '@entities/ade100/common/ic-authenticate.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlrmAction } from './alrm.action';
import { AlrmBiz } from './alrm.biz';

@Module({
  imports: [TypeOrmModule.forFeature([IcAlrm, IcAuthenticate])],
  controllers: [AlrmAction],
  providers: [AlrmBiz],
  exports: [AlrmBiz],
})
export class AlrmModule {}
