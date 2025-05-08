import PdfPreview from "@/components/main/PdfViewer";
import axios from "@/utils/axios";
import { cookieUtil } from "@/utils/cookie";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

// 테이블
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// 아코디언 예제 사용
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  mainCompChanged,
  mainList,
  // mainPage,
  mainTextChanged,
  mainTopBarIdx,
  mainTotalCnt,
} from "./Main.atom";

import { getUserDetail } from "@/module/user/user";

// 업무 설정 modal
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  // minHeight: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// 사업장 설정 modal
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const List = () => {
  const router = useRouter();
  const { userInfo } = getUserDetail();
  const [data, setData] = useAtom(mainList);
  const mailType = useAtomValue(mainTopBarIdx);
  const [totalCnt, setTotalCnt] = useAtom(mainTotalCnt);
  const [mailIdx, setMailIdx] = useState<number>();
  const [type, setType] = useState("");

  // 사업장 설정
  const [coBdwkType, setCoBdwkType] = useState("co");
  const [openComp, setOpenComp] = useState(false);
  const [compCd, setCompCd] = useState("");
  const [compTxt, setCompTxt] = useState("");
  const [bdwkTxt, setBdwkTxt] = useState("");
  const [empid, setEmpid] = useState("");
  const [empnm, setEmpnm] = useState("");
  const [compList, setCompList] = useState<any[]>([]);
  const [searchCompType, setSearchCompType] = useState("name");
  const [searchCompWord, setSearchCompWord] = useState("");
  const [isCompChanged, setIsCompChanged] = useAtom(mainCompChanged);
  const [compbtnIndex, setCompBtnIndex] = useState<number>();

  // 업무 설정
  const [openUpmu, setOpenUpmu] = useState(false);
  const [upmuCd, setUpmuCd] = useState("");
  const [upmuTxt, setUpmuTxt] = useState("");
  const [upmuList, setUpmuList] = useState<any[]>([]);
  const [docCd, setDocCd] = useState("");
  const [docTxt, setDocTxt] = useState("");
  const [docList, setDocList] = useState<any[]>([]);
  const [isTextChanged, setIsTextChanged] = useAtom(mainTextChanged);
  const [btnIndex, setBtnIndex] = useState<number>();

  // PDF 미리보기
  const [fileCd, setFileCd] = useState<number>();
  const [fileType, setFileType] = useState("");

  const upmuSelList = useMemo(() => {
    const upmuSelList: { id: any; val: any }[] = [];
    if (upmuList?.length) {
      for (let upmu of upmuList) {
        upmuSelList.push({
          id: upmu["CD"],
          val: upmu["CDNM"],
        });
      }
    }
    return upmuSelList;
  }, [upmuList]);

  const docSelList = useMemo(() => {
    const docSelList: { id: any; val: any }[] = [];
    if (docList?.length) {
      for (let doc of docList) {
        docSelList.push({
          id: doc["CD"],
          val: doc["CDNM"],
        });
      }
    }
    return docSelList;
  }, [docList]);

  const upmuSetOpen = (i: number, idx: number, type: any, fileCD: any, fileType: any) => {
    setBtnIndex(i);
    setMailIdx(idx);
    setType(type);
    setOpenUpmu(true);
    setFileCd(fileCD);
    setFileType(fileType);
  };

  const compSetOpen = (i: number, idx: number, type: any) => {
    setCompBtnIndex(i);
    setMailIdx(idx);
    setType(type);
    // getCompList(); // 데이터가 너무 많으니, 검색어 입력시 리스트 표출
    setOpenComp(true);
  };

  const goSaveCheck = () => {
    if (upmuCd == "" || upmuCd == null) {
      alert("업무를 선택하세요.");
    } else if (docCd == "" || docCd == null) {
      alert("문서를 선택하세요.");
    } else if (confirm("업무를 설정하시겠습니까?")) {
      goUpmuSave();
    }
  };

  const getUpmuList = useCallback(async () => {
    const getUpmuList = await axios
      .post("/upmuList", {})
      .then((res) => {
        setUpmuList(res.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const getDocList = useCallback(async (upmuCd: any) => {
    const docList = await axios
      .post("/docList", {
        upmuCd: upmuCd,
      })
      .then((res) => {
        setDocList(res.data);
      });
  }, []);

  const getCompList = useCallback(async () => {
    if (!coBdwkType) {
      alert("사업장/현장 타입을 선택해 주세요.");
      return;
    }
    if (!searchCompType) {
      alert("검색 유형을 선택해 주세요.");
      return;
    }
    if (!searchCompWord) {
      alert("검색값을 입력해 주세요.");
      return;
    }
    try {
      const res = await axios.post("/compList", {
        // 사업장 검색 조건 넣기
        coBdwkType: coBdwkType,
        searchCompType: searchCompType,
        searchCompWord: searchCompWord,
      });
      setCompList(res.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      // 필요시 오류 처리 추가
    }
  }, [coBdwkType, searchCompType, searchCompWord]);

  useEffect(() => {
    getUpmuList();
    /* eslint-disable-next-line */ // 처음 랜더 됐을 때만 돌린다. 의존성이 있으면 의존성 실행 혹은 변경 때마다 돌아감 > 백에 계속 요청
  }, []);

  async function clickCheck(
    coid: any,
    conm: any,
    bdwkCd: any,
    bdwkNm: any,
    empid: any,
    empnm: any,
    smunionCd: any,
    smunionNm: any,
  ) {
    // 지사코드가 비어있는 경우
    if (!smunionCd) {
      return false;
    }

    let str = "";
    if (coBdwkType == "co") {
      str = "사업장을 " + conm + "( " + coid + " )" + "로 설정하시겠습니까?";
      bdwkCd = "";
      bdwkNm = "";
    } else if (coBdwkType == "bdwk") {
      str = "현장을 " + bdwkNm + "( " + bdwkCd + " )" + "로 설정하시겠습니까?";
    }

    if (confirm(str)) {
      setCompTxt(conm);
      setEmpnm(empnm);
      setBdwkTxt(bdwkNm);

      // const compData = {
      //   method: "POST",
      //   body: JSON.stringify({ mailIdx, type, coid, conm, empid, empnm, smunionCd, smunionNm }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Cookie: JSON.stringify({ userInfo }),
      //   },
      // };
      // const response = await fetch("https://api.kbz.co.kr/email/saveComp", compData);
      // const response = await fetch("http://localhost:8080/email/saveComp", compData);

      try {
        const response = await axios.post(
          "/saveComp",
          JSON.stringify({
            mailIdx,
            mailType,
            type,
            coid,
            conm,
            bdwkCd,
            bdwkNm,
            empid,
            empnm,
            smunionCd,
            smunionNm,
          }),
          {
            headers: {
              "Content-Type": "application/json", // 요청 본문의 타입 설정
            },
          },
        );

        if (response.data.code == "F" || response.status != 200) {
          alert("저장에 실패했습니다.");
        } else {
          alert("저장되었습니다.");
          // 화면 새로고침
          // router.reload();

          const newIsCompChanged = [...isCompChanged];
          if (compbtnIndex !== undefined) {
            newIsCompChanged[compbtnIndex] = true;
          }
          setIsCompChanged(newIsCompChanged);

          // 변경된 값만 reload
          const preData = [...data];
          if (compbtnIndex !== undefined) {
            preData[compbtnIndex].conm = conm;
            preData[compbtnIndex].bdwknm = bdwkNm;
            preData[compbtnIndex].empnm = empnm;
            if (response.data.ssreqno > 0) {
              preData[compbtnIndex].shp_yn = "Y";
            }
          }
          setData(preData);

          //창닫기
          closeComp();
        }
      } catch (err: any) {
        if (err.response) {
          // 상태 코드가 401일 경우 (Unauthorized)
          if (err.response.status === 401) {
            if (err.response.data.msg === "JWT Expired or Invalid") {
              console.error("JWT token is expired or invalid");
              alert("토큰이 만료되어 로그아웃 됩니다.");
              cookieUtil.removeCookie("_sd");
              sessionStorage.clear(); // FIXME: 하나하나 삭제해주기
              router.push("/", undefined, { shallow: true });
            } else if (err.response.data.msg === "API Key Error") {
              // API Key 인증 실패 처리
              console.log("API Key is missing or invalid.");
              alert("API KEY 인증 실패");
              // API Key 입력 화면으로 리다이렉트 등
            }
          } else {
            console.error("API Error:", err.response.data); // 다른 에러 메시지
          }
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error:", err.message);
        }
      }
    }
  }

  async function goUpmuSave() {
    const userid = userInfo?.userid;
    const smunionCd = userInfo?.smunionCd;

    // const upMuData = {
    //   method: "POST",
    //   body: JSON.stringify({ mailIdx, type, upmuCd, docCd, userid, smunionCd }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    try {
      // const response = await fetch("http://localhost:8080/email/saveUpmu", upMuData);
      // const response = await fetch("https://api.kbz.co.kr/email/saveUpmu", upMuData);

      const response = await axios.post(
        "/saveUpmu",
        JSON.stringify({ mailIdx, type, upmuCd, docCd, userid, smunionCd, mailType }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.code == "F" || response.status != 200) {
        alert("저장에 실패했습니다.");
      } else {
        alert("저장되었습니다.");
        // 화면 새로고침
        // router.reload();

        const newIsTextChanged = [...isTextChanged];
        if (btnIndex !== undefined) {
          newIsTextChanged[btnIndex] = true;
        }
        setIsTextChanged(newIsTextChanged);

        // 변경된 업무값만 reload
        const preData = [...data];
        if (btnIndex !== undefined) {
          preData[btnIndex].UPMU_TXT = upmuTxt;
          preData[btnIndex].DOC_TXT = docTxt;
        }
        setData(preData);

        //창닫기
        closeUpmu();
      }
    } catch (err: any) {
      if (err.response) {
        // 상태 코드가 401일 경우 (Unauthorized)
        if (err.response.status === 401) {
          if (err.response.data.msg === "JWT Expired or Invalid") {
            console.error("JWT token is expired or invalid");
            alert("토큰이 만료되어 로그아웃 됩니다.");
            cookieUtil.removeCookie("_sd");
            sessionStorage.clear(); // FIXME: 하나하나 삭제해주기
            router.push("/", undefined, { shallow: true });
          } else if (err.response.data.msg === "API Key Error") {
            // API Key 인증 실패 처리
            console.log("API Key is missing or invalid.");
            alert("API KEY 인증 실패");
            // API Key 입력 화면으로 리다이렉트 등
          }
        } else {
          console.error("API Error:", err.response.data); // 다른 에러 메시지
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error:", err.message);
      }
    }
  }

  const closeComp = () => {
    setOpenComp(false);
    setCoBdwkType("co");
    setSearchCompType("name");
    setSearchCompWord("");
    setCompList([]); // 초기화
  };

  const closeUpmu = () => {
    setOpenUpmu(false);
    setUpmuCd("");
    setDocCd("");
    getDocList("");
  };

  async function onClickDownload(fileCD: any, fileNM: any) {
    // var tmpUrl = "https://api.kbz.co.kr/email/download";
    // await axios({
    //   method: "POST",
    //   url: tmpUrl,
    //   data: fileCD,
    //   responseType: "blob", // Set the response type to 'blob' to handle binary data
    // })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", fileNM); // Set the desired filename and extension
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading file:", error);
    //   });

    try {
      // const apiKey = process.env.REQUEST_API_KEY;
      // const response = await axios.post("/download", fileCD, { responseType: "blob" });
      const response = await axios.post(
        "/download",
        JSON.stringify({
          fileCD,
          mailType,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileNM); // Set the desired filename and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      if (err.response) {
        // 상태 코드가 401일 경우 (Unauthorized)
        if (err.response.status === 401) {
          if (err.response.data.msg === "JWT Expired or Invalid") {
            console.error("JWT token is expired or invalid");
            alert("토큰이 만료되어 로그아웃 됩니다.");
            cookieUtil.removeCookie("_sd");
            sessionStorage.clear(); // FIXME: 하나하나 삭제해주기
            router.push("/", undefined, { shallow: true });
          } else if (err.response.data.msg === "API Key Error") {
            // API Key 인증 실패 처리
            console.log("API Key is missing or invalid.");
            alert("API KEY 인증 실패");
          }
        } else {
          console.error("API Error:", err.response.data); // 다른 에러 메시지
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error:", err.message);
      }
    }
  }

  async function goZipDownload(mailIdx: any) {
    // var tmpUrl = "https://api.kbz.co.kr/email/zipDown";
    // await axios({
    //   method: "POST",
    //   url: tmpUrl,
    //   data: mailIdx,
    //   responseType: "blob", // Set the response type to 'blob' to handle binary data
    // })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", mailIdx + "_zip.zip"); // Set the desired filename and extension
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading file:", error);
    //   });

    try {
      // const apiKey = process.env.REQUEST_API_KEY;
      // const response = await axios.post("/zipDown", mailIdx, { responseType: "blob" });
      const response = await axios.post(
        "/zipDown",
        JSON.stringify({
          mailIdx,
          mailType,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", mailIdx + "_zip.zip"); // Set the desired filename and extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      if (err.response) {
        // 상태 코드가 401일 경우 (Unauthorized)
        if (err.response.status === 401) {
          if (err.response.data.msg === "JWT Expired or Invalid") {
            console.error("JWT token is expired or invalid");
            alert("토큰이 만료되어 로그아웃 됩니다.");
            cookieUtil.removeCookie("_sd");
            sessionStorage.clear(); // FIXME: 하나하나 삭제해주기
            router.push("/", undefined, { shallow: true });
          } else if (err.response.data.msg === "API Key Error") {
            // API Key 인증 실패 처리
            console.log("API Key is missing or invalid.");
            alert("API KEY 인증 실패");
            // API Key 입력 화면으로 리다이렉트 등
          }
        } else {
          console.error("API Error:", err.response.data); // 다른 에러 메시지
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error:", err.message);
      }
    }
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            backgroundColor: "aliceblue",
            textAlign: "center",
            height: "50px",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <div style={{ width: "5%" }}>No</div>
          {(mailType === 0 || mailType === 3) && <div style={{ width: "3%" }}>구분</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "10%" }}>발신자</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "9%" }}>수신자</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "15%" }}>업체명</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "15%" }}>현장명</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "5%" }}>담당자</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "5%" }}>첨부파일</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "19%" }}>제목</div>}
          {(mailType === 0 || mailType === 3) && <div style={{ width: "9%" }}>날짜</div>}
          {(mailType === 0 || mailType === 3) && (
            <div style={{ width: "4%", fontSize: "13px" }}>
              상황판
              <br />
              연동
            </div>
          )}

          {(mailType === 1 || mailType === 4) && <div style={{ width: "11%" }}>발신자</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "12%" }}>수신자</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "12%" }}>업체명</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "15%" }}>현장명</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "5%" }}>담당자</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "5%" }}>첨부파일</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "17%" }}>제목</div>}
          {(mailType === 1 || mailType === 4) && <div style={{ width: "12%" }}>날짜</div>}
          {(mailType === 1 || mailType === 4) && (
            <div style={{ width: "3%", fontSize: "13px" }}>
              상황판
              <br />
              연동
            </div>
          )}

          {(mailType === 2 || mailType === 5) && <div style={{ width: "10%" }}>발신자</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "10%" }}>수신자</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "10%" }}>업체명</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "13%" }}>현장명</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "7%" }}>담당자</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "4%" }}>첨부파일</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "14%" }}>제목</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "10%" }}>발신일</div>}
          {(mailType === 2 || mailType === 5) && <div style={{ width: "10%" }}>수신일</div>}
          {(mailType === 2 || mailType === 5) && (
            <div style={{ width: "5%", fontSize: "13px" }}>
              상황판
              <br />
              연동
            </div>
          )}

          <div style={{ width: "1%" }}></div>
        </div>
        {data.length === 0 && (
          <Typography style={{ marginTop: "20px", textAlign: "center" }}>데이터가 없습니다.</Typography>
        )}
        {data.map((row: any, i) => (
          <Accordion key={row.mail_cd}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{ fontSize: "5px" }}
            >
              <Typography style={{ width: "5%", textAlign: "center", fontSize: "13px" }}>
                {row.mail_cd}
                {/* {i + 1} */}
              </Typography>
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "3%", textAlign: "center", fontSize: "13px" }}>
                  {row.type === "I" ? "수신" : "발신"}
                </Typography>
              )}
              {/* {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>
                  {(row.UPMU_TXT === undefined || row.UPMU_TXT === null || row.UPMU_TXT === "") &&
                  isTextChanged[i] === false ? (
                    row.conm === undefined || row.conm === null || row.conm === "" ? (
                      "미정"
                    ) : (
                      <Button
                        variant="contained"
                        disableRipple
                        onClick={() => upmuSetOpen(i, row.mail_cd as number, row.type as string)}
                        style={{ fontSize: "13px" }}
                      >
                        업무설정
                      </Button>
                    )
                  ) : (
                    row.UPMU_TXT + " > " + row.DOC_TXT
                  )}
                </Typography>
              )} */}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.from_mail}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.email}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "15%", textAlign: "center", fontSize: "13px" }}>
                  {(row.conm === undefined || row.conm === null || row.conm === "") &&
                  isCompChanged[i] === false ? (
                    <Button
                      variant="contained"
                      disableRipple
                      onClick={() => compSetOpen(i, row.mail_cd as number, row.type as string)}
                      style={{ fontSize: "13px" }}
                    >
                      사업장 지정
                    </Button>
                  ) : (
                    row.conm
                  )}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "16%", textAlign: "center", fontSize: "13px" }}>
                  {row.bdwknm === undefined || row.bdwknm === null || row.bdwknm === ""
                    ? ""
                    : row.bdwknm}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "5%", textAlign: "center", fontSize: "13px" }}>
                  {(row.empnm === undefined || row.empnm === null || row.empnm === "") &&
                  isCompChanged[i] === false
                    ? ""
                    : row.empnm}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "5%", textAlign: "center", fontSize: "13px" }}>
                  {row.file_yn === "Y" ? "📁" : "　"}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>
                  {row.title}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.create_date}
                </Typography>
              )}
              {(mailType === 0 || mailType === 3) && (
                <Typography style={{ width: "3%", textAlign: "center", fontSize: "13px" }}>
                  {row.shp_yn === "Y" ? "✔️" : "⌛"}
                </Typography>
              )}
              {/* {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>
                  {(row.UPMU_TXT === undefined || row.UPMU_TXT === null || row.UPMU_TXT === "") &&
                  isTextChanged[i] === false ? (
                    row.conm === undefined || row.conm === null || row.conm === "" ? (
                      "미정"
                    ) : (
                      <Button
                        variant="contained"
                        disableRipple
                        onClick={() => upmuSetOpen(i, row.mail_cd as number, row.type as string)}
                        style={{ fontSize: "13px" }}
                      >
                        업무설정
                      </Button>
                    )
                  ) : (
                    row.UPMU_TXT + " > " + row.DOC_TXT
                  )}
                </Typography>
              )} */}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "12%", textAlign: "center", fontSize: "13px" }}>
                  {row.from_mail}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "12%", textAlign: "center", fontSize: "13px" }}>
                  {row.email}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "15%", textAlign: "center", fontSize: "13px" }}>
                  {(row.conm === undefined || row.conm === null || row.conm === "") &&
                  isCompChanged[i] === false ? (
                    <Button
                      variant="contained"
                      disableRipple
                      onClick={() => compSetOpen(i, row.mail_cd as number, row.type as string)}
                      style={{ fontSize: "13px" }}
                    >
                      사업장 지정
                    </Button>
                  ) : (
                    row.conm
                  )}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "16%", textAlign: "center", fontSize: "13px" }}>
                  {row.bdwknm === undefined || row.bdwknm === null || row.bdwknm === ""
                    ? ""
                    : row.bdwknm}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "5%", textAlign: "center", fontSize: "13px" }}>
                  {(row.empnm === undefined || row.empnm === null || row.empnm === "") &&
                  isCompChanged[i] === false
                    ? ""
                    : row.empnm}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "5%", textAlign: "center", fontSize: "13px" }}>
                  {row.file_yn === "Y" ? "📁" : "　"}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "20%", textAlign: "center", fontSize: "13px" }}>
                  {row.title}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.create_date}
                </Typography>
              )}
              {(mailType === 1 || mailType === 4) && (
                <Typography style={{ width: "7%", textAlign: "center", fontSize: "13px" }}>
                  {row.shp_yn === "Y" ? "✔️" : "⌛"}
                </Typography>
              )}
              {/* {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "15%", textAlign: "center", fontSize: "13px" }}>
                  {(row.UPMU_TXT === undefined || row.UPMU_TXT === null || row.UPMU_TXT === "") &&
                  isTextChanged[i] === false ? (
                    row.conm === undefined || row.conm === null || row.conm === "" ? (
                      "미정"
                    ) : (
                      <Button
                        variant="contained"
                        disableRipple
                        onClick={() => upmuSetOpen(i, row.mail_cd as number, row.type as string)}
                        style={{ fontSize: "13px" }}
                      >
                        업무설정
                      </Button>
                    )
                  ) : (
                    row.UPMU_TXT + " > " + row.DOC_TXT
                  )}
                </Typography>
              )} */}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "11%", textAlign: "center", fontSize: "13px" }}>
                  {row.from_mail}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.email}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {(row.conm === undefined || row.conm === null || row.conm === "") &&
                  isCompChanged[i] === false ? (
                    <Button
                      variant="contained"
                      disableRipple
                      onClick={() => compSetOpen(i, row.mail_cd as number, row.type as string)}
                      style={{ fontSize: "13px" }}
                    >
                      사업장 지정
                    </Button>
                  ) : (
                    row.conm
                  )}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "15%", textAlign: "center", fontSize: "13px" }}>
                  {row.bdwknm === undefined || row.bdwknm === null || row.bdwknm === ""
                    ? ""
                    : row.bdwknm}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "7%", textAlign: "center", fontSize: "13px" }}>
                  {(row.empnm === undefined || row.empnm === null || row.empnm === "") &&
                  isCompChanged[i] === false
                    ? ""
                    : row.empnm}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "4%", textAlign: "center", fontSize: "13px" }}>
                  {row.file_yn === "Y" ? "📁" : "　"}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "15%", textAlign: "center", fontSize: "13px" }}>
                  {row.title}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.create_date}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.read_date}
                </Typography>
              )}
              {(mailType === 2 || mailType === 5) && (
                <Typography style={{ width: "7%", textAlign: "center", fontSize: "13px" }}>
                  {row.shp_yn === "Y" ? "✔️" : "⌛"}
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {row.file_yn === "Y" && (
                  <span key={row.mail_cd} style={{ display: "block", marginBottom: "15px" }}>
                    첨부파일 📁 &nbsp;
                    {row.fileList.length > 1 && (
                      <Button
                        variant="outlined"
                        disableRipple
                        onClick={() => goZipDownload(row.mail_cd)}
                      >
                        압축파일 다운로드
                      </Button>
                    )}
                  </span>
                )}
                {row.fileList &&
                  row.fileList.map((fileData: any) => (
                    <span key={fileData.FILE_CD} style={{ display: "block" }}>
                      {fileData.FILE_NM}&nbsp;
                      <Button
                        variant="outlined"
                        disableRipple
                        onClick={() => onClickDownload(fileData.FILE_CD, fileData.FILE_NM)}
                      >
                        다운로드
                      </Button>
                      {/*mailType > 2 && (
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="outlined"
                          disableRipple
                          onClick={() =>
                            upmuSetOpen(
                              i,
                              row.mail_cd as number,
                              row.type as string,
                              fileData.FILE_CD,
                              fileData.FILE_EXT,
                            )
                          }
                        >
                          문서수발
                        </Button>
                      )*/}
                    </span>
                  ))}
                <br />
              </Typography>
              <Typography dangerouslySetInnerHTML={{ __html: row.content }}></Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Modal
        open={openUpmu}
        onClose={() => {
          setOpenUpmu(false);
          setUpmuCd("");
          setDocCd("");
          getDocList("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3 style={{ textAlign: "center" }}>문서 접수</h3>
          </div>
          <div style={{ margin: "10px" }}>
            업무 분류 : &nbsp;
            <Select
              value={upmuCd}
              onChange={(e) => {
                setUpmuCd(e.target.value);
                getDocList(e.target.value);
                const selectedItem = upmuSelList.find((a) => a.id === e.target.value);
                if (selectedItem) {
                  setUpmuTxt(selectedItem.val);
                  console.log(`Selected val: ${selectedItem.val}`); // 선택한 a.val 출력
                }
              }}
              displayEmpty
              style={{ fontSize: "small", maxHeight: "28px", minWidth: "200px" }}
            >
              <MenuItem value="" style={{ fontSize: "small" }}>
                선택
              </MenuItem>
              {upmuSelList.map((a) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem key={a.id} value={a.id} style={{ fontSize: "small" }}>
                    {a.val}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div style={{ margin: "10px" }}>
            문서 분류 : &nbsp;
            <Select
              value={docCd}
              onChange={(e) => {
                setDocCd(e.target.value);
                const selectedItem = docSelList.find((a) => a.id === e.target.value);
                if (selectedItem) {
                  setDocTxt(selectedItem.val);
                  console.log(`Selected val: ${selectedItem.val}`); // 선택한 a.val 출력
                }
              }}
              displayEmpty
              style={{ fontSize: "small", maxHeight: "28px", minWidth: "200px" }}
            >
              <MenuItem value="" style={{ fontSize: "small" }}>
                선택
              </MenuItem>
              {docSelList.map((a) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem key={a.id} value={a.id} style={{ fontSize: "small" }}>
                    {a.val}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          {/* <div>
            <h4 style={{ textAlign: "center" }}>페이지 지정</h4>
          </div> */}
          {fileCd !== undefined && (
            <PdfPreview fileCD={fileCd} mailType={mailType} fileType={fileType} />
          )}
          <Button
            variant="outlined"
            disableRipple
            onClick={() => {
              closeUpmu();
            }}
            style={{ float: "right", marginTop: "20px" }}
          >
            닫기
          </Button>
          <Button
            variant="outlined"
            disableRipple
            onClick={() => goSaveCheck()}
            style={{ float: "right", marginTop: "20px", marginRight: "10px" }}
          >
            저장
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openComp}
        onClose={() => {
          closeComp();
        }}
      >
        <Box sx={style2}>
          <div>
            <h3 style={{ textAlign: "center" }}>사업장/현장 설정</h3>
          </div>
          <div style={{ margin: "10px", display: "flex" }}>
            <RadioGroup
              aria-label="setting-type"
              name="setting-type"
              value={coBdwkType}
              onChange={(e) => {
                setCoBdwkType(e.target.value);
                setSearchCompType("name");
                setSearchCompWord("");
                setCompList([]); // 초기화
              }}
              row
            >
              <FormControlLabel
                value="co"
                control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "small" } }} />}
                label="사업장"
                sx={{ fontSize: "small" }}
              />
              <FormControlLabel
                value="bdwk"
                control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: "small" } }} />}
                label="현장"
                sx={{ fontSize: "small" }}
              />
            </RadioGroup>

            <Select
              value={searchCompType}
              onChange={(e) => {
                setSearchCompType(e.target.value);
              }}
              displayEmpty
              style={{
                fontSize: "small",
                maxHeight: "28px",
                minWidth: "200px",
                marginRight: "20px",
              }}
            >
              <MenuItem value="name" style={{ fontSize: "small" }}>
                사업장명
              </MenuItem>
              <MenuItem value="code" style={{ fontSize: "small" }}>
                사업장코드
              </MenuItem>
              {coBdwkType == "co" && (
                <>
                  <MenuItem value="rgno" style={{ fontSize: "small" }}>
                    사업자번호
                  </MenuItem>
                </>
              )}
              {coBdwkType == "bdwk" && (
                <>
                  <MenuItem value="bdwkName" style={{ fontSize: "small" }}>
                    현장명
                  </MenuItem>
                  <MenuItem value="bdwkCode" style={{ fontSize: "small" }}>
                    현장코드
                  </MenuItem>
                </>
              )}
              <MenuItem value="addr" style={{ fontSize: "small" }}>
                주소
              </MenuItem>
              <MenuItem value="tel" style={{ fontSize: "small" }}>
                전화번호
              </MenuItem>
              <MenuItem value="fax" style={{ fontSize: "small" }}>
                팩스번호
              </MenuItem>
            </Select>
            <Stack sx={{ height: 28, marginRight: 2, padding: 0 }}>
              <TextField
                onChange={(e) => setSearchCompWord(e.target.value)}
                hiddenLabel
                id="outlined-basic"
                variant="outlined"
                sx={{
                  width: { sm: 200, md: 300 },
                  "& .MuiInputBase-root": { height: 28 },
                  "& .MuiFormControl-root": { marginBottom: 0 },
                  mb: 2,
                  fontSize: "small",
                  padding: 0,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getCompList();
                  }
                }}
                value={searchCompWord}
              />
            </Stack>
            <Button
              variant="contained"
              onClick={() => {
                getCompList();
              }}
            >
              검색
            </Button>
          </div>
          <TableContainer component={Paper} sx={{ maxHeight: 400, minHeight: 400, overflow: "auto" }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead sx={{ backgroundColor: "aliceblue" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                  >
                    사업장코드
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                  >
                    사업장명
                  </TableCell>
                  {coBdwkType == "bdwk" && (
                    <>
                      <TableCell
                        align="center"
                        sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                      >
                        현장코드
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                      >
                        현장명
                      </TableCell>
                    </>
                  )}
                  {coBdwkType == "co" && (
                    <>
                      <TableCell
                        align="center"
                        sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                      >
                        메일
                      </TableCell>
                    </>
                  )}
                  <TableCell
                    align="center"
                    sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                  >
                    담당자
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {compList.map((row: any) => (
                  <TableRow
                    key={row.COID}
                    style={{ cursor: "pointer" }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5", // hover 시 색상
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    onClick={() => {
                      clickCheck(
                        row.COID,
                        row.CONM,
                        row.BDWKCD,
                        row.BDWKNM,
                        row.EMPID,
                        row.EMPNM,
                        row.SMUNIONCD,
                        row.SMUNIONNM,
                      );
                    }}
                  >
                    <TableCell align="center">{row.COID}</TableCell>
                    <TableCell align="center">{row.CONM}</TableCell>
                    {coBdwkType == "bdwk" && (
                      <>
                        <TableCell align="center">{row.BDWKCD}</TableCell>
                        <TableCell align="center">{row.BDWKNM}</TableCell>
                      </>
                    )}
                    {coBdwkType == "co" && (
                      <>
                        <TableCell align="center">{row.EMAIL}</TableCell>
                      </>
                    )}
                    <TableCell align="center">{row.EMPNM}</TableCell>
                    <TableCell style={{ display: "none" }}>{row.SMUNIONCD}</TableCell>
                    <TableCell style={{ display: "none" }}>{row.SMUNIONNM}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="outlined"
            disableRipple
            onClick={() => {
              closeComp();
            }}
            style={{ float: "right", marginTop: "20px" }}
          >
            닫기
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default List;
