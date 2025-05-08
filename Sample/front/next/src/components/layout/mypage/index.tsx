import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import MainLayout from '../main';

const MyPageWarp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const LeftWrap = styled.div`
  width: 30px;
  flex: 0 0 30px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
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

    background: ${({ theme, isOn }) => (isOn ? theme.colors.primary : '#fafafa')};
    border-color: ${({ theme, isOn }) => (isOn ? theme.colors.primary : '#dbdbdb')};
    color: ${({ theme, isOn }) => (isOn ? theme.colors.white : '#999')};
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

const MyPageLayout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const pathname = useMemo(() => router.pathname, []);

  return (
    <MainLayout title={'마이페이지'}>
      <MyPageWarp>
        <Wrap>
          <MainContent>
            <div>{children}</div>
          </MainContent>
        </Wrap>
      </MyPageWarp>
    </MainLayout>
  );
};

export default MyPageLayout;
