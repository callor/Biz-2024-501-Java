import { Role } from '@modules/auth/decorator/role.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_TYPE } from '@utils/constants';
import { MessageDTO } from './dto/message.dto';
import { MessageBiz } from './message.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('intranet/send')
export class MessageAction {
  constructor(private readonly messageBiz: MessageBiz) {}

  @Post('msg')
  async sendMsg(@Body() body: MessageDTO) {
    await this.messageBiz.send(body);
  }
}
