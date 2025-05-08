import { SecurityUtil } from '@utils/security.util';
import { AuthBiz } from '@modules/auth/auth.biz';
import config from '@config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export type Payload = {
  kornm: string;
  ui: string;
  uc: string;
  k: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authBiz: AuthBiz) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey,
    } as StrategyOptions);
  }

  async validate(payload: Payload) {
    await this.authBiz.checkJwt(payload);
    return { authId: payload.ui, userId: SecurityUtil.aes128Decrypt(payload.uc) };
  }
}
