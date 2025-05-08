import config from '@config';
import { IcAuthenticate } from '@entities/ade100/common/ic-authenticate.entity';
import { IcRole } from '@entities/ade100/common/ic-role.entity';
import { IcUsrRole } from '@entities/ade100/common/ic-usr-role.entity';
import { IdCommonCalendar } from '@entities/ade100/diary/id-common-calendar.entity';
import { UserBiz } from '@modules/user/user.biz';
import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SERVICE } from '@utils/constants';
import DateUtil from '@utils/date.util';
import { SecurityUtil } from '@utils/security.util';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';

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
    @InjectRepository(IdCommonCalendar)
    private readonly idCommonCalendar: Repository<IdCommonCalendar>,
  ) {}

  checkApikey(clientApikey: string) {
    return config.apikey === clientApikey;
  }

  getPayload(token: string) {
    const payload = this.jwtSerivce.decode(token);
    return payload;
  }

  async signIn(loginDTO: LoginDTO) {
    const user = await this.userBiz.getUserByLoginId(loginDTO.id);
    const loginPw = loginDTO.pw.length === 64 ? loginDTO.pw : SecurityUtil.sha256Encrypt(loginDTO.pw);

    if (user && user.password === loginPw) {
      const { member } = await this.userBiz.getUserInfo(user.userId);
      const authId = SecurityUtil.getShortUUID();
      await this.icAuthenticate.insert({
        authId,
        userId: user.userId,
        name: member.kornm,
        passwd: user.password,
        expiredDt: DateUtil.addDay(new Date(), 7),
      });
      const payload = {
        ui: authId,
        k: SecurityUtil.aes128Encrypt(user.password),
      };
      return this.jwtSerivce.sign(payload);
    } else {
      throw new BadRequestException('아이디 또는 패스워드가 맞지않습니다.');
    }
  }

  async signOut(authId: string) {
    await this.icAuthenticate.delete({ authId });
  }

  async checkJwt(payload: Payload) {
    const query = {
      authId: payload.ui,
      passwd: SecurityUtil.aes128Decrypt(payload.k),
      expiredDt: MoreThanOrEqual(new Date()),
    };
    const data = (await this.icAuthenticate.find(query))[0];
    if (!data) {
      throw new UnauthorizedException('Token Expired');
    }
    const user = await this.userBiz.getUser(data.userId);

    if (user?.password === query.passwd) {
      const { authId, userId } = data;
      // 5분 이상 되었을 경우에만
      if (Date.now() - data.uptdt.getTime() > 1000 * 60 * 5) {
        await this.icAuthenticate.update({ authId, userId }, { expiredDt: DateUtil.addDay(new Date(), 7) });
      }
    } else {
      throw new UnauthorizedException('Token Expired');
    }
    return data;
  }

  async checkJwtByToken(token: string) {
    let data: { authId: string; kornm: string; userId: string };
    if (token) {
      const payload = this.getPayload(token.replace('Bearer ', '')) as Payload;
      try {
        if (payload) {
          const { authId, name: kornm, userId } = await this.checkJwt(payload);
          data = { authId, kornm, userId };
        }
      } catch {}
    }
    return data;
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

  async patchToken(tokenDTO: TokenDTO) {
    const { authId, userId, token } = tokenDTO;
    await this.icAuthenticate.update({ authId, userId }, { token });
  }

  async checkCommonCalendar(calendarId: string) {
    const cnt = await this.idCommonCalendar.count({ where: { calendarId } });
    return cnt > 0;
  }
}
