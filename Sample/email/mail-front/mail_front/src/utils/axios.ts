import { getUserDetail } from "@/module/user/user";
import _axios, { AxiosInstance } from "axios";
import { IncomingMessage } from "http";
import * as apiUtils from "next/dist/server/api-utils";
import util from "util";
import { cookieUtil } from "./cookie";
import { cryptoUtil } from "./crypto";
import { dateUtil } from "./date";

/**
 * @apiNote : axios 유틸
 */

/**
 * axios Instance 생성
 * @param   baseURL
 * @returns { AxiosInstance }
 */
const createAxiosInstance = (baseURL: string) => {
  const instance = _axios.create({
    baseURL,
    withCredentials: false,
    timeout: 15000,
  });

  instance.interceptors.request.use(
    (config) => {
      const { userInfo } = getUserDetail();
      const url: any = config.url;
      const REQUEST_API_KEY = process.env.REQUEST_API_KEY;
      // const LOGIN_API_KEY = process.env.LOGIN_API_KEY;

      if (url.includes("login")) {
        // 로그인 요청일경우
        // config.headers["APIKEY"] = LOGIN_API_KEY;
        config.headers["apikey"] = REQUEST_API_KEY;
      } else {
        // 로그인 요청이 아닐경우
        // config.headers["apikey"] = REQUEST_API_KEY;
        config.headers["Authorization"] = userInfo?.auth_key;
        config.headers["userNm"] = userInfo?.userid;
        config.headers["apikey"] = REQUEST_API_KEY;
        // config.headers["Authorization"] = "sendMailKey";
      }

      // if (url.replace("/", "").indexOf("web") === 0) {
      //   // ts로 시작되는경우
      //   if (url.includes("test")) {
      //     // 로그인 요청일경우
      //     config.headers["APIKEY"] = LOGIN_API_KEY;
      //   } else {
      //     // 로그인 요청이 아닐경우
      //     config.headers["Authorization"] = userInfo?.auth_key;
      //   }
      // } else {
      //   // ts로 시작되는경우가 아닐경우
      //   config.headers["APIKEY"] = REQUEST_API_KEY;
      // }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // production, development 환경에서 요청한 응답 intercept
  instance.interceptors.response.use(
    (result: any) => {
      if (result.data?.return_message?.includes("ERR_INR_CD_0001")) {
        // 서버사이드 url - location, session 접근이 안돼서 제외
        const serverSideUrl = ["/email/login"];
        // const serverSideUrl = ["/ts/login"];

        try {
          if (!serverSideUrl.includes(result.config.url)) {
            location?.reload();
            sessionStorage.clear();
            cookieUtil.removeCookie("_sd");
            alert(
              result.data.return_message?.replace("ErrorCode : ERR_INR_CD_0001", "") +
                "\n재로그인 해주세요.",
            );
          }
        } catch (e) {
          throw e;
        }
      }
      return result;
    },
    (error) => {
      if (error.response?.data?.message) {
        console.log(
          `%c[ URL ] ${error.response.config.url} [ MESSAGE ] ${JSON.stringify(
            error.response.data.message,
          )}`,
          "color: #f03e3e",
        );
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const getDevLog = (instance: AxiosInstance) => {
  // 개발서버 요청 interceptor
  instance.interceptors.request.use(
    (config) => {
      console.groupCollapsed(
        `%c📌 API Request  Logging.. [${config.method?.toUpperCase()}] ${config.url}`,
        "color: #37b24d;",
      );
      const isBody = ["post", "put", "patch"].includes(config.method as string);
      if ((isBody && config.data) || (!isBody && config.params)) {
        console.log(
          `[ ${["post", "put", "patch"].includes(config.method as string) ? "body" : "params"} ]`,
          config.params ?? config.data,
        );
      }
      return config;
    },
    (err) => {
      console.error(
        `🤒 ${dateUtil.dateFormat(
          new Date(),
          "yyyy-MM-dd HH:mm:ss",
        )} [ ${err.config.method.toUpperCase()} ] : ${err.request.path}`,
      );
      console.log("\n[ Stack ] : ", err);
      if (err.request) {
        console.log("\n[ RequestHeader ] : ", util.inspect(err.request._header));
      }

      if (err.config) {
        console.log("\n[ ConfigHeader ] : ", util.inspect(err.config.headers));
        console.log("\n[ RequestQuery ] : ", util.inspect(err.config.params));
        console.log("\n[ RequestBody ] : ", util.inspect(err.config.data));
      }

      if (err.response) {
        console.log("\n[ ResponseHeader ] : ", util.inspect(err.response.headers));
        console.log("\n[ ResponseData ] : ", util.inspect(err.response.data));
      }

      console.log("======================================================\n");
      console.groupEnd();
      return Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      console.log(
        `%c📫 API Response Logging.. [${response.config.method?.toUpperCase()}] ${response.config.url}`,
        "color: #31B4D9;",
      );
      console.dir(response.data);
      console.groupEnd();
      return response;
    },
    (error) => {
      console.groupEnd();
      return Promise.reject(error);
    },
  );
};

const axios = createAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL as string);

export const backendAxios = (req: IncomingMessage & { cookies?: apiUtils.NextApiRequestCookies }) => {
  if (req.cookies && req.cookies._sd) {
    const auth_key = JSON.parse(cryptoUtil.decrypt(req.cookies._sd) as string).auth_key;
    const axios = createAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL as string);
    // axios.defaults.headers.common["Authorization"] = auth_key;
    // axios.interceptors.request.use((req) => (req.headers["Authorization"] = auth_key));
    // FIXME: csr환경 axios interceptor와 충돌때문에 사용중단.. 나중에 누군가가 나와같은생각이라면 csr axios interceptor쪽 수정하면 야무지게 ssr axios 사용가능할것임.

    return axios;
  }
  return axios;
};

export default axios;
