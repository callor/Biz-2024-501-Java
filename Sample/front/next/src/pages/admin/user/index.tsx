import AdminPageLayout from "@components/layout/admin";
import styled from "@emotion/styled";
import { DateUtil } from "@utils/date.util";
import { axios } from "@utils/network.util";
import { StringUtil } from "@utils/string.util";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const UserTable = styled.div`
  width: 100%;
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

const UserListTable = styled.div`
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
        padding: 10px;
        text-align: center;
        cursor: pointer;
        &:nth-of-type(1) {
          cursor: default;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;

const Name = styled.td`
  padding: 0 9px;
  box-sizing: border-box;
`;

type User = {
  userId?: string;
  loginId: string;
  password: string;
  status: string;
  regdt: Date;
  uptdt: Date;
  member: Member;
};

const AdminUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = useCallback(async () => {
    const { data: users } = await axios.get(`/diary/admin/user`);
    setUsers(users);
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  const AllUserItems = useMemo(
    () =>
      users.map((user, idx) => (
        <tr>
          <td>{idx + 1}</td>
          <td>{user.member.kornm}</td>
          <td>{user.loginId}</td>
          <td>{StringUtil.formatMobile(user.member.mobile)}</td>
          <td>{DateUtil.format(user.regdt, "yyyy.MM.dd(iii)")}</td>
        </tr>
      )),
    [users]
  );

  return (
    <AdminPageLayout>
      <UserTable>
        <table>
          <colgroup>
            <col width="10%"></col>
            <col width="20%"></col>
            <col width="25%"></col>
            <col width="25%"></col>
            <col width="*"></col>
          </colgroup>
          <thead>
            <tr>
              <th>순번</th>
              <th>이름</th>
              <th>아이디</th>
              <th>전화번호</th>
              <th>등록일</th>
            </tr>
          </thead>
        </table>
        <UserListTable>
          <table>
            <colgroup>
              <col width="10%"></col>
              <col width="20%"></col>
              <col width="25%"></col>
              <col width="25%"></col>
              <col width="*"></col>
            </colgroup>
            <tbody>{AllUserItems}</tbody>
          </table>
        </UserListTable>
      </UserTable>
    </AdminPageLayout>
  );
};

export default AdminUserPage;
