import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo } from "react";
import MainLayout from "../main";

const AdminPageWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const LeftWrap = styled.div`
  width: 30px;
  flex: 0 0 30px;
  height: 100%;
  border-right: 1px solid #dbdbdb;
  box-sizing: border-box;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const TabItem = styled.li<{ isOn?: boolean }>`
  > a {
    display: block;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px 5px 0 0;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 38px;
    margin-left: -1px;

    background: ${(props) => (props.isOn ? "#177efb" : "#fafafa")};
    border-color: ${(props) => (props.isOn ? "#177efb" : "#dbdbdb")};
    color: ${(props) => (props.isOn ? "#fff" : "#999")};
  }
`;

const Tab = styled.div`
  > ul {
    font-size: 0;
    > ${TabItem} {
      display: inline-block;
      width: 180px;
      height: 40px;
      text-align: center;
    }
  }
`;

const MainContent = styled.div`
  max-width: 1060px;
  margin-top: 20px;
  height: calc(100% - 60px);
  flex: 1;
  > div {
    box-sizing: border-box;
    padding-bottom: 20px;
    height: 100%;
  }
`;

const AdminPageLayout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const pathname = useMemo(() => router.pathname, []);

  return (
    <MainLayout title={"관리자페이지"}>
      <AdminPageWrap>
        <LeftWrap />
        <Wrap>
          <Tab>
            <ul>
              <TabItem isOn={pathname === "/admin/user"}>
                <Link href="/admin/user">
                  <a>사용자 정보</a>
                </Link>
              </TabItem>
              <TabItem isOn={pathname.startsWith("/admin/tip")}>
                <Link href="/admin/tip">
                  <a>업무팁관리</a>
                </Link>
              </TabItem>
            </ul>
          </Tab>
          <MainContent>
            <div>{children}</div>
          </MainContent>
        </Wrap>
      </AdminPageWrap>
    </MainLayout>
  );
};

export default AdminPageLayout;
