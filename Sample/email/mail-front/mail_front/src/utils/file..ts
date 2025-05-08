import { IUserInfo } from "@/module/user/user";
import axios from "@/utils/axios";
import { AxiosRequestConfig } from "axios";
import { cryptoUtil } from "./crypto";

/** 2023.04.14. 추후 변경예정사항
 *  파일명 변경 > files.ts
 *  다운로드 프로세스는 똑같으므로 공통모듈 하나 만들어서 참조방식으로 변경예정
 */
const fileUtils = {
  /**
   * 첨부파일 업로드
   * @param files    업로드할 파일 리스트
   * @param coid     사업장코드
   * @returns file_sn
   */
  async uploadFiles(files: File[], coid?: number) {
    if (coid && files.length > 0) {
      const formData = new FormData();

      formData.append("coid", coid?.toString());
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });

      try {
        const { data } = await axios.post("/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            APIKEY: process.env.REQUEST_API_KEY as string,
          },
        });

        // TODO 나중에 한꺼번에 처리할 수 있도록 수정
        // if (data.code === "F") {
        //   alert("파일 업로드중 오류가 발생하였습니다.");

        //   return new Error("파일업로드 오류");
        // }

        return data;
      } catch (err) {
        return err;
      }
    }
  },

  /**
   * 첨부파일 업로드(결과파일 - 문서전달에서 사용)
   * @param coid
   * @param file
   * @param requst_sn
   * @returns
   */
  async uploadResultFiles(coid: number, files: File[], requst_sn: number) {
    try {
      const formData = new FormData();

      formData.append("coid", coid.toString());
      formData.append("requst_sn", requst_sn.toString());
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });

      const { data } = await axios.post("/file/upload/result", formData);

      return data;
    } catch (err) {
      return err;
    }
  },

  /**
   * 파일다운로드
   * @param fileInfo  aes128암호화 ('사업장번호(coid)'.'요청번호(requst_sn)'.'파일번호(filesn)'.'ts')
   */
  async downloadFiles(fileInfo: string) {
    try {
      const res = await axios.get(`/file/download/${fileInfo}`, {
        responseType: "blob",
      });
      const filenm = res.headers["content-disposition"].split("UTF-8")[1].replaceAll("'", "");
      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
    } catch {
      alert("파일다운로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * 파일다운로드
   * @param rcptno(접수번호)
   * @param seqno(첨부순번)
   */
  async downloadDocFiles(rcptno: string, seqno: number) {
    try {
      const res = await axios.get(`/file/download/pldoc/${rcptno}/${seqno}`, {
        responseType: "blob",
      });
      const filenm = res.headers["content-disposition"].split("UTF-8")[1].replaceAll("'", "");
      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
    } catch {
      alert("파일다운로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * 문서수발 첨부파일 로드
   * @param rcptno(접수번호)
   * @param seqno(첨부순번)
   */
  async docReceivingFileLoad(rcptno: string, seqno: number) {
    try {
      const res = await axios.get(`/file/download/pldoc/${rcptno}/${seqno}`, {
        responseType: "blob",
      });
      return res;
    } catch {
      alert("파일로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * 파일 일괄 다운로드
   * @param fileInfo  aes128암호화 ('사업장번호(coid)'.'요청번호(requst_sn)'.'ts')
   */
  async downloadAllFiles(fileInfo: string) {
    try {
      const res = await axios.get(`/file/download/all/${fileInfo}`, {
        responseType: "blob",
      });
      const filenm = res.headers["content-disposition"].split("UTF-8")[1].replaceAll("'", "");
      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
    } catch {
      alert("파일다운로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * 근로내용확인서 파일 일괄 다운로드
   * @param fileInfo  aes128암호화 ('사업장번호(coid)'.'요청번호(requst_sn)'.'ts')
   */
  async downloadAllCertWorkFiles(fileInfo: string) {
    try {
      const res = await axios.get(`/file/download/work/${fileInfo}`, {
        responseType: "blob",
      });
      const filenm = res.headers["content-disposition"].split("UTF-8")[1].replaceAll("'", "");
      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
    } catch {
      alert("파일다운로드중 오류가 발생하였습니다.");
    }
  },



    /**
   * post방식 파일 다운로드 추가함
   */
    async postDownloadFilesAdd({
      url,
      fileIdx
    }: { url: string; fileIdx: string }) {
      try {
        const res = await axios.post(`${url}`, `${fileIdx}`, { responseType: "blob"});
        const splittedPath = res.headers["content-disposition"].split("UTF-8");
        const filenm = splittedPath[splittedPath.length - 1].replaceAll("'", "");
  
        const blobURL = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = blobURL;
        link.download = filenm && decodeURIComponent(filenm);
        link.click();
        window.URL.revokeObjectURL(link.href);
        if (link) {
          link.remove();
        }
        return true;
      } catch {
        alert("파일다운로드 중 오류가 발생하였습니다.");
        return false;
      }
    },

    



  /**
   * post방식 파일 다운로드
   */
  async postDownloadFiles({
    url,
    params,
    ...props
  }: { url: string; params: { [key: string]: any } } & AxiosRequestConfig) {
    try {
      const res = await axios.post(`${url}`, { ...params }, { responseType: "blob", ...props });
      const splittedPath = res.headers["content-disposition"].split("UTF-8");
      const filenm = splittedPath[splittedPath.length - 1].replaceAll("'", "");

      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
      return true;
    } catch {
      alert("파일다운로드 중 오류가 발생하였습니다.");
      return false;
    }
  },

  /**
   * 상세페이지 첨부파일 일괄 다운로드
   *
   * @param fileInfo // 'coid.request_sn.ts.ukey' 암호화 문자열
   */
  async downloadAllAttachedFiles(fileInfo: string) {
    try {
      const res = await axios.get(`/file/download/all/request/${fileInfo}`, {
        responseType: "blob",
      });
      const filenm = res.headers["content-disposition"].split("UTF-8")[1].replaceAll("'", "");
      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
    } catch {
      alert("파일다운로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * @apiNote total goji 파일 데이터 조회 api
   *
   * 특이사항
   * - 응답 성공 시 api로부터 파일 어레이버퍼로 전달받음.
   * - 응답 실패 시(고지서 납부마감 등) JSON 객체로 리턴받음.
   */
  async totalgojiFileLoad(fileInfo: string) {
    try {
      const url = `/file/download/etc/${fileInfo}/outer`;
      const data = await axios.get(url, {
        responseType: "arraybuffer",
      });
      return data;
    } catch (e) {
      // logger.error(`파일 다운로드 오류 > ${e}`);
      alert("파일로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * 팩스 신고서 파일 다운로드
   * @param userInfo(유저정보)
   * @param faxKeyNum(팩스번호)
   */
  async downloadFaxReportResult(userInfo: IUserInfo, faxKeyNum: string) {
    try {
      const submitData = {
        emp_id: userInfo?.userid, // 조회자 ID (상황판 로그인 ID)
        emp_pw: userInfo?.passwd, // 조회자 PW (상황판 로그인 PW , AES128)
        // emp_pw: cryptoUtil.encrypt(userInfo?.passwd), // 조회자 PW (상황판 로그인 PW , AES128)
        fax_key_num: faxKeyNum, // 팩스 번호
      };

      const res = await axios.post("/ts/singo/fax/result", submitData, {
        responseType: "blob",
      });

      if (res.data?.type === "application/json") {
        return JSON.parse(await res.data.text());
      }

      if (res.data?.code === "F" && res.data?.errorCode) return res?.data;

      const filenm = res.headers["content-disposition"].split("UTF-8")[1].replaceAll("'", "");
      const blobURL = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filenm && decodeURIComponent(filenm);
      link.click();
      window.URL.revokeObjectURL(link.href);
      if (link) {
        link.remove();
      }
    } catch {
      alert("파일다운로드중 오류가 발생하였습니다.");
    }
  },

  /**
   * 팩스 신고서 파일 다운로드
   * @param userInfo(유저정보)
   * @param faxKeyNum(팩스번호)
   */
  async loadFaxReportResultData(userInfo: IUserInfo, faxKeyNum: string) {
    try {
      const submitData = {
        emp_id: userInfo?.userid, // 조회자 ID (상황판 로그인 ID)
        emp_pw: userInfo?.passwd, // 조회자 PW (상황판 로그인 PW , AES128)
        // emp_pw: cryptoUtil.encrypt(userInfo?.passwd), // 조회자 PW (상황판 로그인 PW , AES128)
        fax_key_num: faxKeyNum, // 팩스 번호
      };

      const res = await axios.post("/ts/singo/fax/result", submitData, {
        responseType: "arraybuffer",
      });

      // 팩스 신고서 파일 변환 여부 확인
      if (res.headers["content-type"] === "application/json") {
        const decoder = new TextDecoder();
        const decodedData = decoder.decode(res.data);
        const jsonData = JSON.parse(decodedData);
        return jsonData;
      }

      return res.data;
    } catch {
      return {
        code: "F",
        body: "",
        errorCode: "0000",
        msg: "파일 정보를 불러오는 중 오류가 발생하였습니다.",
      };
    }
  },
};

export default fileUtils;
