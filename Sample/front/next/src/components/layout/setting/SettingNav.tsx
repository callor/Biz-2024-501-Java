import styled from '@emotion/styled';
import { axiosFetcher } from '@utils/network.util';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import useSWR from 'swr';

const NavBox = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: white;
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  > ul {
    margin-top: 20px;
  }
`;

const NavTitle = styled.li`
  padding: 10px 20px;
  font-size: 14px;
`;

const NavItem = styled.li<{ active?: boolean }>`
  ${(props) =>
    props.active ? 'background-image: linear-gradient(120deg, #fdfbfb 0%, #d0ebff 100%); color: #1864ab;' : ''};
  display: flex;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  font-size: 14px;
  :hover {
    color: #1864ab;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #d0ebff 100%);
  }
`;

const CalendarArticle = styled.article`
  display: flex;
  align-items: center;
  > span {
    font-size: 13px;
    padding-left: 15px;
  }
`;

const CalendaColor = styled.i`
  width: 15px;
  height: 15px;
  margin-top: 1px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow: 0 0 2px 0 ${({ color }) => color};
`;

const BackItem = styled.a`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 10px;
  font-size: 18px;
  > span {
    position: relative;
    &:hover {
      &:before {
        content: ' ';
        position: absolute;
        top: -3.5px;
        left: -5px;
        border-radius: 50px;
        width: 30px;
        height: 30px;
        z-index: 0;
        background-color: #e9ecef;
      }
    }
    > svg {
      margin-top: 2px;
      margin-right: 20px;
      cursor: pointer;
      position: relative;
    }
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
const SettingNav = () => {
  const router = useRouter();
  const { data: calendarList } = useSWR<CalendarUsr[]>('/diary/calendar/all', axiosFetcher, {
    refreshInterval: 0,
    focusThrottleInterval: 60000,
  });

  const onBackClick = useCallback(() => {
    router.back();
  }, []);
  return (
    <NavBox>
      <BackItem>
        <span onClick={onBackClick}>
          <IoMdArrowBack size={20} />
        </span>
        설정
      </BackItem>
      <ul>
        <Link href={`/setting`}>
          <NavItem active={router.pathname === '/setting'}>
            <span>일반</span>
          </NavItem>
        </Link>
        <NavTitle>나의 그룹관리</NavTitle>
        {calendarList?.map(({ bgColor, name, calendarId }) => (
          <Link
            key={`nav-${calendarId}`}
            href={`/setting/calendar/${calendarId}`}
            replace={router.pathname !== '/setting'}
          >
            <NavItem active={router.query?.calendarId === calendarId}>
              <CalendarArticle>
                <CalendaColor color={bgColor} />
                <span>{name}</span>
              </CalendarArticle>
            </NavItem>
          </Link>
        ))}
      </ul>
    </NavBox>
  );
};

export default SettingNav;
