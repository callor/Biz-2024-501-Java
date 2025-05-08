import { Role } from '@modules/auth/decorator/role.decorator';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { SecurityUtil } from '@utils/security.util';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserBiz } from './user.biz';
import { FastifyRequest } from 'fastify';

@Controller('user')
export class UserAction {
  constructor(private readonly userBiz: UserBiz) {}

  // 아이디 중복 체크
  @Role(ROLE_TYPE.PUBLIC)
  @Get('check/:loginId')
  async checkLoginId(@Param('loginId') loginId: string) {
    if (!loginId) {
      throw new BadRequestException();
    }
    const user = await this.userBiz.getUserByLoginId(loginId);
    // 사용자가 없을 경우 true
    return typeof user === 'undefined';
  }

  // 회원가입
  @Role(ROLE_TYPE.PUBLIC)
  @Post('signUp')
  async signUp(@Body() createUserDTO: CreateUserDTO) {
    return await this.userBiz.signUp(createUserDTO);
  }

  // 회원탈퇴
  @Delete()
  async deleteAccount(@Request() req: FastifyRequest) {
    const user = req.user;
    await this.userBiz.delete(user.userId);
  }

  // 자신의 프로필 조회
  @Get('info')
  async info(@Request() req: FastifyRequest) {
    const { member, loginId } = await this.userBiz.getUserInfo(req.user.userId);
    const agree = member.agrees[member.agrees.length - 1];
    return { loginId, ...member, notifyYn: agree.agreeYn };
  }

  @Get('info/:mobile')
  async infoByMobile(@Param('mobile') mobile: string) {
    if (!mobile) {
      throw new BadRequestException();
    }
    mobile = mobile.replace(/-/g, '');
    const members = await this.userBiz.searchMember({ mobile });
    return members;
  }

  // 프로필 수정
  @Put('info')
  async updateMemberData(@Request() req: FastifyRequest, @Body() userDTO: UpdateUserDTO) {
    userDTO.userId = req.user.userId;
    await this.userBiz.changeInfo(userDTO);
  }

  @Put('device')
  async updateDevice(@Request() req: FastifyRequest, @Body() userDTO: UpdateUserDTO) {
    userDTO.userId = req.user.userId;
    await this.userBiz.saveDevice(userDTO);
  }

  // 아이디 찾기
  @Role(ROLE_TYPE.PUBLIC)
  @Post('find/id')
  async findId(@Body() findDTO: FindUserDTO) {
    if (findDTO.certMsg && findDTO.sno) {
      const loginIds = await this.userBiz.findLoginId(findDTO);
      return loginIds;
    } else {
      throw new BadRequestException();
    }
  }

  // 비밀번호 찾기
  @Role(ROLE_TYPE.PUBLIC)
  @Post('find/pw')
  async findPw(@Body() findDTO: FindUserDTO) {
    if (findDTO.certMsg && findDTO.sno && findDTO.loginId) {
      const encUserId = await this.userBiz.findLoginPw(findDTO);
      return encUserId;
    } else {
      throw new BadRequestException();
    }
  }

  // 비밀번호 찾기 수정
  @Role(ROLE_TYPE.PUBLIC)
  @Put('find/change')
  async findChange(@Body() userDTO: UpdateUserDTO) {
    if (!(userDTO.userId && userDTO.changePassword)) {
      throw new BadRequestException();
    }
    userDTO.userId = SecurityUtil.aes128Decrypt(userDTO.userId);
    await this.userBiz.changePwByFind(userDTO);
  }
}
