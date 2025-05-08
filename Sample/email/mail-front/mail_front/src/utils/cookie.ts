import Cookies from "universal-cookie";

/**
 * @apiNote : 쿠키 유틸
 */
const _cookie = new Cookies();
export const cookieUtil = {
  // 쿠키 세팅
  setCookie(key: string, value: string, options?: { [key: string]: string }) {
    _cookie.set(key, value, {
      ...options,
      path: "/",
      sameSite: "lax",
      // https 에서만 로그인 가능
      // secure: process.env.NODE_ENV === 'production'
      // 같은 도메인에서만 쿠키를 전달
      // sameSite: "lax",
      // 30분 뒤 쿠키 삭제
      // maxAge: 1800,
      // expires: new Date(Date.now() + 3600000), });
    });
  },

  // 쿠키 가져오기
  getCookie(key: string) {
    return _cookie.get(key);
  },

  // 쿠키 제거
  removeCookie(key: string) {
    _cookie.remove(key, { path: "/" });
  },
};
