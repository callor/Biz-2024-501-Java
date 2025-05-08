import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '@utils/constants';
import { AuthBiz } from '../auth.biz';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authBiz: AuthBiz) {}

  async canActivate(context: ExecutionContext) {
    const user = context.switchToHttp().getRequest<FastifyRequest>().user;

    const role = this.reflector.get(ROLES, context.getHandler()) ?? this.reflector.get(ROLES, context.getClass());

    if (!user) {
      throw (new UnauthorizedException(), '권한 오류');
    }

    if (role) {
    }
    const adminRoles = await this.authBiz.checkAdmin(user.userId);
    if (adminRoles.length > 0) {
      return true;
    } else {
      throw (new UnauthorizedException(), '접근 권한 부족');
    }
  }
}
