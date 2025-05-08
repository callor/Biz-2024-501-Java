import theme from "@/styles/theme";
import { fetcher } from "@/utils/fetcher";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement } from "react";
import "../../public/resources/css/jodit.min.css"; // Jodit CSS 추가

// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import { SWRConfig } from "swr";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// const showAtom = atom(false);
// showAtom.onMount = (setAtom) => {
//   setAtom(true);
// };

// global 호출
const cache = createCache({
  key: "css",
  prepend: true,
});

const MailFront = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: JSX.Element) => page);
  //   const { userInfo } = getUserDetail();
  //   const show = useAtomValue(showAtom);

  //   if (!show) {
  //     return null;
  //   }

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        // 똑같은 파라미터로 재요청할경우 최소 재갱신시간 2초 설정
        dedupingInterval: 2 * 1000,
        revalidateOnFocus: true,
        revalidateOnMount: true,
        // 캐싱된 데이터가 있을경우 최소 재갱신시간 30초 설정 (30초 인터벌을 가지고 브라우저에 포커싱이 왔을 때 재요청 날림.)
        focusThrottleInterval: 30 * 1000,
      }}
    >
      <CacheProvider value={cache}>
        <Head>
          <title>메일 보관함</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  );
};

export default MailFront;
