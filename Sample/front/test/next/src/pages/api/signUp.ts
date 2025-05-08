import { axios, cookieOption } from "@utils/network.util";
import { NextApiHandler } from "next";
import { setCookie } from "nookies";

const signUp: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const token = req.body.token;
    if (token) {
      let result: any;
      try {
        const { data } = await axios.get("/user/info", {
          headers: { authorization: `Bearer ${token}` },
        });

        if (data) {
          axios.defaults.headers.authorization = `Bearer ${token}`;
          setCookie({ res }, "nsid", token, cookieOption);
          result = { ...data, token };
        }

        // 로그인 되었을 경우 쿠키 세팅
        setCookie({ res }, "nsid", token, cookieOption);
        res.send(result);
      } catch (error) {
        throw error;
      }
    } else {
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
};

export default signUp;
