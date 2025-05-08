// IE 호환성
import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import { Global, ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { resetCss } from "styles/reset.css";
import Head from "next/head";
import styled from "@emotion/styled";
import { enableStaticRendering } from "mobx-react";
import config from "@config";
import { AppComponent } from "next/dist/next-server/lib/router/router";
import Header from "@components/common/header";
import { axios } from "@utils/network.util";
import FullPageLoading from "@components/common/loading/FullPageLoading";
import rootStore from "@stores";
import { action, reaction } from "mobx";
import calendarStore from "@stores/calendar";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1280px;
  height: 100vh;
  min-height: 800px;
`;

const FullSize = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;
  min-height: 650px;
`;

// store Setting
enableStaticRendering(config.isServer);

const App = ({
  Component,
  pageProps,
}: {
  Component: AppComponent;
  pageProps: any;
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const preload = async () => {
    try {
      const { data } = await axios.get<Member>("/api/check", { baseURL: "/" });
      if (data) {
        axios.defaults.headers.authorization = `Bearer ${data.token}`;
        rootStore.commonStore.settingLoggedIn(data);
      } else {
        calendarStore.setUserCalendars([]);
      }
    } catch (error) {}
    setLoaded(true);
  };

  if (!config.isServer) {
    useEffect(() => {
      preload();

      reaction(
        () => rootStore.commonStore.isLoggedIn,
        async (isLoggedIn) => {
          if (isLoggedIn) {
            const { data: calendars } = await axios.get<CalendarUsr[]>(
              "/diary/calendar"
            );
            calendarStore.setUserCalendars(calendars);
          } else {
            calendarStore.setUserCalendars([]);
          }
        }
      );
    }, []);
  }

  return (
    <ThemeProvider theme={{}}>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="format-detection" content="telephone=no" />
        <title>KMEMO</title>
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:title" content="김반장-일정관리" />
        <meta name="Description" content="김반장-일정관리" />
        <meta name="Keywords" content="김반장-일정관리" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="김반장-일정관리" />
      </Head>

      <Global styles={resetCss} />

      {isLoaded ? (
        <Wrap>
          <Header />
          <FullSize>
            <Component {...pageProps} />
          </FullSize>
        </Wrap>
      ) : (
        <FullPageLoading />
      )}
    </ThemeProvider>
  );
};

export default App;
