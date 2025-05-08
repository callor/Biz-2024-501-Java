import { Role } from '@modules/auth/decorator/role.decorator';
import { Controller, Delete, Get, Param, Put, Query, Request } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { FastifyRequest } from 'fastify';
import admin from 'firebase-admin';
import { AlrmBiz } from './alrm.biz';

@Controller('alrm')
export class AlrmAction {
  constructor(private readonly alrmBiz: AlrmBiz) {}

  @Get()
  async getAlrm(@Request() req: FastifyRequest, @Query('isReadYn') isReadYn: 'Y' | 'N') {
    return await this.alrmBiz.getAlrmList({ userId: req.user.userId, isRead: isReadYn === 'Y' });
  }

  @Put('read')
  async readAlrm(@Request() req: FastifyRequest) {
    await this.alrmBiz.readAllAlrm(req.user.userId);
  }

  @Delete('invite/:dataId')
  async patchDataId(@Request() req: FastifyRequest, @Param('dataId') dataId: string) {
    await this.alrmBiz.patchDataId({ userId: req.user.userId, dataId });
  }
}
