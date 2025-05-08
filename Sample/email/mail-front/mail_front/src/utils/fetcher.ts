import { IUserInfo } from "@/module/user/user";
import { AxiosInstance } from "axios";
import axios from "./axios";
import { cookieUtil } from "./cookie";
import { cryptoUtil } from "./crypto";

export interface ISwrFetcher {
  url: string;
  payload?: any;
  axiosInstance?: AxiosInstance;
  isPost?: boolean;
  isLogin?: boolean;
}

export const fetcher = async (option: {
  url: string;
  payload?: any;
  axiosInstance?: AxiosInstance;
  isPost?: boolean;
  isLogin?: boolean;
}) => {
  const json: string = cryptoUtil.decrypt(cookieUtil.getCookie("_sd")) as string;
  const userData = JSON.parse(json) as IUserInfo;

  const headers = {
    APIKEY: process.env.REQUEST_API_KEY as string,
    Authorization: !option?.isLogin ? userData?.auth_key : undefined,
  };

  if (option?.isPost) {
    // post
    return await axios.post(option.url, option?.payload, { headers }).then((res: any) => res.data?.body);
  } else {
    // get
    return await axios.get(option.url, { headers }).then((res: any) => res.data?.body);
  }
};
