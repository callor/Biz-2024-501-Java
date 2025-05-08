import { Controller, Get } from '@nestjs/common';
import { AdminUserBiz } from './user.biz';

@Controller('diary/admin/user')
export class AdminUserAction {
  constructor(private readonly adminUserBiz: AdminUserBiz) {}

  @Get()
  async getAllUsers() {
    return await this.adminUserBiz.getAllUsers();
  }
}
