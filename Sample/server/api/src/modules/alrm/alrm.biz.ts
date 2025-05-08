//#region Import
import { IcAlrm } from '@entities/ade100/common/ic-alrm.entity';
import { IcAuthenticate } from '@entities/ade100/common/ic-authenticate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtil } from '@utils/security.util';
import * as firebase from 'firebase-admin';
import { Connection, In, IsNull, MoreThan, Not, Repository } from 'typeorm';
import { SendAlrmDTO } from './dto/send-alrm.dto';
//#endregion
@Injectable()
export class AlrmBiz {
  constructor(
    @InjectRepository(IcAlrm)
    private readonly icAlrm: Repository<IcAlrm>,
    @InjectRepository(IcAuthenticate)
    private readonly icAuthenticate: Repository<IcAuthenticate>,
    private readonly connection: Connection,
  ) {}

  // 알림 리스트 불러오기
  async getAlrmList({ userId, isRead = false }: { userId: string; isRead?: boolean }) {
    return await this.icAlrm.find({
      where: { userId, readDt: !isRead ? IsNull() : Not(IsNull()) },
      order: { sendDt: 'DESC' },
    });
  }

  // 알림 업데이트
  async readAllAlrm(userId: string) {
    await this.icAlrm.update({ userId, readDt: IsNull() }, { readDt: new Date() });
  }

  // 알림 보내기
  async sendAlrm(sendAlrmDTO: SendAlrmDTO) {
    await this.connection.transaction(async (manager) => {
      const pushUsers = [];
      // 알림 생성
      const insertIcAlrm = this.icAlrm.create({
        ...sendAlrmDTO,
        alrmId: SecurityUtil.getShortUUID(),
        note: sendAlrmDTO.note ?? '',
      });

      await Promise.all(
        // 사용자들
        sendAlrmDTO.users.map(async (userId) => {
          pushUsers.push(userId);
          insertIcAlrm.userId = userId;
          // 알림 추가
          await manager.insert(IcAlrm, insertIcAlrm);
        }),
      );

      const sendList = await this.icAuthenticate.find({
        where: {
          userId: In(pushUsers),
          token: Not(IsNull()),
          expiredDt: MoreThan(new Date()),
        },
      });

      if (sendList.length > 0) {
        const tokens = sendList.map(({ token }) => token);

        await firebase.messaging().sendToDevice(tokens, {
          data: {
            title: sendAlrmDTO.title,
            body: sendAlrmDTO.note ?? '',
          },
        });
      }
    });
  }

  async patchDataId(dto: { dataId: string; userId: string }) {
    await this.icAlrm.update(dto, { dataId: undefined });
  }
}
