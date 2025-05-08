import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES } from '@utils/constants';
import { FastifyRequest } from 'fastify';
import { AuthBiz } from '../auth.biz';
import { ROLE_TYPE } from './../../../utils/constants';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly authBiz: AuthBiz) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Request 객체 가져오기
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const clientApikey = request.headers['apikey'] as string;

    // 권한 사용 여부 확인
    const role =
      this.reflector.get<ROLE_TYPE>(ROLES, context.getHandler()) ??
      this.reflector.get<ROLE_TYPE>(ROLES, context.getClass());

    // 퍼블릭의 경우
    if (role === ROLE_TYPE.PUBLIC) {
      return new Promise(async (resolve) => {
        // Public 이더라도 회원 체크 가능하도록
        const user = await this.authBiz.checkJwtByToken(request.headers.authorization);
        request.user = user;
        resolve(true);
      }) as Promise<boolean>;
    }
    if (role === ROLE_TYPE.COMMON_CALENDAR) {
      return new Promise(async (resolve) => {
        // Public 이더라도 회원 체크 가능하도록
        const user = await this.authBiz.checkJwtByToken(request.headers.authorization);
        request.user = user;
        if (!user) {
          const { calendarId } = request.params as { calendarId: string };
          const isCommonCalendar = await this.authBiz.checkCommonCalendar(calendarId);
          resolve(isCommonCalendar);
        } else {
          resolve(true);
        }
      }) as Promise<boolean>;
    }
    // APIKEY인 경우
    if (role === ROLE_TYPE.APIKEY && clientApikey) {
      if (this.authBiz.checkApikey(clientApikey)) {
        return true;
      } else {
        throw new HttpException('키가 맞지 않습니다.', HttpStatus.FORBIDDEN);
      }
    }

    // 나머지의 경우 JWT Check
    return super.canActivate(context);
  }
}
