import { BlueButton } from "@components/common/button";
import ButtonWrap from "@components/common/button/ButtonWrap";
import styled from "@emotion/styled";
import { axios } from "@utils/network.util";
import { StringUtil } from "@utils/string.util";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

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
`;

const InviteTable = styled.div`
  width: 285px;
  margin-left: 10px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-top: 1px solid #454545;
  box-sizing: border-box;
`;

const InviteBox = styled.div`
  padding: 10px;
  box-sizing: border-box;

  select,
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

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 36px;
  height: 36px;
  background: url("/images/ico/ico_search_black_18x18.png") center no-repeat;
  background-size: 18px;
`;

const SearchList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 5px;
  box-sizing: border-box;

  table {
    width: 100%;
    background: #fafafa;
    border-radius: 5px;
    overflow: hidden;
    table-layout: fixed;

    tr {
      border-bottom: 1px solid #eee;
    }
    td {
      position: relative;
      border-right: 1px solid #eee;
      font-family: "dotum", tahoma, "MalgunGothic", "Verdana", "Arial",
        "Helvetica", sans-serif;
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
  background: ${({ theme }) => theme.colors.white}
    url("/images/ico/ico_plus.png") center no-repeat;
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
  background: ${({ theme }) => theme.colors.white}
    url("/images/ico/ico_minus.png") center no-repeat;
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
        font-family: "dotum", tahoma, "MalgunGothic", "Verdana", "Arial",
          "Helvetica", sans-serif;
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

const InviteButton = styled(BlueButton)`
  width: 60px;
  height: 24px;
  line-height: 22px;
  border-radius: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

type InviteUserTableProps = {
  calendarId: string;
  users: {
    userId: string;
    loginId: string;
    kornm: string;
    mobile: string;
    lv: number;
    inviteYn: YN;
  }[];
  userId: string;
  refreshUserList: () => void;
};

type SearchUser = {
  userId: string;
  loginId: string;
  kornm: string;
  email: string;
  mobile: string;
};

const InviteUserTable = ({
  calendarId,
  users,
  userId,
  refreshUserList,
}: InviteUserTableProps) => {
  const [searchList, setSearchList] = useState<SearchUser[]>([]);
  const [inviteList, setInviteList] = useState<SearchUser[]>([]);
  const { register, getValues, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onInviteClick = useCallback(async () => {
    if (inviteList.length === 0) {
      alert("초대하실 유저를 선택해주세요.");
      return;
    }

    const userIds = inviteList.map(({ userId }) => userId);
    await axios.post(`/diary/calendar/invite`, {
      calendarId,
      userIds,
    });
    alert(`${userIds.length}명 초대 되었습니다`);
    setValue("search", "");
    setSearchList([]);
    setInviteList([]);
    refreshUserList();
  }, [inviteList]);

  const onSearchClick = useCallback(async () => {
    const search = getValues().search.trim();
    if (!search) {
      alert("검색하실 핸드폰 번호를 적어주세요");
    } else {
      const { data: members } = await axios.get<SearchUser[]>(
        `/user/info/${search}`
      );

      setSearchList(
        members.filter(
          ({ userId: _userId }) =>
            !users.some((user) => user.userId === _userId) && _userId !== userId
        )
      );
    }
  }, [users]);

  const onAddUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const userId = e.currentTarget.dataset.userId;
      setInviteList([
        ...inviteList,
        searchList.find((search) => search.userId === userId),
      ]);
    },
    [searchList, inviteList]
  );

  const onDeleteUserClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const deleteId = e.currentTarget.dataset.userId;
      setInviteList(inviteList.filter(({ userId }) => userId !== deleteId));
    },
    [inviteList]
  );

  const SearchUsers = useMemo(
    () =>
      searchList
        .filter(
          ({ userId }) => !inviteList.some((invite) => invite.userId === userId)
        )
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
    [searchList, inviteList, users]
  );

  const InviteUsers = useMemo(
    () =>
      inviteList.map(({ loginId, kornm, mobile, userId }) => (
        <tr key={`invite-user-list-${userId}`}>
          <td>{loginId}</td>
          <td>{kornm}</td>
          <td>
            {StringUtil.formatMobile(mobile)}
            <UserMinusButton
              data-user-id={userId}
              onClick={onDeleteUserClick}
            />
          </td>
        </tr>
      )),
    [inviteList]
  );

  return (
    <InviteTable>
      <TableTop>
        <p>그룹초대</p>
      </TableTop>
      <InviteBox>
        <SearchBox>
          <input
            name="search"
            ref={register}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSearchClick();
              }
            }}
            placeholder="검색하실 핸드폰 번호를 적어주세요"
          />
          <SearchButton onClick={onSearchClick} />
        </SearchBox>
        <SearchList>
          <table>
            <colgroup>
              <col width="*" />
              <col width="51px" />
              <col width="120px" />
            </colgroup>
            <tbody>
              {searchList.length === 0 && (
                <tr>
                  <td colSpan={3}>항목이 존재하지 않습니다</td>
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
        <ButtonWrap>
          <InviteButton onClick={onInviteClick}>초대</InviteButton>
        </ButtonWrap>
      </InviteBox>
    </InviteTable>
  );
};

export default InviteUserTable;
