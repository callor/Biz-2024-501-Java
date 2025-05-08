import { ROLE_TYPE } from '@utils/constants';
import { Role } from '@modules/auth/decorator/role.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CertDTO } from './dto/cert.dto';
import { SendSmsDTO } from './dto/send-sms.dto';
import { SmsBiz } from './sms.biz';

@Role(ROLE_TYPE.APIKEY)
@Controller('sms')
export class SmsAction {
  constructor(private readonly smsBiz: SmsBiz) {}

  @Post('send')
  async sendMsg(@Body() sendSmsDTO: SendSmsDTO) {
    await this.smsBiz.send(sendSmsDTO);
  }

  @Role(ROLE_TYPE.PUBLIC)
  @Post('cert')
  async sendCert(@Body() certDTO: CertDTO) {
    return await this.smsBiz.cert(certDTO);
  }

  @Role(ROLE_TYPE.PUBLIC)
  @Post('cert/confirm')
  async confirmCert(@Body() certDTO: CertDTO) {
    return await this.smsBiz.certConfirm(certDTO);
  }
}
