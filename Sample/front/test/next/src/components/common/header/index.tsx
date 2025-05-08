import styled from "@emotion/styled";
import React, { useCallback, useMemo } from "react";
import HeaderBanner from "./banner";
import Link from "next/link";
import CurrentClock from "@components/common/clock";
import HeaderButton from "./button";
import Notification from "./notification";
import rootStore from "@stores";
import { flowResult } from "mobx";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import ContactPopupContainer from "@components/contact";
import useToggle from "@hooks/useToggle";

//#region styled
const HeaderWrap = styled.header`
  position: relative;
`;
const Clock = styled(CurrentClock)`
  font-size: 14px;
  color: #999999;
`;

const HeaderTop = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  > h1 {
    display: inline-block;
    margin: 0 17px 0 20px;
    vertical-align: middle;
  }
`;

const HeaderLeft = styled.div`
  position: relative;
  display: flex;
  align-items: cetner;
`;

const HeaderRight = styled.div`
  position: relative;
  display: flex;
  align-items: cetner;
  margin-left: auto;
`;

const Logo = styled.h1`
  display: flex;
  margin: 0 17px 0 20px;
  align-items: center;
  cursor: pointer;
`;
const ClockWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SignOutBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 13px;
  margin-left: 5px;
  > a {
    font-size: 14px;
    color: 252525;
    cursor: pointer;
    + a {
      margin-left: 16px;
      color: #757575;
    }
  }
`;

const SignInBox = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
`;
//#endregion

const Header = () => {
  const router = useRouter();
  const [isShowContact, toggleContact] = useToggle();
  const onLogoutClick = useCallback(async () => {
    await flowResult(rootStore.authStore.userSignOut());
    router.reload();
  }, []);

  const buttons = useMemo(() => {
    if (rootStore.commonStore.isLoggedIn) {
      return (
        <>
          <SignInBox>
            <HeaderButton
              base="/images/ico/ico_call.png"
              on="/images/ico/ico_call_on.png"
              alt="연락처 관리"
              isActive={isShowContact}
              onClick={toggleContact}
            />
            <HeaderButton
              base="/images/ico/ico_mypage.png"
              on="/images/ico/ico_mypage_on.png"
              alt="마이페이지"
              link="/user/me"
            />
            <HeaderButton
              base="/images/ico/ico_setting.png"
              on="/images/ico/ico_setting_on.png"
              alt="환경설정"
              link="/calendar/setting"
            />
            <Notification />
          </SignInBox>
          <SignOutBox>
            <a onClick={onLogoutClick}>로그아웃</a>
          </SignOutBox>
        </>
      );
    } else {
      return (
        <SignOutBox>
          <Link href="/user/signUp">
            <a>회원가입</a>
          </Link>
          <Link href="/signIn">
            <a>로그인</a>
          </Link>
        </SignOutBox>
      );
    }
  }, [
    rootStore.commonStore.isLoggedIn,
    router.pathname,
    isShowContact,
    toggleContact,
  ]);

  const onClickLogo = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <HeaderWrap>
      <HeaderBanner />
      <HeaderTop>
        <HeaderLeft>
          <Logo onClick={onClickLogo}>
            <img src="/images/logo.png" alt="KMEMO 로고" />
          </Logo>
          <ClockWrap>
            <Clock />
          </ClockWrap>
        </HeaderLeft>
        <HeaderRight>{buttons}</HeaderRight>
        {isShowContact && (
          <ContactPopupContainer
            isShow={isShowContact}
            onClose={toggleContact}
          />
        )}
      </HeaderTop>
    </HeaderWrap>
  );
};

export default observer(Header);
