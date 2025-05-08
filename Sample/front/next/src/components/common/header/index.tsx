import ContactPopupContainer from '@components/contact';
import News from '@components/main/news';
import styled from '@emotion/styled';
import useToggle from '@hooks/useToggle';
import theme from '@styles/theme';
import { axios } from '@utils/network.util';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useRootStore } from '../context/RootStore';
import HeaderBanner from './banner';
import HeaderButton from './button';
import Notification from './notification';

const CurrentClock = dynamic(() => import('@components/common/clock'), { ssr: false });

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
  margin-left: 20px;
  align-items: center;
  cursor: pointer;
`;
const ClockWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 17px;
`;

const SignOutBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 13px;
  margin-left: 5px;
  > a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
    + a {
      margin-left: 16px;
      color: ${({ theme }) => theme.colors.grey};
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
  const rootStore = useRootStore();
  const [news, setNews] = useState<KoscajNewsItem[]>([]);
  const [isShowContact, toggleContact] = useToggle();

  const onLogoutClick = useCallback(async () => {
    await flowResult(rootStore.signOut());
    sessionStorage.clear();
    localStorage.clear();
    // 페이지 새로고침
    window.location.replace('/');
  }, [rootStore.signOut]);

  const onClickLogo = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    axios.get('/crawling/news/koscaj?cnt=5').then(({ data }) => {
      setNews(data as KoscajNewsItem[]);
    });
  }, []);

  return (
    <HeaderWrap>
      {/* <HeaderBanner /> */}
      <HeaderTop>
        <HeaderLeft>
          <Logo onClick={onClickLogo}>
            <img src="/images/logo.png" alt="KMEMO 로고" />
          </Logo>
          <ClockWrap>
            <Clock />
          </ClockWrap>
          <News news={news} />
        </HeaderLeft>
        <HeaderRight>
          {rootStore.isLoggedIn ? (
            <>
              <SignInBox>
                <HeaderButton
                  base={theme.icons.callOff}
                  on={theme.icons.callOn}
                  alt="연락처 관리"
                  isActive={isShowContact}
                  onClick={toggleContact}
                />
                <HeaderButton base={theme.icons.myPageOff} on={theme.icons.myPageOn} alt="마이페이지" link="/user/me" />
                <HeaderButton base={theme.icons.settingOff} on={theme.icons.settingOn} alt="환경설정" link="/setting" />
                <Notification />
              </SignInBox>
              <SignOutBox>
                <a onClick={onLogoutClick}>로그아웃</a>
              </SignOutBox>
              {rootStore.isAdmin && (
                <SignOutBox>
                  <Link href="/admin/tip">
                    <a>관리자</a>
                  </Link>
                </SignOutBox>
              )}
            </>
          ) : (
            <SignOutBox>
              <Link href="/user/signUp">
                <a>회원가입</a>
              </Link>
              <Link href="/signIn">
                <a>로그인</a>
              </Link>
            </SignOutBox>
          )}
        </HeaderRight>
        {isShowContact && <ContactPopupContainer isShow={isShowContact} onClose={toggleContact} />}
      </HeaderTop>
    </HeaderWrap>
  );
};

export default observer(Header);
