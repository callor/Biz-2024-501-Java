import { BlueButton } from "@components/common/button";
import MyPageLayout from "@components/layout/mypage";
import InviteUserTable from "@components/mypage/group/InviteUserTable";
import styled from "@emotion/styled";
import ColorUtil from "@utils/color.util";
import { axios, serverAxios } from "@utils/network.util";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

//#region styled
const GroupTable = styled.div`
  height: 100%;
  border: 1px solid #dbdbdb;
  border-top: 1px solid #454545;
  box-sizing: border-box;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const GroupWrap = styled.div`
  display: flex;
  height: 100%;
`;

const TableCont = styled.div`
  overflow-y: auto;
`;

const GroupList = styled.ul``;
const GroupItem = styled.li<{ isOn?: boolean }>`
  height: 36px;
  line-height: 34px;
  padding-left: 7px;
  font-size: 14px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  cursor: pointer;
  color: ${(props) => (props.isOn ? "#fff" : "#f5f6f8")};
  background-color: ${(props) => (props.isOn ? "#6485ae" : "#888e9c")};
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
    color: #252525;
    text-align: center;
  }
`;

const TableBtm = styled.div`
  height: 110px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  z-index: 2;
  > input {
    height: 36px;
  }
  > ${BlueButton} {
    margin-top: auto;
    width: 100%;
    height: 40px;
    border-radius: 5px;
  }
`;

const ManageTable = styled.div`
  width: 350px;
  margin-left: 10px;
  height: 100%;
  border: 1px solid #dbdbdb;
  border-top: 1px solid #454545;
  box-sizing: border-box;
  > table {
    width: 100%;
    table-layout: fixed;
    > thead {
      background: #fafafa;
      border-bottom: 1px solid #eeeeee;
      box-sizing: border-box;

      th {
        line-height: 42px;
        font-size: 14px;
        font-weight: 500;
        color: #252525;
        border-right: 1px solid #dbdbdb;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;

const ManageUserTable = styled.div`
  height: calc(100% - 44px);
  overflow-y: auto;

  table {
    width: 100%;
    table-layout: fixed;
    tbody {
      tr {
        height: 36px;
        border-bottom: 1px solid #eee;
      }
      td {
        font-size: 14px;
        color: #454545;
        border-right: 1px solid #dbdbdb;
        cursor: pointer;
        &:nth-of-type(1) {
          cursor: default;
        }
        &:last-child {
          border-right: none;
        }
      }
      input[type="checkbox"] {
        display: none;
        width: 0;
        height: 0;
      }
    }
  }
`;

const Name = styled.td`
  padding: 0 9px;
  box-sizing: border-box;
`;

const BasicCheck = styled.span`
  display: inline-block;
  width: 100%;
  height: 35px;
  cursor: pointer;
  box-sizing: border-box;
  background: url("/images/btn/btn_group_check.png") center no-repeat;
`;

const InviteText = styled.span`
  display: block;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #ef8425;
  text-align: center;
`;

const KickButton = styled.span`
  display: inline-block;
  width: 100%;
  height: 35px;
  cursor: pointer;
  box-sizing: border-box;
  background: url("/images/btn/btn_withdraw.png") center no-repeat;
`;
//#endregion

type MyGroupPageProps = {
  calendars: CalendarUsr[];
};

type User = {
  userId: string;
  loginId: string;
  kornm: string;
  mobile: string;
  lv: number;
  inviteYn: YN;
};

const MyGroupPage = ({ calendars }: MyGroupPageProps) => {
  const router = useRouter();
  const [selectCalendar, setSelectCalendar] = useState<string>();
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getCalendarUsers = useCallback(async (calendarId: string) => {
    setSelectCalendar(calendarId);
    if (calendarId) {
      const { data: userCalendar } = await axios.get(
        `/diary/calendar/${calendarId}`
      );
      // 관리자 권한 체크
      if ([5, 9].includes(userCalendar.lv)) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      // 사용자 불러오기
      const { data: users } = await axios.get<User[]>(
        `/diary/calendar/${calendarId}/users`
      );
      setUsers(users);
    } else {
      setUsers([]);
    }
  }, []);

  const onSelectCalendar = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    getCalendarUsers(e.currentTarget.dataset.calendarId);
  }, []);

  useEffect(() => {
    getCalendarUsers(calendars[0]?.calendarId);
  }, []);

  const onAddGroupClick = useCallback(async () => {
    const name = document
      .querySelector<HTMLInputElement>("#groupName")
      .value.trim();
    if (!name) {
      alert("사용하실 그룹명을 적어주세요");
      return;
    }

    const bgColor = ColorUtil.randomColor();
    const color = ColorUtil.isDark(bgColor) ? "#ffffff" : "#333333";

    await axios.post("/diary/calendar", { name, bgColor, color });

    router.reload();
  }, []);

  const onDeleteUserClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isAdmin) {
        const { userId } = e.currentTarget.dataset;
        await axios.delete(`/diary/calendar/${selectCalendar}/${userId}`);
        alert("삭제되었습니다.");
        getCalendarUsers(selectCalendar);
      }
    },
    [isAdmin, selectCalendar]
  );

  const onAdminClick = useCallback(
    async (e: React.MouseEvent<HTMLTableDataCellElement>) => {
      if (isAdmin) {
        const { userId, adminYn } = e.currentTarget.dataset;
        await axios.patch(`/diary/calendar/${selectCalendar}`, {
          targetId: userId,
          adminYn: adminYn === "Y" ? "N" : "Y",
        });
        getCalendarUsers(selectCalendar);
      }
    },
    [isAdmin, selectCalendar]
  );

  const CalendarGroupItems = useMemo(
    () =>
      calendars.map(({ name, calendarId }) => (
        <GroupItem
          key={`calendar-group-${calendarId}`}
          isOn={selectCalendar === calendarId}
          data-calendar-id={calendarId}
          onClick={onSelectCalendar}
        >
          {name}
        </GroupItem>
      )),
    [selectCalendar]
  );

  const CalendarMemberItems = useMemo(
    () =>
      users.map((user, idx) => (
        <tr key={`calendar-group-user-${idx}`}>
          <Name>
            {user.kornm}({user.loginId})
          </Name>
          <td
            data-user-id={user.userId}
            data-admin-yn={[5, 9].includes(user.lv) ? "Y" : "N"}
            onClick={onAdminClick}
          >
            {[5, 9].includes(user.lv) && <BasicCheck />}
          </td>
          <td>
            {isAdmin && (
              <KickButton
                onClick={onDeleteUserClick}
                data-user-id={user.userId}
              />
            )}
          </td>
          <td>
            {user.inviteYn && (
              <InviteText>
                {user.inviteYn === "N" ? "초대 거절" : "초대 중"}
              </InviteText>
            )}
          </td>
        </tr>
      )),
    [users, isAdmin]
  );

  return (
    <MyPageLayout>
      <GroupWrap>
        <GroupTable>
          <TableTop>
            <p>그룹명</p>
          </TableTop>
          <TableCont>
            <GroupList>{CalendarGroupItems}</GroupList>
          </TableCont>
          <TableBtm>
            <input placeholder="추가하실 그룹명을 적어주세요" id="groupName" />
            <BlueButton onClick={onAddGroupClick}>그룹추가</BlueButton>
          </TableBtm>
        </GroupTable>
        <ManageTable>
          <table>
            <colgroup>
              <col width="*" />
              <col width="50px" />
              <col width="50px" />
              <col width="50px" />
            </colgroup>
            <thead>
              <tr>
                <th>그룹원</th>
                <th>관리자</th>
                <th>탈퇴</th>
                <th>초대</th>
              </tr>
            </thead>
          </table>
          <ManageUserTable>
            <table>
              <colgroup>
                <col width="*" />
                <col width="50px" />
                <col width="50px" />
                <col width="50px" />
              </colgroup>
              <tbody>{CalendarMemberItems}</tbody>
            </table>
          </ManageUserTable>
        </ManageTable>
        {isAdmin && (
          <InviteUserTable
            calendarId={selectCalendar}
            users={users}
            refreshUserList={() => {
              getCalendarUsers(selectCalendar);
            }}
          />
        )}
      </GroupWrap>
    </MyPageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: calendars } = await serverAxios(ctx).get("/diary/calendar");
  return { props: { calendars } };
};

export default MyGroupPage;
