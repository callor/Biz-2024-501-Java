import styled from '@emotion/styled';
import SettingNav from './SettingNav';

const FullSize = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  * {
    box-sizing: border-box;
  }
`;

const MainContent = styled.main`
  flex: 1;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const SettingLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <FullSize>
      <SettingNav />
      <MainContent>{children}</MainContent>
    </FullSize>
  );
};

export default SettingLayout;
