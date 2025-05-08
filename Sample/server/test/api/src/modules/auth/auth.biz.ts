import config from '@config';
import { IcAuthenticate } from '@entities/ade100/common/ic-authenticate.entity';
import { IcRole } from '@entities/ade100/common/ic-role.entity';
import { IcUsrRole } from '@entities/ade100/common/ic-usr-role.entity';
import { UserBiz } from '@modules/user/user.biz';
import { BadRequestException, UnauthorizedException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SERVICE } from '@utils/constants';
import { SecurityUtil } from '@utils/security.util';
import { addDays } from 'date-fns';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { Payload } from './strategies/jwt.strategy';

@Injectable()
export class AuthBiz {
  constructor(
    private readonly jwtSerivce: JwtService,
    @Inject(forwardRef(() => UserBiz))
    private readonly userBiz: UserBiz,
    @InjectRepository(IcAuthenticate)
    private readonly icAuthenticate: Repository<IcAuthenticate>,
    @InjectRepository(IcUsrRole)
    private readonly icUsrRole: Repository<IcUsrRole>,
    @InjectRepository(IcRole)
    private readonly icRole: Repository<IcRole>,
  ) {}

  checkApikey(clientApikey: string) {
    return config.apikey === clientApikey;
  }

  async signIn(loginDTO: LoginDTO) {
    const user = await this.userBiz.getUserByLoginId(loginDTO.id);

    if (user && user.password === SecurityUtil.sha256Encrypt(loginDTO.pw)) {
      const { member } = await this.userBiz.getUserInfo(user.userId);
      const authId = SecurityUtil.getShortUUID();
      await this.icAuthenticate.insert({
        authId,
        name: member.kornm,
        passwd: user.password,
        expiredDt: addDays(new Date(), 3),
      });
      const payload = {
        ui: authId,
        uc: SecurityUtil.aes128Encrypt(user.userId),
        k: SecurityUtil.aes128Encrypt(user.password),
      };
      return this.jwtSerivce.sign(payload);
    } else {
      throw new BadRequestException('아이디 또는 패스워드가 맞지않습니다.');
    }
  }

  async signOut(authId: string) {
    await this.icAuthenticate.delete(authId);
  }

  async checkJwt(payload: Payload) {
    const query = {
      authId: payload.ui,
      passwd: SecurityUtil.aes128Decrypt(payload.k),
      expiredDt: MoreThanOrEqual(new Date()),
    };
    const userId = SecurityUtil.aes128Decrypt(payload.uc);
    const user = await this.userBiz.getUser(userId);
    const data = (await this.icAuthenticate.find(query))[0];
    if (data && user?.password === query.passwd) {
      await this.icAuthenticate.update(query.authId, { expiredDt: addDays(new Date(), 3) });
    } else {
      throw new UnauthorizedException('Token Expired');
    }
  }

  async checkAdmin(userId: string, serviceId = SERVICE.DIARY) {
    const minRoleLv = 90;

    const roles = await this.icRole.find({ roleLv: MoreThanOrEqual(minRoleLv) });
    const roleIds = roles.map((role) => role.roleId);

    const adminData = await this.icUsrRole.find({ serviceId, userId, roleId: In(roleIds) });
    if (adminData.length > 0) {
      return adminData;
    } else {
      // 접근 권한이 부족합니다.
      throw new UnauthorizedException('접근 권한 부족');
    }
  }
}
