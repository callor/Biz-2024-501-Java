import config from "@config";
import styled from "@emotion/styled";
import { axios } from "@utils/network.util";
import firebaseClient from "config/firebase.config";
import globRegex from "glob-to-regexp";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRootStore } from "../context/RootStore";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1280px;
  height: 100vh;
  min-height: 800px;
`;

const ROLE_PUBLIC_URLS = [
  "/",
  "/signIn",
  "/user/signUp",
  "/user/find/*",
  "/_error",
];

const AuthWrap = observer(({ children }) => {
  const router = useRouter();
  const rootStore = useRootStore();

  const sendDeviceData = async (isNotification: boolean) => {
    isNotification;
    let token: string;

    try {
      token = isNotification
        ? await firebaseClient.messaging().getToken()
        : undefined;
    } catch {}

    await axios.patch("/auth/token", { token });
  };

  const isCheckAuth = useCallback(
    (path: string) => {
      const isPublic = ROLE_PUBLIC_URLS.some((url) =>
        globRegex(url).test(path)
      );
      if (isPublic) return;

      // 로그인 상태가 아니라면 로그인 페이지로
      if (!rootStore.isLoggedIn) {
        router.push("/signIn");
        return;
      }
      // 관리자 권한 체크
      if (globRegex("/admin/*").test(path)) {
        if (
          !rootStore.member?.roles?.some(({ role: { roleLv } }) => roleLv >= 90)
        ) {
          router.replace("/");
        }
      }
    },
    [rootStore.member, rootStore.isLoggedIn]
  );

  useEffect(() => {
    const pathname = router.pathname;
    if (rootStore.calendar.detail) {
      rootStore.calendar.setDetail(undefined);
    }
    isCheckAuth(pathname);
  }, [router.pathname]);

  useEffect(() => {
    // 브라우저가 알림 기능을 지원한다면
    if ("Notification" in window) {
      // 알림 권한 묻기
      Notification.requestPermission().then((result) => {
        // 로그인 되어있다면 전송
        if (rootStore.isLoggedIn) sendDeviceData(result === "granted");
      });
    }
  }, []);

  return <Wrap>{children}</Wrap>;
});

export default AuthWrap;
