import { ROLE_TYPE } from './../../../utils/constants';
import { ROLES } from '@utils/constants';
import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthBiz } from '../auth.biz';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly authBiz: AuthBiz) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Request 객체 가져오기
    const request = context.switchToHttp().getRequest<Request>();
    const clientApikey = request.headers['apikey'];

    // 권한 사용 여부 확인
    const role =
      this.reflector.get<ROLE_TYPE>(ROLES, context.getHandler()) ??
      this.reflector.get<ROLE_TYPE>(ROLES, context.getClass());

    // 퍼블릭의 경우
    if (role === ROLE_TYPE.PUBLIC) {
      return true;
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
