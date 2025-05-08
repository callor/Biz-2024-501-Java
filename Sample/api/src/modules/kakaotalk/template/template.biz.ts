import { IcKakaoBtn } from '@entities/ade100/common/ic-kakao-btn.entity';
import { IcKakaoMessage } from '@entities/ade100/common/ic-kakao-message.entity';
import LoggerService from '@modules/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtil } from '@utils/security.util';
import { Connection, Repository } from 'typeorm';
import { CreateKakaoMessageDTO } from './dto/create-kakao-message.dto';
import { UpdateKakaoMessageDTO } from './dto/update-kakao-message.dto';

@Injectable()
export class TemplateBiz {
  constructor(
    @InjectRepository(IcKakaoMessage) private readonly icKakaoMessage: Repository<IcKakaoMessage>,
    @InjectRepository(IcKakaoBtn) private readonly icKakaoBtn: Repository<IcKakaoBtn>,
    private readonly connection: Connection,
    private readonly logger: LoggerService,
  ) {}

  async insertTemplate({name, kakaoIdx, ...messageDTO}: CreateKakaoMessageDTO) {
    const isExist = this.icKakaoMessage.find({where:[{name},{kakaoIdx}]});
    // if(!isExist){
      await this.connection.transaction(async (manager) => {
        const icKakaoMessage = this.icKakaoMessage.create({name, kakaoIdx, ...messageDTO, messageId: SecurityUtil.getShortUUID() });
        await manager.insert(IcKakaoMessage, icKakaoMessage);
  
        messageDTO.btns &&
          messageDTO.btns.map(async (btn, idx) => {
            const icKakaoBtn = this.icKakaoBtn.create({
              ...btn,
              serviceId: icKakaoMessage.serviceId,
              messageId: icKakaoMessage.messageId,
              sno: idx,
            });
            await manager.insert(IcKakaoBtn, icKakaoBtn);
          });
      });
      return "S"
    // }else{
      // return "F"
    // }
  }

  async updateTemplate(messageDTO: UpdateKakaoMessageDTO) {
    await this.connection.transaction(async (manager) => {
      const icKakaoMessage = this.icKakaoMessage.create({ ...messageDTO, btns: undefined });
      await manager.update(IcKakaoMessage, { messageId: icKakaoMessage.messageId }, icKakaoMessage);
      await manager.delete(IcKakaoBtn, { messageId: icKakaoMessage.messageId });
      messageDTO.btns &&
        messageDTO.btns.map(async (btn, idx) => {
          const icKakaoBtn = this.icKakaoBtn.create({
            ...btn,
            serviceId: icKakaoMessage.serviceId,
            messageId: icKakaoMessage.messageId,
            sno: idx,
          });
          await manager.insert(IcKakaoBtn, icKakaoBtn);
        });
    });
  }

  async deleteTemplate(messageId: string) {
    await this.icKakaoMessage.delete(messageId);
    await this.icKakaoBtn.delete(messageId);
  }

  async getTemplateBySmsType(smsType) {
    // 메시지 조회
    let kakaoIdxs = [];
    switch (smsType) {
      case '1': // 가입증명원 독려문자
        kakaoIdxs = ['econ_manager-message_006'];
        break;
      case '2': // 서명 독려문자
        kakaoIdxs = ['econ_manager-message_007', 'econ_manager-message_008'];
        break;
      case '3': // 통장사본 독려문자
        kakaoIdxs = ['econ_manager-message_003'];
        break;
      case '4':
        break;
      case '5': // 입금 독려문자
        kakaoIdxs = ['econ_manager-message_004', 'econ_manager-message_005'];
        break;
      case '11': // 임원과정 변경문자
        kakaoIdxs = ['econ_manager-message_001'];
        break;
      case '12': // 환급과정 변경문자
        kakaoIdxs = ['econ_manager-message_002'];
        break;
      case '14': // 일반과정 변경문자
        kakaoIdxs = ['econ_manager-message_014'];
        break;  
    }

    let result = [];
    await Promise.all(
      kakaoIdxs?.map(async (kakaoIdx) => {
        result.push(await this.getTemplate(kakaoIdx));
      }),
    );
    return result;
  }

  async getTemplate(kakaoIdx) {
    const data = await this.icKakaoMessage.find({ where: { kakaoIdx }, relations: ['btns'] });
    return data;
  }

  async getTemplateList() {
    const list = await this.icKakaoMessage.find({ relations: ['btns'] });
    return list;
  }
}
