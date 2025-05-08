import { COOKIE_NOT_LOGIN } from "@utils/contants";
import { axios, cookieOption } from "@utils/network.util";
import { NextApiHandler } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";

const check: NextApiHandler = async (req, res) => {
  let profile: Member = null;
  // Server 에서 실행 되는 코드
  const { nsid: token } = parseCookies({ req });

  if (token && token !== COOKIE_NOT_LOGIN) {
    try {
      // 유저 데이터를 가져온다
      axios.defaults.headers.authorization = `Bearer ${token}`;

      const { data } = await axios.get("/user/info");
      // 쿠키 유효기간 재갱신
      setCookie({ res }, "nsid", token, cookieOption);
      // 프로필 설정
      profile = { ...data, token };
    } catch (e) {
      throw e;
    }
  }

  if (!profile) {
    delete axios.defaults.headers.authorization;
    setCookie({ res }, "nsid", COOKIE_NOT_LOGIN, cookieOption);
  }

  res.send(profile);
};

export default check;
