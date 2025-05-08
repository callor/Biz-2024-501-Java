import config from '@config';
import { IcAuthenticate } from '@entities/ade100/common/ic-authenticate.entity';
import { IcRole } from '@entities/ade100/common/ic-role.entity';
import { IcUsrRole } from '@entities/ade100/common/ic-usr-role.entity';
import { IdCommonCalendar } from '@entities/ade100/diary/id-common-calendar.entity';
import { UserModule } from '@modules/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAction } from './auth.action';
import { AuthBiz } from './auth.biz';
import { AdminGuard } from './guards/admin.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.secretKey,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([IcAuthenticate, IcUsrRole, IcRole, IdCommonCalendar]),
  ],
  controllers: [AuthAction],
  providers: [AuthBiz, JwtStrategy, AdminGuard],
  exports: [AuthBiz],
})
export class AuthModule {}
