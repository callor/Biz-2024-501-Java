import { LoginDTO } from './dto/login.dto';
import { Role } from './decorator/role.decorator';
import { Body, Controller, Delete, Post, Request } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { AuthBiz } from './auth.biz';
import { FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthAction {
  constructor(private readonly authBiz: AuthBiz) {}

  @Role(ROLE_TYPE.PUBLIC)
  @Post('signIn')
  async signIn(@Body() loginDTO: LoginDTO) {
    return await this.authBiz.signIn(loginDTO);
  }

  @Delete('signOut')
  async signOut(@Request() requset: FastifyRequest) {
    const user = requset.user;
    await this.authBiz.signOut(user.authId);
  }
}
