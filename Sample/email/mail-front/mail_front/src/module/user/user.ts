import { cookieUtil } from "@/utils/cookie";
import { cryptoUtil } from "@/utils/crypto";

const virtualGroupObjectList = [
  { rGroupCode: "Q1419", vGroupCode: "Q1428" },
  { rGroupCode: "Q1426", vGroupCode: "Q1415" },
  // { rGroupCode: "Q1430", vGroupCode: "Q1418" },
];
export interface IUserInfo {
  // branch: string;
  // ukey?: number;
  korname?: string;
  // groupid?: string;
  // vGroupId?: string;
  // position?: number;
  auth?: string;
  auth_key?: string;
  userid?: string;
  passwd?: string;
  smunionCd?: number;
  smunionNm?: string;
  smunionList?: Array<{ [key: string]: string }>;
}
/**
 * @apiNote : 유저정보 파싱 모듈
 */
export const getUserDetail = () => {
  if (cookieUtil.getCookie("_sd")) {
    const json: string = cryptoUtil.decrypt(cookieUtil.getCookie("_sd")) as string;
    const userData = JSON.parse(json);
    // const userData: any = JSON.parse(cryptoUtil.decrypt(cookieUtil.getCookie("_sd"))as string);
    // const branch = ["Q1412", "Q1414", "Q1417", "Q1422", "Q1426"].find(
    //   (daeguBranch) => daeguBranch === userData.groupid,
    // )
    //   ? "daegu"
    //   : "gwangju";
    return {
      userInfo: {
        ...userData,
        // branch: branch,
        // vGroupId: virtualGroupObjectList.find((grp) => grp.rGroupCode === userData.groupid)?.vGroupCode,
      } as IUserInfo,
    };
  }
  return {
    userInfo: undefined,
  };
};
