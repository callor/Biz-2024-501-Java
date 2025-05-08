import config from '@config';
import { AuthBiz } from '@modules/auth/auth.biz';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

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
    const data = await this.authBiz.checkJwt(payload);
    return data;
  }
}
