import AuthWrap from '@components/common/auth';
import RootStoreProvider from '@components/common/context/RootStore';
import Header from '@components/common/header';
import NoticePopup from '@components/common/notice/Popup';
import config from '@config';
import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import { COOKIE_NOT_LOGIN } from '@utils/contants';
import { axios, cookieOption } from '@utils/network.util';
import { observer } from 'mobx-react-lite';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import Head from 'next/head';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { resetCss } from 'styles/reset.css';

const FullSize = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;
  min-height: 650px;
`;

const ModalRoot = styled.div`
  position: relative;
  top: 0;
  z-index: 999;
`;

const App = ({ Component, pageProps, initialData }: IAppProps) => {
  return (
    <RootStoreProvider initialData={initialData}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          />
          <title>케이메모</title>
        </Head>
        <Global styles={resetCss} />
        <AuthWrap>
          <Header />
          <FullSize>
            <Component {...pageProps} />
          </FullSize>
        </AuthWrap>
        <NoticePopup />
        <ModalRoot id="modal-root" tabIndex={-1} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </RootStoreProvider>
  );
};

App.getInitialProps = async ({ ctx }: AppContextType) => {
  let data: InitData | undefined = undefined;
  if (config.isServer) {
    // 공용 캘린더 세팅
    const { data: calendars } = await axios.get<Calendar[]>('/diary/calendar/common');
    data = { commonCalendars: calendars };

    const { nsid: token } = parseCookies(ctx);

    if (token && token !== COOKIE_NOT_LOGIN) {
      // 유저 데이터를 가져온다
      try {
        const { data: member } = await axios.get<Member>('/user/info', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        data.member = member ? { ...member, token } : undefined;
      } catch {}
    }
    if (data.member) {
      const { data: userCalendars } = await axios.get<CalendarUsr[]>('/diary/calendar', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // 사용자 캘린더 세팅
      data.userCalendars = userCalendars;
      // 쿠키값 세팅
      setCookie(ctx, 'nsid', token, cookieOption);
    } else {
      // Cookie 삭제
      destroyCookie(ctx, 'nsid');
    }
  }
  return { initialData: data };
};

export default observer(App);

interface IAppProps extends AppProps {
  initialData: InitData;
}
