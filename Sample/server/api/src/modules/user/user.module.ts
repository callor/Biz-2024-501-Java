import { IcMember } from '@entities/ade100/common/ic-member.entity';
import { IcMemberAdAgree } from '@entities/ade100/common/ic-member-ad-agree.entity';
import { IcUsr } from '@entities/ade100/common/ic-usr.entity';
import { AuthModule } from '@modules/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAction } from './user.action';
import { UserBiz } from './user.biz';
import { SmsModule } from '@modules/sms/sms.module';
import { MailModule } from '@modules/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([IcMember, IcMemberAdAgree, IcUsr]),
    SmsModule,
    MailModule,
  ],
  controllers: [UserAction],
  providers: [UserBiz],
  exports: [UserBiz],
})
export class UserModule {}
