import { BlueButton, GreyButton } from '@components/common/button';
import ButtonWrap from '@components/common/button/ButtonWrap';
import CompactColorPicker from '@components/common/colorpicker/CompactColorPicker';
import { useRootStore } from '@components/common/context/RootStore';
import Modal from '@components/common/modal';
import SettingLayout from '@components/layout/setting';
import styled from '@emotion/styled';
import { axios, serverAxios } from '@utils/network.util';
import { StringUtil } from '@utils/string.util';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorResult } from 'react-color';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimes } from 'react-icons/fa';

//#region
const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 35px;
`;
const MainWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const TableWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px 10px;
  box-sizing: border-box;
`;
const CalendarWrap = styled.div`
  width: 270px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-top: 1px solid #454545;
  box-sizing: border-box;
  float: left;
`;
const CalendarUserWrap = styled(CalendarWrap)`
  width: 600px;
  margin-left: 10px;
  overflow-y: auto;
`;
const TableTop = styled.div`
  height: 42px;
  background: #fafafa;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  > p {
    line-height: 42px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
  }
  > div {
    position: absolute;
    margin-left: 560px;
    margin-top: -30px;
    z-index: 2;
    display: flex;
    cursor: pointer;
    > svg {
      flex: 0 0 12px;
      &:hover {
        color: #1c7ed6;
      }
    }
  }
`;
const InputWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 10px 10px 12px;
  position: relative;
  > input[type='text'] {
    width: 100%;
    height: 36px;
  }
`;
const CheckBox = styled.div`
  display: inline-block;
  + div {
    margin-left: 40px;
  }
  input[type='checkbox'] {
    display: none;
    + label {
      display: inline-block;
      font-size: 14px;
      color: #454545;
      line-height: 24px;
      padding-left: 34px;
      background: url('/images/btn/btn_checkbox_no_24x24.png') left center no-repeat;
    }
    &:checked + label {
      background: url('/images/btn/btn_checkbox_yes_24x24.png') left center no-repeat;
    }
  }
`;
const ColorPicker = styled(CompactColorPicker)`
  position: relatvie;
  width: 118px;
  height: 36px;
  padding-right: 32px;
  box-sizing: border-box;
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-image: url('/images/ico/ico_color_text.png');
`;
const BgColorPicker = styled(ColorPicker)`
  margin-left: 10px;
  background-image: url('/images/ico/ico_color_bg.png');
  background-position: right 5px center;
`;
const PreviewEvent = styled.p<{ bgColor: string; color: string }>`
  width: 100%;
  line-height: 15px;
  font-size: 13px;
  padding: 3px 0 3px 10px;
  box-sizing: border-box;
  border-radius: 8px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;
const TableContent = styled.table`
  width: 600px;
  z-index: -1;
  table-layout: fixed;
  overflow-y: auto;
`;
const CalendarUserItem = styled.tr`
  height: 36px;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  td {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
    padding: 10px;

    &:nth-of-type(1) {
      white-space: pre;
      text-align: left;
    }
    &:nth-of-type(2) {
      width: 20%;
    }
    &:nth-of-type(3) {
      width: 40%;
      padding: 0px;
    }
    &:nth-of-type(4) {
      width: 10%;
      text-align: center;
      border-right: none;
      > svg {
        flex: 0 0 12px;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.grey};
        &:hover {
          color: #1c7ed6;
        }
      }
    }
  }
`;
const InviteText = styled.span`
  display: block;
  width: 100%;
  font-size: 12px;
  color: #ef8425;
  text-align: center;
`;
const LevelSelectBox = styled.select`
  width: 190px;
`;
const SettingButtonWrap = styled(ButtonWrap)`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  ${BlueButton} {
    width: 120px;
    height: 34px;
    border-radius: 5px;
  }
  ${GreyButton} {
    width: 120px;
    height: 34px;
    border-radius: 5px;
    margin-left: 10px;
  }
`;
const UserAddModal = styled(Modal)`
  width: 300px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 !important;
  border-radius: 10px;
  > header {
    background-color: #454545;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      margin: auto;
      font-weight: 500;
      font-size: 18px;
    }
  }
  > article {
    padding: 0 20 0 20;
    display: flex;
    flex-direction: column;
  }
  > footer {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 15px;
    background-color: #fafafa;
    align-self: center;
    button {
      font-size: 14px;
      font-weight: 400;
      padding: 5px 15px;
      border-radius: 4px;
      box-shadow: 0 1px 2px 1.5px #a3a3a3;
      background-color: #228be6;
      color: white;
    }
    > button + button {
      margin-left: 10px;
      background-color: white;
      color: #454545;
    }
  }
`;
const InviteBox = styled.div`
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  input {
    width: 100%;
    background: none;
    height: 36px;
  }
`;
const SearchBox = styled.div`
  position: relative;
  margin-bottom: 10px;
`;
const SearchWrap = styled.div`
  > input[type='text'] {
    width: 100%;
    height: 36px;
  }
`;
const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 36px;
  height: 36px;
  background: url('/images/ico/ico_search_black_18x18.png') center no-repeat;
  background-size: 18px;
`;
const SearchList = styled.div`
  margin-top: 5px;
  background: #fafafa;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 5px;
  box-sizing: border-box;
  table {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    table-layout: fixed;
    tr {
      border-bottom: 1px solid #eee;
      &:last-of-type {
        border-bottom: none;
      }
    }
    td {
      position: relative;
      border-right: 1px solid #eee;
      font-family: 'dotum', tahoma, 'MalgunGothic', 'Verdana', 'Arial', 'Helvetica', sans-serif;
      font-size: 12px;
      color: #454545;
      padding: 8px;
      box-sizing: border-box;
      &:last-child {
        border-right: none;
        padding-right: 20px;
      }
    }
  }
`;
const UserAddButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 3px;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 5px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white} url('/images/ico/ico_plus.png') center no-repeat;
  overflow: hidden;
`;
const UserMinusButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 3px;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 5px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white} url('/images/ico/ico_minus.png') center no-repeat;
  overflow: hidden;
`;
const InviteUserList = styled.div`
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 5px;
  box-sizing: border-box;
  margin: 10px 0;
  table {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    table-layout: fixed;
    tr {
      border-bottom: 1px solid #eee;
      td {
        position: relative;
        border-right: 1px solid #eee;
        font-family: 'dotum', tahoma, 'MalgunGothic', 'Verdana', 'Arial', 'Helvetica', sans-serif;
        font-size: 12px;
        color: #454545;
        padding: 8px;
        box-sizing: border-box;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;
//#endregion

type SearchUser = {
  userId: string;
  loginId: string;
  kornm: string;
  email: string;
  mobile: string;
};

type CalendarSettingPageProps = {
  calendar: CalendarUsr;
  calendarUsers: CalendarUsr[];
};

const SettingCalendar = ({ calendar, calendarUsers }: CalendarSettingPageProps) => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>();
  const rootStore = useRootStore();
  const [searchList, setSearchList] = useState<SearchUser[]>([]);
  const [inviteList, setInviteList] = useState<SearchUser[]>([]);
  const [isAddPopShow, setAddPopShow] = useState(false);
  const [calendarColor, setCalendarColor] = useState<{
    color: string;
    bgColor: string;
  }>();
  const { register, setValue, getValues } = useForm({
    defaultValues: { name: '', color: '', bgColor: '', useYn: '' },
  });

  const getCalendarData = useCallback(() => {
    if (calendar.calendarId) {
      setCalendarColor({
        color: calendar.color,
        bgColor: calendar.bgColor,
      });
      setValue('name', calendar.name);
      setValue('useYn', calendar.useYn === 'Y' ? 'Y' : '');
      setValue('color', calendar.color);
      setValue('bgColor', calendar.bgColor);
    }
  }, [calendar, calendarUsers]);

  useEffect(() => {
    getCalendarData();
  }, [calendar, calendarUsers]);

  const onColorChange = useCallback(
    (color: ColorResult) => {
      setValue('color', color.hex);
      setCalendarColor({ color: calendarColor.color, bgColor: color.hex });
    },
    [calendarColor],
  );

  const onBgColorChange = useCallback(
    (color: ColorResult) => {
      setValue('bgColor', color.hex);
      setCalendarColor({ color: calendarColor.color, bgColor: color.hex });
    },
    [calendarColor],
  );

  const onSaveClick = useCallback(async () => {
    const { name, useYn, bgColor, color } = getValues();
    if (!name) {
      alert('그룹명을 설정 하셔야합니다.');
      return;
    }
    if (!(color && bgColor)) {
      alert('사용하실 색상을 선택 하셔야합니다.');
      return;
    }
    const calendarId = calendar.calendarId;
    const param = {
      calendarId: calendarId,
      name,
      color,
      bgColor,
      useYn: useYn ? 'Y' : 'N',
    };
    await axios.put(`/diary/calendar`, param);
    alert('수정되었습니다.');
    router.reload();
  }, [calendar.calendarId]);

  const onResetClick = useCallback(() => {
    router.reload();
  }, []);

  const onLvChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const param = {
        calendarId: calendar.calendarId,
        userId: e.target.name,
        lv: parseInt(e.target.value),
      };
      await axios.patch('/diary/calendar/lv', param);
      alert('권한이 변경되었습니다.');

      router.reload();
    },
    [calendar.calendarId],
  );

  const onDeleteMemberClick = useCallback(async (calendarId, userId) => {
    if (calendarId && userId) {
      if (rootStore.member.userId === userId && !confirm('해당 그룹에서 탈퇴하시겠습니까?')) {
        return;
      }
      if (rootStore.member.userId !== userId && !confirm('해당 그룹원을 제거하시겠습니까?')) {
        return;
      }
      try {
        await axios.delete(`/diary/calendar/${calendarId}/${userId}`);
        alert('삭제되었습니다.');
        router.reload();
      } catch (e) {
        if (e?.response?.data?.message) {
          alert(e?.response?.data?.message);
        }
      }
    }
  }, []);

  const onOpenModalClick = useCallback(() => {
    setAddPopShow(() => true);
  }, []);

  const onCloseModalClick = useCallback(() => {
    searchRef.current.value = '';
    setSearchList([]);
    setInviteList([]);
    setAddPopShow(() => false);
  }, []);

  const onSearchClick = useCallback(async () => {
    const search = searchRef.current.value;
    if (!search) {
      alert('검색하실 핸드폰 번호를 적어주세요.');
    } else {
      const { data: members } = await axios.get<SearchUser[]>(`/user/info/${search}`);
      setSearchList(
        members.filter(
          ({ userId: _userId }) =>
            !calendarUsers.some((user) => user.userId === _userId) && _userId !== calendar.userId,
        ),
      );
    }
  }, [searchRef, searchList, calendarUsers]);

  const onAddUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const userId = e.currentTarget.dataset.userId;
      setInviteList([...inviteList, searchList.find((search) => search.userId === userId)]);
    },
    [searchList, inviteList],
  );

  const onDeleteUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const deleteId = e.currentTarget.dataset.userId;
      setInviteList(inviteList.filter(({ userId }) => userId !== deleteId));
    },
    [inviteList],
  );

  const SearchUsers = useMemo(
    () =>
      searchList
        .filter(({ userId }) => !inviteList.some((invite) => invite.userId === userId))
        .map(({ userId, loginId, kornm, mobile }) => (
          <tr key={`search-user-list-${userId}`}>
            <td>{loginId}</td>
            <td>{kornm}</td>
            <td>
              {StringUtil.formatMobile(mobile)}
              <UserAddButton data-user-id={userId} onClick={onAddUserClick} />
            </td>
          </tr>
        )),
    [searchList, inviteList, calendarUsers],
  );

  const InviteUsers = useMemo(
    () =>
      inviteList.map(({ loginId, kornm, mobile, userId }) => (
        <tr key={`invite-user-list-${userId}`}>
          <td>{loginId}</td>
          <td>{kornm}</td>
          <td>
            {StringUtil.formatMobile(mobile)}
            <UserMinusButton data-user-id={userId} onClick={onDeleteUserClick} />
          </td>
        </tr>
      )),
    [inviteList],
  );

  const onInviteClick = useCallback(async () => {
    if (inviteList.length === 0) {
      alert('초대하실 유저를 선택해주세요.');
      return;
    }
    const userIds = inviteList.map(({ userId }) => userId);
    const calendarId = calendar.calendarId;
    await axios.post(`/diary/calendar/invite`, {
      calendarId,
      userIds,
    });
    alert(`${userIds.length}명 초대되었습니다.`);
    router.reload();
  }, [inviteList]);

  const CalendarUsrList = useMemo(
    () =>
      calendarUsers.map(({ userId, loginId, inviteYn, lv, name }) => (
        <CalendarUserItem key={`calendarItem-${calendar.calendarId}-${userId}`}>
          <td>
            {name}({loginId})
          </td>
          <td>{inviteYn && <InviteText>{inviteYn === 'N' ? '거부' : '초대중'}</InviteText>}</td>
          <td>
            {
              <LevelSelectBox
                defaultValue={lv}
                name={userId}
                onChange={onLvChange}
                disabled={rootStore.member.userId === userId || calendar.lv < 5 || lv === 9}
              >
                <option value="1">일정 보기</option>
                <option value="2">일정 등록/수정</option>
                <option value="3">타 일정 수정/삭제</option>
                <option value="5">일정 및 그룹관리자</option>
                {lv === 9 && <option value="9">일정 및 그룹관리자</option>}
              </LevelSelectBox>
            }
          </td>
          <td>
            {(calendar.lv >= 5 || calendar.userId === userId) && (
              <FaTimes size={14} onClick={() => onDeleteMemberClick(calendar.calendarId, userId)} />
            )}
          </td>
        </CalendarUserItem>
      )),
    [calendar, calendarUsers],
  );

  return (
    <>
      <SettingLayout>
        <Wrap>
          <MainWrap>
            <TableWrap>
              <CalendarWrap>
                <TableTop>
                  <p>그룹설정</p>
                </TableTop>
                <InputWrap>
                  <CheckBox>
                    <input
                      type="checkbox"
                      id="useYn"
                      name="useYn"
                      value="Y"
                      ref={register}
                      readOnly={calendar.calendarId === undefined}
                    />
                    <label htmlFor="useYn">사용</label>
                  </CheckBox>
                </InputWrap>
                <TableTop>
                  <p>그룹명설정</p>
                </TableTop>
                <InputWrap>
                  <input type="text" name="name" ref={register} />
                </InputWrap>
                <TableTop>
                  <p>색상설정</p>
                </TableTop>
                <InputWrap>
                  <ColorPicker name="color" color={calendarColor?.color} onColorChange={onColorChange} ref={register} />
                  <BgColorPicker
                    name="bgColor"
                    color={calendarColor?.bgColor}
                    onColorChange={onBgColorChange}
                    ref={register}
                  />
                </InputWrap>
                <TableTop>
                  <p>색상 미리보기</p>
                </TableTop>
                <InputWrap>
                  {calendarColor && (
                    <PreviewEvent color={calendarColor.color} bgColor={calendarColor.bgColor}>
                      -현재 그룹의 설정된 색상 입니다.
                    </PreviewEvent>
                  )}
                </InputWrap>
                <SettingButtonWrap>
                  <BlueButton type="button" onClick={onSaveClick}>
                    저장
                  </BlueButton>
                  <GreyButton type="button" onClick={onResetClick}>
                    취소
                  </GreyButton>
                </SettingButtonWrap>
              </CalendarWrap>
              <CalendarUserWrap>
                <TableTop>
                  <p>그룹원</p>
                  <div onClick={onOpenModalClick}>
                    <FaPlus size={17} />
                  </div>
                </TableTop>
                <TableContent>
                  <tbody>{CalendarUsrList}</tbody>
                </TableContent>
              </CalendarUserWrap>
            </TableWrap>
          </MainWrap>
        </Wrap>
        <UserAddModal elementId={'user-add'} isShow={isAddPopShow}>
          <header>
            <span>그룹초대</span>
          </header>
          <article>
            <InviteBox>
              <SearchBox>
                <SearchWrap>
                  <input
                    type="text"
                    ref={searchRef}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        onSearchClick();
                      }
                    }}
                    placeholder="검색하실 핸드폰 번호를 적어주세요"
                  />
                  <SearchButton onClick={onSearchClick} />
                </SearchWrap>
                <SearchList>
                  <table>
                    <colgroup>
                      <col width="*" />
                      <col width="60px" />
                      <col width="120px" />
                    </colgroup>
                    <tbody>
                      {searchList.length === 0 && (
                        <tr>
                          <td colSpan={3}>항목이 존재하지 않습니다.</td>
                        </tr>
                      )}
                      {searchList.length > 0 && SearchUsers}
                    </tbody>
                  </table>
                </SearchList>
                <InviteUserList>
                  <table>
                    <colgroup>
                      <col width="*" />
                      <col width="51px" />
                      <col width="120px" />
                    </colgroup>
                    <tbody>{InviteUsers}</tbody>
                  </table>
                </InviteUserList>
              </SearchBox>
            </InviteBox>
          </article>
          <footer>
            <button type="button" onClick={onInviteClick}>
              초대
            </button>
            <button type="button" onClick={onCloseModalClick}>
              취소
            </button>
          </footer>
        </UserAddModal>
      </SettingLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { calendarId } = ctx.params;
  const { data: calendar } = await serverAxios(ctx).get(`/diary/calendar/${calendarId}`);
  const { data: calendarUsers } = await serverAxios(ctx).get(`/diary/calendar/${calendarId}/allUsers`);
  return { props: { calendar, calendarUsers } };
};

export default SettingCalendar;
