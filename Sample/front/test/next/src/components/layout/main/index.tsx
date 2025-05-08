import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useMemo, useState } from "react";
import CalendarNav from "./CalendarNav";
import MiniCalendar from "./MiniCalendar";

const Container = styled.div`
  flex: 1;
  height: 100%;
`;

const MainWrap = styled.div`
  height: 100%;

  display: flex;
  width: 100%;
  flex-direction: row;
`;

const NavSection = styled.section<{ isOpen: boolean }>`
  height: 100%;
  position: relative;
  /* display:inline-block */
  width: 200px;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  min-height: 646px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  box-sizing: border-box;
`;

const NavTop = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  padding-top: 18px;
  > button {
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    background-color: #177efb;
    border-radius: 5px;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.27);
  }
`;

const NavBottom = styled.div`
  width: 100%;
  padding: 0 9px;
  box-sizing: border-box;
  padding-bottom: 15px;
  border-bottom: 1px solid #dbdbdb;
`;

const MainSection = styled.section`
  flex: 1;
  height: 100%;
  position: relative;
  min-width: 1050px;

  display: flex;
  flex-direction: column;
`;

const Copyright = styled.div`
  font-size: 10px;
  color: #999999;
`;

const MainSectionTop = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const NavToggleButton = styled.div<{ isOpen: boolean }>`
  width: 30px;
  height: 100%;
  border-right: 1px solid #dbdbdb;
  box-sizing: border-box;
  > button {
    width: 100%;
    height: 100%;
    background: url("/images/btn/btn_snb_open.png") center no-repeat;
    transition: all 0.2s ease;
    ${(props) => (props.isOpen ? "" : "transform: rotate(180deg);")}
  }
`;

const MainTitleWrap = styled.div`
  flex: 1;
  height: 50px;
  overflow: hidden;
  padding: 12px 14px;
  box-sizing: border-box;
  > p {
    font-size: 18px;
    font-weight: 700;
    color: #252525;
    line-height: 26px;
  }
`;

const MainView = styled.div`
  flex: 1;
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  /* border-top: 1px solid #dbdbdb; */
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

type MainLayoutProps = { children?: ReactNode; title?: ReactNode };

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [showNav, setShowNav] = useState(window.screen.width > 1280);

  const router = useRouter();

  const goWritePage = useMemo(() => "/" === router.pathname, [router.pathname]);

  const onClickNavShow = useCallback(() => {
    setShowNav(!showNav);
  }, [showNav]);

  return (
    <Container>
      <MainWrap>
        <NavSection isOpen={showNav}>
          <NavTop>
            <Link href={goWritePage ? "/calendar/event/write" : "/"}>
              <button>{goWritePage ? "일정추가" : "일정보기"}</button>
            </Link>
            <CalendarNav />
          </NavTop>
          <NavBottom>
            <MiniCalendar />
            <Copyright>
              <p>Copyright © KMEMO. All Rights Reserved.</p>
            </Copyright>
          </NavBottom>
        </NavSection>
        <MainSection>
          <MainSectionTop>
            <NavToggleButton isOpen={showNav}>
              <button onClick={onClickNavShow}></button>
            </NavToggleButton>
            <MainTitleWrap>
              {typeof title === "string" ? <p>{title}</p> : title}
            </MainTitleWrap>
          </MainSectionTop>
          <MainView>{children}</MainView>
        </MainSection>
      </MainWrap>
    </Container>
  );
};

export default MainLayout;
