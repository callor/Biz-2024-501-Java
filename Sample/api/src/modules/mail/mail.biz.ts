import config from '@config';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { MailDTO } from './dto/mail.dto';

@Injectable()
export class MailBiz {
  private readonly transporter = nodemailer.createTransport(
    smtpTransport({
      service: config.mail.service,
      host: config.mail.host,
      auth: {
        user: config.mail.auth.user,
        pass: config.mail.auth.pass,
      },
    }),
  );
  private readonly defaultOption = {
    from: config.mail.from,
  };
  constructor(private readonly logger: LoggerService) {}

  async sendMail(mail: MailDTO) {
    try {
      this.logger.log(`SEND MAIL :: [${mail.to}] => [${mail.text ?? mail.html}]`);
      await this.transporter.sendMail({ ...this.defaultOption, ...mail });
    } catch (error) {
      throw error;
    }
  }
}
