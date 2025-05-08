import { IcMember } from '@entities/ade100/common/ic-member.entity';
import { IcUsr } from '@entities/ade100/common/ic-usr.entity';
import { UserModule } from '@modules/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserAction } from './user.action';
import { AdminUserBiz } from './user.biz';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([IcUsr, IcMember])],
  controllers: [AdminUserAction],
  providers: [AdminUserBiz],
  exports: [AdminUserBiz],
})
export class AdminUserModule {}
