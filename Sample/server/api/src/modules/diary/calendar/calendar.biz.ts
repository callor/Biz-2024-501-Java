import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdCalendar } from '@entities/ade100/diary/id-calendar.entity';
import { IdCommonCalendar } from '@entities/ade100/diary/id-common-calendar.entity';
import { AlrmBiz as UserAlrmBiz } from '@modules/alrm/alrm.biz';
import { UserBiz } from '@modules/user/user.biz';
import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ALRM_TYPE, CALENDAR_INVITE_TITLE } from '@utils/constants';
import { SecurityUtil } from '@utils/security.util';
import { StringUtils } from '@utils/string.utils';
import { Connection, In, IsNull, Not, Repository } from 'typeorm';
import { CreateCalendarDTO } from './dto/create-calendar.dto';
import { InviteCalendarDTO } from './dto/invite-calendar.dto';
import { SearchCalendarDTO } from './dto/search-calendar.dto';
import { UpdateCalendarDTO } from './dto/update-calendar.dto';
import { EventBiz } from './event/event.biz';

@Injectable()
export class CalendarBiz {
  constructor(
    @InjectRepository(IdCalendar)
    private readonly idCalendar: Repository<IdCalendar>,
    @InjectRepository(IdCalendarUsr)
    private readonly idCalendarUsr: Repository<IdCalendarUsr>,
    @InjectRepository(IdCommonCalendar)
    private readonly idCommonCalendar: Repository<IdCommonCalendar>,
    private readonly connection: Connection,
    private readonly userAlrmBiz: UserAlrmBiz,
    @Inject(forwardRef(() => UserBiz))
    private readonly userBiz: UserBiz,
    private readonly eventBiz: EventBiz,
  ) {}

  private createSendMessage = ({ kornm, loginId, calendarNm }) =>
    `<strong>${kornm}</strong>(${StringUtils.lastMasking(
      loginId,
    )})님이 [<strong>${calendarNm}</strong>]에 초대했습니다`;

  private createLeaveMessage = ({ calendarNm, kornm, loginId }) =>
    `<strong>${kornm}</strong>(${StringUtils.lastMasking(
      loginId,
    )})님이 [<strong>${calendarNm}</strong>]에서 탈퇴했습니다`;

  // 캘린더 불러오기
  async getCalendars(search: SearchCalendarDTO) {
    return await this.idCalendarUsr.find({
      where: { ...search, inviteYn: IsNull() },
      relations: ['calendar'],
      order: { lv: 'DESC', regdt: 'ASC' },
    });
  }
  async getCommonCalendar() {
    return (await this.idCommonCalendar.find({ where: { useYn: 'Y' }, relations: ['calendar'] })).map(
      ({ calendar }) => calendar,
    );
  }

  // 캘린더 생성
  async createCalendar(createCalendarDTO: CreateCalendarDTO) {
    const calendarId = SecurityUtil.getShortUUID();
    // 최초 생성시 9로 고정
    const lv = 9;
    const useYn = 'Y';

    await this.connection.transaction(async (manager) => {
      const insertCalendar = this.idCalendar.create({ ...createCalendarDTO, calendarId });
      const insertCalendarUsr = this.idCalendarUsr.create({ ...createCalendarDTO, lv, useYn, calendarId });
      await manager.insert(IdCalendar, insertCalendar);
      await manager.insert(IdCalendarUsr, insertCalendarUsr);
    });
  }

  // 사용자 캘린더 수정
  async updateUserCalendar(calendarDTO: UpdateCalendarDTO) {
    const userCalendar = await this.getUserCalendar(calendarDTO);
    if (userCalendar) {
      await this.idCalendarUsr.update(
        { calendarId: calendarDTO.calendarId, userId: calendarDTO.userId },
        { bgColor: calendarDTO.bgColor, color: calendarDTO.color, useYn: calendarDTO.useYn, name: calendarDTO.name },
      );
    }
  }

  // 사용자 캘린더 삭제
  async deleteCalendar({ calendarId, userId }: { calendarId: string; userId: string }) {
    // 삭제
    const {
      member: { kornm },
      loginId,
    } = await this.userBiz.getUserInfo(userId);
    const calendar = await this.idCalendar.findOne(calendarId);

    // 삭제할 경우 남은 인원
    const users = await this.idCalendarUsr.find({ calendarId, userId: Not(userId) });

    const adminUsers = users.filter(({ lv }) => [5, 9].includes(lv));
    // 관리자가 없다면 error
    if (users.length - adminUsers.length > 0 && adminUsers.length === 0) {
      throw new InternalServerErrorException('남은 관리자가 존재하지 않습니다');
    }
    await this.idCalendarUsr.delete({ calendarId, userId });
    if (users.length === 0) {
      await this.idCalendar.delete(calendarId);
    }

    if (adminUsers.length > 0) {
      // 사용자 알림 전송
      await this.userAlrmBiz.sendAlrm({
        title: CALENDAR_INVITE_TITLE,
        dataId: calendar.calendarId,
        note: this.createLeaveMessage({ calendarNm: calendar.name, kornm, loginId }),
        users: adminUsers.map(({ userId }) => userId),
        type: ALRM_TYPE.LEAVE_GROUP,
      });
    }
  }

  // 캘린더 본인만 수정
  async updateMyCalendar(calendarDTO: UpdateCalendarDTO) {
    const userCalendar = await this.getUserCalendar(calendarDTO);
    if (userCalendar) {
      await this.idCalendarUsr.update({ calendarId: calendarDTO.calendarId, userId: calendarDTO.userId }, calendarDTO);
    }
  }

  // 캘린더 초대
  async inviteUser(calendarDTO: InviteCalendarDTO) {
    const userCalendar = await this.getUserCalendar(calendarDTO);
    // 관리자 권한 확인
    if ([5, 9].includes(userCalendar?.lv)) {
      const {
        member: { kornm },
        loginId,
      } = await this.userBiz.getUserInfo(calendarDTO.userId);

      const calendar = await this.idCalendar.findOne(calendarDTO.calendarId);

      // 넣을 목록 만들기
      const insertList = calendarDTO.userIds.map((userId) =>
        this.idCalendarUsr.create({
          ...calendar,
          userId,
          inviteYn: 'Y',
        }),
      );
      // 초대
      await this.idCalendarUsr.insert(insertList);
      // 사용자 알림 전송
      await this.userAlrmBiz.sendAlrm({
        title: CALENDAR_INVITE_TITLE,
        dataId: calendar.calendarId,
        note: this.createSendMessage({ calendarNm: calendar.name, kornm, loginId }),
        users: calendarDTO.userIds,
        type: ALRM_TYPE.INVITE_CALENDAR,
      });
    }
  }

  // 초대 업데이트
  async updateInvite({ calendarId, userId, inviteYn }: UpdateCalendarDTO) {
    await this.idCalendarUsr.update({ calendarId, userId }, { inviteYn });
  }

  // 캘린더권한 업데이트
  async updateCalendarUserLv({ calendarId, userId, lv }: UpdateCalendarDTO) {
    await this.idCalendarUsr.update({ calendarId, userId }, { lv });
  }

  // 사용자 캘린더 불러오기
  async getUserCalendar({ calendarId, userId }: { calendarId: string; userId: string }) {
    return (await this.idCalendarUsr.find({ calendarId, userId }))[0];
  }

  async deleteCalendarUser({ userId, calendarId, benId }: { userId: string; calendarId: string; benId: string }) {
    const user = await this.getUserCalendar({ calendarId, userId });
    if ([5, 9].includes(user.lv)) {
      await this.idCalendarUsr.delete({ calendarId, userId: benId });
      await this.userAlrmBiz.patchDataId({ dataId: calendarId, userId: benId });
    }
  }

  async getCalendarUsers({ calendarId, userId }: { calendarId: string; userId: string }) {
    const cnt = await this.idCalendarUsr.count({ calendarId, userId });
    if (cnt > 0) {
      const users = await this.idCalendarUsr.find({
        where: { calendarId, userId: Not(userId) },
        relations: ['user', 'user.member'],
        order: { lv: 'DESC', regdt: 'ASC' },
      });
      return users.map(({ user, lv, inviteYn }) => ({
        userId: user.userId,
        loginId: StringUtils.lastMasking(user.loginId),
        kornm: user.member.kornm,
        mobile: user.member.mobile,
        lv,
        inviteYn,
      }));
    } else {
      return [];
    }
  }
  async getCalendarAllUsers({ calendarId, userId }: { calendarId: string; userId: string }) {
    const cnt = await this.idCalendarUsr.count({ calendarId, userId });
    if (cnt > 0) {
      const users = await this.idCalendarUsr.find({
        where: { calendarId },
        relations: ['user', 'user.member'],
        order: { lv: 'DESC', regdt: 'ASC' },
      });
      return users.map(({ user, lv, inviteYn }) => ({
        userId: user.userId,
        loginId: StringUtils.lastMasking(user.loginId),
        name: user.member.kornm,
        mobile: user.member.mobile,
        lv,
        inviteYn,
      }));
    } else {
      return [];
    }
  }

  // 사용자가 사용하는 전체 캘린더 이벤트 리스트
  async getUserCalendarEvents({ userId, yyyymm }: { userId?: string; yyyymm: number }) {
    const userCalendars = userId ? await this.idCalendarUsr.find({ userId, useYn: 'Y', inviteYn: IsNull() }) : [];
    const commonCalendars = await this.getCommonCalendar();
    const calendarIds = [
      ...userCalendars.map(({ calendarId }) => calendarId),
      ...commonCalendars.map(({ calendarId }) => calendarId),
    ];
    return calendarIds.length > 0 ? await this.eventBiz.getMonthEvents({ calendarIds, yyyymm }) : [];
  }

  async getSearchList({ userId, calendarIds, search, start, end }: CalendarSearch) {
    const userCalendars = userId ? await this.idCalendarUsr.find({ userId, useYn: 'Y', inviteYn: IsNull() }) : [];
    const commonCalendars = await this.idCommonCalendar.find({ where: { useYn: 'Y' } });
    // 필터링
    const searchCalendarIds = [
      ...userCalendars.map(({ calendarId }) => calendarId),
      ...commonCalendars.map(({ calendarId }) => calendarId),
    ].filter((calendarId) => (calendarIds.length === 0 ? true : calendarIds.includes(calendarId)));

    return searchCalendarIds.length > 0
      ? await this.eventBiz.getEvents({
          calendarIds: searchCalendarIds,
          start: new Date(start),
          end: new Date(end),
          search,
        })
      : [];
  }
}
