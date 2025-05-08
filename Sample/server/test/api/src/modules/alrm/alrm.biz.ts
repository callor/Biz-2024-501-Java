//#region Import
import { IcAlrm } from '@entities/ade100/common/ic-alrm.entity';
import { IcMemberDevice } from '@entities/ade100/common/ic-member-device.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtil } from '@utils/security.util';
import admin from 'firebase-admin';
import { Connection, In, IsNull, Not, Repository } from 'typeorm';
import { SendAlrmDTO } from './dto/send-alrm.dto';
//#endregion
@Injectable()
export class AlrmBiz {
  constructor(
    @InjectRepository(IcAlrm)
    private readonly icAlrm: Repository<IcAlrm>,
    @InjectRepository(IcMemberDevice)
    private readonly icMemberDevice: Repository<IcMemberDevice>,
    private readonly connection: Connection,
  ) {}

  private async sendTopicFcm(topicParam: FcmPushTopic) {
    await admin.messaging().send({
      ...topicParam,
      data: { ...topicParam.data, title: topicParam.notification.title, msg: topicParam.notification.body },
    });
  }

  private async sendTargetFcm(param: FcmPushTarget) {
    const messages = param.targets.map((token) => ({
      ...param,
      data: { ...param.data, title: param.notification.title, msg: param.notification.body },
      token,
    }));
    await admin.messaging().sendAll(messages);
  }

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
      const members = await this.icMemberDevice.find({ userId: In(pushUsers), notifyYn: 'Y' });
      if (members.length > 0) {
        await this.sendTargetFcm({
          notification: { title: sendAlrmDTO.title, body: sendAlrmDTO.note },
          targets: members.map((member) => member.notifyId),
        });
      }
    });
  }

  async patchDataId(dto: { dataId: string; userId: string }) {
    await this.icAlrm.update(dto, { dataId: undefined });
  }
}
