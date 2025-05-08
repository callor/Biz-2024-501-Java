import { INTRANET } from './../../../utils/constants';
import { SlipReceiver } from '@entities/intranet/message/slip-receiver.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDTO } from './dto/message.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MessageBiz {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(SlipReceiver, INTRANET)
    private readonly slipReceiver: Repository<SlipReceiver>,
  ) {}

  async send(messageDTO: MessageDTO) {
    const { recvId: rmidx, sendId: smidx, title, memo } = messageDTO;
    const query = {
      rmidx,
      memo,
      smidx: smidx ?? 0,
      title: title ?? '',
      site: 'kms',
      datetime: Math.floor(new Date().getTime() / 1000),
      offeridx: 0,
      readok: 0,
      readtime: 0,
      noticeok: 0,
      status: 1,
      noticetime: 0,
    };
    this.logger.log(
      `INTRANET MESSAGE :: ${query.smidx} => ${query.rmidx} [ ${query.memo} ] `,
    );

    this.slipReceiver.insert(query);
    // await this.intranet.query('IntranetMsg.insertData', query);
  }
}
