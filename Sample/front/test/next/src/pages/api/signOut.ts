import { COOKIE_NOT_LOGIN } from "@utils/contants";
import { axios, cookieOption } from "@utils/network.util";
import { NextApiHandler } from "next";
import { parseCookies, setCookie } from "nookies";

const signOut: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    const { nsid } = parseCookies({ req });
    try {
      await axios.delete("/auth/signOut", {
        headers: { authorization: `Bearer ${nsid}` },
      });
      setCookie({ res }, "nsid", COOKIE_NOT_LOGIN, cookieOption);
    } catch (error) {
      throw error;
    }
  }

  res.send(null);
};

export default signOut;
