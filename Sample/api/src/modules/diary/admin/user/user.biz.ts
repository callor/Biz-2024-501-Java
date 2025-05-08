import { IcUsr } from '@entities/ade100/common/ic-usr.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserBiz {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(IcUsr)
    private readonly icUsr: Repository<IcUsr>,
  ) {}

  async getAllUsers() {
    const users = await this.icUsr.find({
      relations: ['member'],
    });
    return users;
  }
}
