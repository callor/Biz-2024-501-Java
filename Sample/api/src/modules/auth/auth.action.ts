import { Body, Controller, Delete, Patch, Post, Request } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { FastifyRequest } from 'fastify';
import { AuthBiz } from './auth.biz';
import { Role } from './decorator/role.decorator';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';

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

  @Patch('token')
  async tokenUpdate(@Request() req: FastifyRequest, @Body() dto: TokenDTO) {
    const { userId, authId } = req.user;
    dto.userId = userId;
    dto.authId = authId;
    await this.authBiz.patchToken(dto);
  }
}
