import { IcMemberAdAgree } from '@entities/ade100/common/ic-member-ad-agree.entity';
import { IcUsr } from '@entities/ade100/common/ic-usr.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthBiz } from '@modules/auth/auth.biz';
import {
  forwardRef,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IcMember } from '@entities/ade100/common/ic-member.entity';
import { Connection, Repository } from 'typeorm';
import { SecurityUtil } from '@utils/security.util';
import { SmsBiz } from '@modules/sms/sms.biz';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { StringUtils } from '@utils/string.utils';
import { IcMemberDevice } from '@entities/ade100/common/ic-member-device.entity';
import { CreateCalendarDTO } from '@modules/diary/calendar/dto/create-calendar.dto';
import { DEFAULT_BG_COLOR, DEFAULT_COLOR, DEFAULT_CALENDAR_NAME } from '@utils/constants';
import { IdCalendarUsr } from '@entities/ade100/diary/id-calendar-usr.entity';
import { IdCalendar } from '@entities/ade100/diary/id-calendar.entity';

@Injectable()
export class UserBiz {
  constructor(
    @InjectRepository(IcMember) private readonly icMember: Repository<IcMember>,
    @InjectRepository(IcUsr) private readonly icUsr: Repository<IcUsr>,
    @InjectRepository(IcMemberAdAgree) private readonly icMemberAdAgree: Repository<IcMemberAdAgree>,
    @InjectRepository(IcMemberDevice) private readonly icMemberDevice: Repository<IcMemberDevice>,
    private readonly connection: Connection,
    @Inject(forwardRef(() => AuthBiz))
    private readonly authBiz: AuthBiz,
    private readonly smsBiz: SmsBiz,
  ) {}

  // 회원가입 비즈니스
  async signUp(createUserDTO: CreateUserDTO) {
    const loginId = createUserDTO.loginId;
    // 확인
    const isCert = await this.smsBiz.certConfirmBySno({ ...createUserDTO });
    if (!isCert) {
      throw new HttpException('정상적인 접근이 아닙니다', HttpStatus.BAD_REQUEST);
    }
    // ID Count
    const idCount = await this.icUsr.count({ where: { loginId, status: '1' } });
    if (idCount === 0) {
      await this.connection
        .transaction(async (manager) => {
          // User
          const icUsr = this.icUsr.create({
            ...createUserDTO,
            userId: SecurityUtil.getShortUUID(),
            password: SecurityUtil.sha256Encrypt(createUserDTO.password),
            status: undefined,
          });

          const icMember = this.icMember.create({
            ...createUserDTO,
            userId: icUsr.userId,
            status: undefined,
            mobile: createUserDTO.mobile.replace(/[^\d]/g, ''),
          });

          const icMemberAdAgree = this.icMemberAdAgree.create({
            sno: 0,
            userId: icMember.userId,
            agreeYn: createUserDTO.agreeYn,
          });

          await manager.save(icUsr);
          await manager.save(icMember);
          await manager.save(icMemberAdAgree);

          // 캘린더 내일정 생성
          const createCalendar: CreateCalendarDTO = {
            userId: icUsr.userId,
            bgColor: DEFAULT_BG_COLOR,
            color: DEFAULT_COLOR,
            name: DEFAULT_CALENDAR_NAME,
          };
          const calendarId = SecurityUtil.getShortUUID();
          // 최초 생성시 9로 고정
          const lv = 9;
          const useYn = 'Y';

          await manager.insert(IdCalendar, { ...createCalendar, calendarId });
          await manager.insert(IdCalendarUsr, { ...createCalendar, lv, useYn, calendarId });
        })
        .catch((e) => {
          throw e;
        });

      return await this.authBiz.signIn({ id: createUserDTO.loginId, pw: createUserDTO.password });
    } else {
      throw new HttpException('아이디가 존재합니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 사용자 가져오기
  async getUser(userId: string) {
    return await this.icUsr.findOne(userId, { where: { status: '1' } });
  }
  // 사용자 가져오기 ( 로그인 아이디 )
  async getUserByLoginId(loginId: string) {
    return (await this.icUsr.find({ loginId, status: '1' }))[0];
  }
  // 사용자 삭제
  async delete(userId: string) {
    await this.connection.transaction(async (manager) => {
      // 광고 제공 동의 삭제
      await manager.delete(IcMemberAdAgree, { userId });
      // 개인정보 삭제
      await manager.delete(IcMember, userId);
      // 유저는 삭제 하지 않고 상태만 변경 한다.
      await manager.update(IcUsr, userId, { status: '0' });
    });
  }
  // 비밀번호 변경
  async changePw({ userId, password, changePassword }: UpdateUserDTO) {
    // 암호화
    password = SecurityUtil.sha256Encrypt(password);
    changePassword = SecurityUtil.sha256Encrypt(changePassword);
    // 비교 후 변경
    const result = await this.icUsr.update({ userId, password }, { password: changePassword });
    return result.raw === 1;
  }
  // 아이디 찾기
  async findLoginId(userDTO: FindUserDTO) {
    // 인증확인
    const isCert = await this.smsBiz.certConfirmBySno(userDTO);
    if (isCert) {
      const members = await this.icMember.find({
        where: { kornm: userDTO.kornm, mobile: userDTO.mobile.replace(/[^\d]/g, '') },
        relations: ['user'],
      });

      return members.map((member) => member.user.loginId);
    } else {
      throw new UnauthorizedException('권한이 없습니다.');
    }
  }
  // 비밀번호 찾기
  async findLoginPw(userDTO: FindUserDTO) {
    // 인증확인
    const isCert = await this.smsBiz.certConfirmBySno(userDTO);

    if (!isCert) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const user = await this.getUserByLoginId(userDTO.loginId);
    if (!user) {
      throw new BadRequestException('접근이 잘못되었습니다.');
    }
    // 메일은 하루 갯수제한으로 보낼수가 있어서 문자 받은 번호와 사용자 핸드폰번호 인증
    const { member } = await this.getUserInfo(user.userId);
    if (userDTO.mobile.replace(/[^\d]/g, '') !== member.mobile || userDTO.kornm !== member.kornm) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return SecurityUtil.aes128Encrypt(user.userId);
  }
  // 비밀번호 찾기를 통한 비밀번호 수정
  async changePwByFind(userDTO: UpdateUserDTO) {
    if (userDTO.userId && userDTO.changePassword) {
      userDTO.changePassword = SecurityUtil.sha256Encrypt(userDTO.changePassword);
      await this.icUsr.update(userDTO.userId, { password: userDTO.changePassword });
    }
  }
  // 사용자 정보 수정
  async changeInfo(userDTO: UpdateUserDTO) {
    const { sno, mobile, certMsg } = userDTO;
    // 인증확인
    const isCert = await this.smsBiz.certConfirmBySno({ sno, mobile, certMsg });
    if (!isCert) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    await this.connection.transaction(async (manager) => {
      // 비밀번호 수정
      if (userDTO.changePassword) {
        const updateUsrDTO = this.icUsr.create({
          password: SecurityUtil.sha256Encrypt(userDTO.changePassword),
        });
        await manager.update(IcUsr, userDTO.userId, updateUsrDTO);
      }
      // 기본정보 수정
      const updateMemberData = this.icMember.create({ ...userDTO, mobile: userDTO.mobile.replace(/[^\d]/g, '') });
      await manager.update(IcMember, userDTO.userId, updateMemberData);
      // 광고성 정보 수신 동의 수정
      const beforeAgree = await this.icMemberAdAgree.find({
        where: { userId: userDTO.userId },
        order: { sno: 'DESC' },
      });
      if (beforeAgree[0].agreeYn !== userDTO.agreeYn) {
        const insertMemberAgree = this.icMemberAdAgree.create({
          userId: userDTO.userId,
          agreeYn: userDTO.agreeYn,
          sno: beforeAgree[0].sno + 1,
        });
        await manager.insert(IcMemberAdAgree, insertMemberAgree);
      }
    });
  }
  // 사용자 정보 불러오기
  async getUserInfo(userId: string) {
    const user = await this.icUsr.findOne(userId, {
      where: { status: '1' },
      relations: ['member', 'roles', 'roles.role', 'member.agrees'],
    });
    return user;
  }

  async searchMember(search: { mobile: string }) {
    const memberList = await this.icMember.find({ where: { ...search, status: '1' }, relations: ['user'] });
    return memberList.map((member) => ({
      userId: member.userId,
      loginId: StringUtils.lastMasking(member.user.loginId),
      kornm: StringUtils.centerMasking(member.kornm),
      email: StringUtils.emailMasking(member.email),
      mobile: member.mobile,
    }));
  }

  async saveDevice({ notifyId, notifyYn, userId }: UpdateUserDTO) {
    if (!(notifyId && notifyYn)) {
      throw new InternalServerErrorException();
    }
    if ((await this.icMemberDevice.count({ userId, notifyId })) > 0) {
      await this.icMemberDevice.update({ userId, notifyId }, { notifyYn });
    } else {
      await this.icMemberDevice.insert({ userId, notifyId, notifyYn });
    }
  }
}
