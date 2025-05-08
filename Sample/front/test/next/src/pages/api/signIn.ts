import { axios, cookieOption } from "@utils/network.util";
import { NextApiHandler } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";

const signIn: NextApiHandler = async (req, res) => {
  let result: any;
  if (req.method === "POST") {
    const { id, pw } = req.body;
    try {
      const { data: token } = await axios.post("/auth/signIn", { id, pw });
      if (token) {
        const { data } = await axios.get("/user/info", {
          headers: { authorization: `Bearer ${token}` },
        });
        if (data) {
          axios.defaults.headers.authorization = `Bearer ${token}`;
          setCookie({ res }, "nsid", token, cookieOption);
          result = { ...data, token };
        }
      }
    } catch (error) {
      throw error;
    }
  }
  res.json(result);
};

export default signIn;
