import Header from "@/components/Header";
import { getUserDetail } from "@/module/user/user";
import axios from "@/utils/axios";
import { cryptoUtil } from "@/utils/crypto";
// 테이블
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cookieUtil } from "@/utils/cookie";

// JoditEditor2 동적 임포트 (SSR 비활성화)
const JoditEditor2 = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function Write() {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<any>(null); // 에디터를 관리할 ref
  const router = useRouter();
  const { userInfo } = getUserDetail();
  const editorContentRef = useRef<string>(""); // 에디터 내용 관리 (useRef로 상태를 관리)
  const scrollPositionRef = useRef<number>(0); // 스크롤 위치

  // 사업장 검색 처리
  const [openRecv, setOpenRecv] = useState(false);
  const [compTxt, setCompTxt] = useState("");
  const [empnm, setEmpnm] = useState("");
  const [compList, setCompList] = useState<any[]>([]);
  const [searchCompType, setSearchCompType] = useState("");
  const [searchCompWord, setSearchCompWord] = useState("");

  // 수신자 텍스트 필드와 버튼 관리
  const [selectedEmail, setSelectedEmail] = useState("email1");
  const [locations, setLocations] = useState([{ receiverEmail: "", id: 1 }]);
  const [recvNo, setRevcNo] = useState(0);

  // 발신자 selectbox
  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderList, setSenderList] = useState<any[]>([]);

  // 템플릿 사용여부와 템플릿 selectBox
  const [sendType, setSendType] = useState("");
  const [tempId, setTempId] = useState("");
  const [tempNm, setTempNm] = useState("");
  const [tempList, setTempList] = useState<any[]>([]);
  const [propList, setPropList] = useState<any[]>([]);
  const [textFormData, setTextFormData] = useState<Partial<Record<number, string>>>({});

  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // 파일 첨부 후 스크롤 위치 복원
  useEffect(() => {
    if (scrollPositionRef.current !== 0) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [files]);

  const senderSelList = useMemo(() => {
    const senderSelList: { id: any; val: any }[] = [];
    if (senderList?.length) {
      for (let sender of senderList) {
        senderSelList.push({
          id: sender["ID"],
          val: sender["NAME"],
        });
      }
    }
    return senderSelList;
  }, [senderList]);

  const getsenderList = useCallback(async () => {
    const getsenderList = await axios
      .post("/senderList", {})
      .then((res) => {
        setSenderList(res.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const tempSelList = useMemo(() => {
    const tempSelList: { id: any; val: any }[] = [];
    if (tempList?.length) {
      for (let temp of tempList) {
        tempSelList.push({
          id: temp["TEMP_CD"],
          val: temp["UPMU_TXT"],
        });
      }
    }
    return tempSelList;
  }, [tempList]);

  const getTempList = useCallback(async () => {
    const getTempList = await axios
      .post("/listTemp", {})
      .then((res) => {
        setTempList(res.data);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  useEffect(() => {
    getsenderList();
    getTempList();
    /* eslint-disable-next-line */ // 처음 랜더 됐을 때만 돌린다. 의존성이 있으면 의존성 실행 혹은 변경 때마다 돌아감 > 백에 계속 요청
  }, []);

  const getPropList = useCallback(async (tempId: any) => {
    const formData = new FormData();
    formData.append("tempCd", tempId);

    const response = await axios.post("/tempData", formData).then((res) => {
      setPropList(res.data.propList);
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(propList) && propList.length > 0) {
      // propList가 변경될 때 textFormData 초기화
      const initialFormData = propList.reduce((acc: any, prop: any) => {
        acc[prop.PROPERTY] = ""; // 빈 문자열로 초기화
        return acc;
      }, {});
      setTextFormData(initialFormData);
    }
  }, [propList]);

  const handleInputChange = (propCd: number, value: string) => {
    setTextFormData((prev) => ({ ...prev, [propCd]: value }));
  };

  const editorConfig = {
    placeholder: "메일 내용을 입력하세요.",
    height: 600,
    toolbarSticky: false,
    removeButtons: [
      "brush",
      "file",
      "video",
      "find",
      "superscript",
      "subscript",
      "spellcheck",
      "ai-commands",
      "ai-assistant",
      "about",
      "fullsize",
      "preview",
      "speechRecognize",
      "source",
      "print",
      "image",
    ],
    showVoice: false,
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    theme: "default",
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: "http://localhost:8080/email/addTempImage",
      format: "json",
      method: "POST",
      isSuccess: (response: any) => response.status === "S",
      prepareData: function (formData: FormData) {
        formData.append("mode", "My Files");
        formData.append("name", "image");
        formData.append("image", formData.get("files[0]") as Blob);
        formData.delete("files[0]");
        return formData;
      },
      process: async function (files: File[]) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files[]", file));
        const preparedFormData = this.prepareData(formData);

        try {
          const response = await axios.post(this.url, preparedFormData);
          if (response.data && response.data.url) {
            return {
              files: [response.data.url],
              path: response.data.path || "",
            };
          } else {
            throw new Error("파일 업로드 실패: 응답에 URL이 없음");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            alert(`이미지 업로드 중 오류 발생: ${error.message}`);
          } else {
            alert("알 수 없는 오류 발생");
          }
        }
      },
      defaultHandlerSuccess: (resp: any) => {
        const fileUrl = resp.url || "";
        const editorInstance = editorRef.current;

        if (editorInstance) {
          try {
            editorInstance.value += `<img src="${fileUrl}" alt="Uploaded Image" />`;
            console.log("Image inserted using value property");
          } catch (error: unknown) {
            if (error instanceof Error) {
              alert(`이미지 삽입 오류: ${error.message}`);
              console.error("Image insertion error:", error);
            } else {
              alert("알 수 없는 오류 발생");
            }
          }
        } else {
          alert("Editor가 초기화되지 않았거나 editor.selection이 없습니다.");
        }
      },
    },
    events: {
      ready: () => {
        const editorInstance = editorRef.current;
        if (editorInstance) {
          console.log("Editor is ready!");
        } else {
          alert("Editor 초기화 실패");
        }
      },
    },
  };

  const goList = () => {
    const txt = "페이지를 벗어나면 내용이 저장되지 않습니다. 이동하시겠습니까?";
    if (confirm(txt)) {
      router.push(`/`);
    }
  };

  async function sendMail2() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    const payload = locations.map((location) => location.receiverEmail);
    // const payload = locations.map((location) => location.receiverEmail).join(",");
    const hasEmptyField = locations.some((location) => !location.receiverEmail.trim());

    if (!senderId) {
      alert("발신자 메일주소를 선택하세요");
      return false;
    }
    if (hasEmptyField) {
      alert("모든 수신자 메일주소를 입력해주세요.");
      return false;
    }
    for (let location of locations) {
      const mail = location.receiverEmail.trim();
      if (!emailRegex.test(mail)) {
        alert(`수신자 메일주소 "${mail}" 형식이 올바르지 않습니다.`);
        return false;
      }
    }
    if (!tempId) {
      alert("템플릿을 선택 해주세요.");
      return false;
    }
    for (let key in textFormData) {
      if (textFormData[key]?.trim() === "") {
        alert(`필수 입력 변수 항목 "${key}"을(를) 입력해주세요.`);
        return false;
      }
    }

    const sendData = {
      email_list: payload,
      from_mail: senderId,
      temp_cd: tempId,
      temp_prop: JSON.stringify(textFormData),
    };

    const body = cryptoUtil.encrypt(JSON.stringify(sendData));

    const formData = new FormData();
    formData.append("body", body);

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
      // } else {
      //   formData.append("files", new Blob([]), "empty.txt");
    }

    try {
      const response = await axios.post("/smtp", formData);

      if (response.data.code == "F") {
        if (response.data.msg != "") {
          alert("전송실패 : " + response.data.msg);
        } else {
          alert("전송실패.");
        }
      } else {
        alert("전송되었습니다.");
        router.reload();
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

  async function sendMail() {
    const payload = locations.map((location) => location.receiverEmail);
    // const payload = locations.map((location) => location.receiverEmail).join(",");
    const hasEmptyField = locations.some((location) => !location.receiverEmail.trim());

    if (!senderId) {
      alert("발신자 메일주소를 선택하세요");
      return false;
    }
    if (hasEmptyField) {
      alert("모든 수신자 메일주소를 입력해주세요.");
      return false;
    }
    if (!title) {
      alert("제목을 입력하세요");
      return false;
    }
    if (!editorContentRef.current?.replace(/<[^>]*>/g, "").trim()) {
      alert("내용을 입력하세요");
      return false;
    }

    const sendData = {
      email_list: payload,
      title: title,
      content: editorContentRef.current,
      from_mail: senderId,
    };

    const body = cryptoUtil.encrypt(JSON.stringify(sendData));

    const formData = new FormData();
    formData.append("body", body);

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", new Blob([]), "empty.txt");
    }

    try {
      const response = await axios.post("/smtp", formData);

      if (response.data.code == "F") {
        if (response.data.msg != "") {
          alert("전송실패 : " + response.data.msg);
        } else {
          alert("전송실패.");
        }
      } else {
        alert("전송되었습니다.");
        router.reload();
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

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const newFiles = selectedFiles.filter(
        (selectedFile) => !files.some((existingFile) => existingFile.name === selectedFile.name),
      );

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // 파일 선택 후 input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 스크롤 위치 저장
      scrollPositionRef.current = window.scrollY;
    }
  };

  // 파일을 드래그하여 첨부하는 기능 (드래그앤드롭)
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const droppedFiles = Array.from(event.dataTransfer.files);
      const newFiles = droppedFiles.filter(
        (droppedFile) => !files.some((existingFile) => existingFile.name === droppedFile.name),
      );

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [files],
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleEditorChange = (newContent: string) => {
    editorContentRef.current = newContent;
  };

  // 발신자 수신자 설정 부분
  // 발신자 수신자 설정 부분
  // 발신자 수신자 설정 부분
  // 발신자 수신자 설정 부분
  // 발신자 수신자 설정 부분

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEmail(event.target.value);
    // 선택된 이메일을 상태에 반영
    if (event.target.value === "email1") {
      setSenderEmail("help@kbz.co.kr");
    } else if (event.target.value === "email2") {
      setSenderEmail("premium@kbz.co.kr");
    } else if (event.target.value === "email3") {
      setSenderEmail("test@kbz.co.kr");
    }
  };

  const handleReceiverEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
  ) => {
    const updatedLocations = locations.map((loc) =>
      loc.id === id ? { ...loc, receiverEmail: (e.target as HTMLInputElement).value } : loc,
    );
    setLocations(updatedLocations);
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

  const getCompList = useCallback(async () => {
    if (!searchCompType) {
      alert("검색 유형을 선택해 주세요.");
      return;
    }

    if (!searchCompWord) {
      alert("검색값을 입력해 주세요.");
      return;
    }

    try {
      const res = await axios.post("/compListAll", {
        searchCompType: searchCompType,
        searchCompWord: searchCompWord,
      });
      setCompList(res.data);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      // 필요시 오류 처리 추가
    }
  }, [searchCompType, searchCompWord]);

  async function clickCheck(row: any) {
    if (!row.EMAIL) {
      alert("해당 사업장에 입력 된 메일정보가 없습니다.");
      return false;
    }

    const str = "수신자를 " + row.CONM + "( " + row.COID + " )" + "로 설정하시겠습니까?";
    if (confirm(str)) {
      setCompTxt(row.CONM);
      setReceiverEmailAtIndex(recvNo, row.EMAIL);
      closeRecv();
    }
  }

  const setReceiverEmailAtIndex = (index: any, newEmail: any) => {
    const updatedLocations = [...locations];
    updatedLocations[index].receiverEmail = newEmail;
    setLocations(updatedLocations);
  };

  const closeRecv = () => {
    setOpenRecv(false);
    setSearchCompType("");
    setSearchCompWord("");
    setCompList([]); // 초기화
  };

  // 사업장 추가
  const handleAddLocation = () => {
    setLocations((prevLocations) => [
      ...prevLocations,
      { id: Date.now(), receiverEmail: "" }, // 새로운 텍스트필드 추가
    ]);
  };

  // 사업장 삭제
  const handleRemoveLocation = (id: number) => {
    setLocations((prevLocations) => prevLocations.filter((location) => location.id !== id));
  };

  return (
    <>
      <div className="content">
        {mounted && <Header />}
        {/* <div style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 200, paddingRight: 200 }}> */}
        <div style={{ padding: 20 }}>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>발신자</h3>
              <FormControl component="fieldset">
                <Select
                  value={senderId}
                  onChange={(e) => {
                    setSenderId(e.target.value);
                    const selectedItem = senderSelList.find((a) => a.id === e.target.value);
                    if (selectedItem) {
                      setSenderName(selectedItem.val);
                      // console.log(`Selected val: ${selectedItem.val}`); // 선택한 a.val 출력
                    }
                  }}
                  displayEmpty
                  style={{ fontSize: "small", maxHeight: "36px", minWidth: "250px" }}
                >
                  <MenuItem value="" style={{ fontSize: "small" }}>
                    선택
                  </MenuItem>
                  {senderSelList.map((a) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <MenuItem key={a.id} value={a.id} style={{ fontSize: "small" }}>
                        {a.val + " ( " + a.id + " )"}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" height="60px" gap={2}>
                <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>수신자</h3>
                <Button
                  variant="outlined"
                  onClick={handleAddLocation}
                  sx={{
                    fontSize: "14px",
                    height: "60px",
                    padding: "6px 16px",
                    minHeight: "25px",
                  }}
                >
                  수신자 추가
                </Button>
              </Box>
              {locations.map((location, index) => (
                <Box key={location.id} display="flex" alignItems="center" gap={2} marginBottom={1}>
                  <TextField
                    variant="outlined"
                    value={location.receiverEmail}
                    onChange={(e) => handleReceiverEmailChange(e, location.id)}
                    sx={{
                      width: "250px", // 전체 너비
                      "& .MuiInputBase-root": {
                        height: "36px", // 전체 높이 설정
                        padding: "0 0px", // 좌우 여백
                        boxSizing: "border-box", // 테두리 포함 계산
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "8px 15px", // 내부 텍스트 패딩
                        fontSize: "small",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상
                      },
                    }}
                    InputProps={{
                      style: {
                        height: "36px", // 높이 설정
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      flexShrink: 0,
                      fontSize: "14px",
                      height: "36px",
                      padding: "6px 16px",
                    }}
                    onClick={() => {
                      setRevcNo(index);
                      setOpenRecv(true);
                    }}
                  >
                    사업장 메일 찾기
                  </Button>
                  {index > 0 && ( // 첫 번째 항목은 삭제할 수 없도록
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ flexShrink: 0, minWidth: "1%", minHeight: "25px" }}
                      onClick={() => handleRemoveLocation(location.id)}
                    >
                      수신자 삭제
                    </Button>
                  )}
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>전송 형식</h3>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="sender-email"
                  name="sender-email"
                  value={sendType}
                  onChange={(e) => setSendType(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="free"
                    control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }} />}
                    label="자유 형식 ( 메일 내용 직접 입력 )"
                    sx={{ fontSize: "14px" }}
                  />
                  <FormControlLabel
                    value="temp"
                    control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }} />}
                    label="템플릿 사용 ( 필수 항목 값 입력 )"
                    sx={{ fontSize: "14px" }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {sendType == "free" && (
            <>
              <h3 style={{ marginBottom: "4px", fontSize: "16px" }}>제목</h3>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  width: "100%", // 전체 너비
                  "& .MuiInputBase-root": {
                    height: "36px", // 전체 높이 설정
                    padding: "0 0px", // 좌우 여백
                    boxSizing: "border-box", // 테두리 포함 계산
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8px 15px", // 내부 텍스트 패딩
                    fontSize: "small",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상
                  },
                }}
                InputProps={{
                  style: {
                    height: "36px", // 높이 설정
                  },
                }}
              />
              <h3 style={{ marginBottom: "4px", fontSize: "16px" }}>내용</h3>
              <JoditEditor2
                value={editorContentRef.current} // Ref로 관리된 에디터 내용
                onChange={handleEditorChange} // 상태를 업데이트하지 않고 Ref로 관리
                config={editorConfig} // 에디터 설정
                ref={editorRef} // Ref로 에디터 인스턴스를 관리
                // onBlur={() => {
                //   const editorInstance = editorRef.current;
                //   if (editorInstance) {
                //     console.log("Editor onBlur triggered, editor instance:", editorInstance);
                //   }
                // }
              />
            </>
          )}
          {sendType == "temp" && (
            <>
              <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>템플릿</h3>
              <FormControl component="fieldset">
                <Select
                  value={tempId}
                  onChange={(e) => {
                    setTempId(e.target.value);
                    getPropList(e.target.value);
                    const selectedItem = senderSelList.find((a) => a.id === e.target.value);
                    if (selectedItem) {
                      setTempNm(selectedItem.val);
                    }
                    setTextFormData({});

                    // tempList에서 TEMP_CD와 선택된 id가 일치하는 항목 찾기
                    const matchedItem = tempList.find((item) => item.TEMP_CD === e.target.value);
                    setTempTitle(matchedItem ? matchedItem.TITLE : ""); // TITLE 값 설정
                    setTempContent(matchedItem ? matchedItem.CONTENT : ""); // CONTENT 값 설정
                  }}
                  displayEmpty
                  style={{ fontSize: "small", maxHeight: "36px", minWidth: "250px" }}
                >
                  <MenuItem value="" style={{ fontSize: "small" }}>
                    선택
                  </MenuItem>
                  {tempSelList.map((a) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <MenuItem key={a.id} value={a.id} style={{ fontSize: "small" }}>
                        {a.id + ". " + a.val}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {(tempTitle || tempContent) && (
                <div
                  style={{
                    backgroundColor: "#f9f9f9", // 연한 회색 배경
                    padding: "16px", // 내부 여백
                    borderRadius: "8px", // 둥근 모서리
                    border: "1px solid #ddd", // 연한 테두리
                    marginTop: "16px", // 위쪽 간격
                  }}
                >
                  {tempTitle && (
                    <>
                      <span style={{ fontSize: "12px", fontWeight: "bold" }}>제목 : </span>
                      <Typography style={{ marginTop: "5px", marginBottom: "10px", fontSize: "12px" }}>
                        {tempTitle}
                      </Typography>
                    </>
                  )}
                  {tempContent && (
                    <>
                      <span style={{ fontSize: "12px", fontWeight: "bold" }}>내용 : </span>
                      <Typography
                        style={{ marginTop: "5px", fontSize: "12px" }}
                        dangerouslySetInnerHTML={{ __html: tempContent }}
                      ></Typography>
                    </>
                  )}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>필수 입력 변수 항목</h3>
                {Array.isArray(propList) &&
                  propList.length > 0 &&
                  propList.map((prop: any) => (
                    <Box
                      key={prop.PROP_CD}
                      sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "14px", fontWeight: "bold" }}>
                        {prop.PROPERTY} {/* TextField 왼쪽에 표시할 텍스트 */}
                      </div>
                      <TextField
                        key={prop.PROPERTY}
                        // label={prop.PROPERTY}
                        value={textFormData[prop.PROPERTY] || ""}
                        onChange={(e) => handleInputChange(prop.PROPERTY, e.target.value)}
                        // fullWidth
                        // margin="normal"
                        sx={{
                          width: "20%", // 전체 너비
                          "& .MuiInputBase-root": {
                            height: "36px", // 전체 높이 설정
                            padding: "0 0px", // 좌우 여백
                            boxSizing: "border-box", // 테두리 포함 계산
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "8px 15px", // 내부 텍스트 패딩
                            fontSize: "small",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(0, 0, 0, 0.23)", // 기본 테두리 색상
                          },
                        }}
                        InputProps={{
                          style: {
                            height: "36px", // 높이 설정
                          },
                        }}
                      />
                    </Box>
                  ))}
              </div>
            </>
          )}
          <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>파일 첨부</h3>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "2px dashed lightGray",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            <span>파일을 드래그하여 여기에 놓거나 클릭하여 파일 선택&nbsp;</span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
              파일 선택
            </Button>
            {files.length > 0 ? (
              <ul style={{ paddingLeft: 0 }}>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <IconButton onClick={() => removeFile(file)} size="small" aria-label="remove">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "lightGray" }}>선택된 파일 없음</p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="outlined" onClick={goList} style={{ maxHeight: "28px" }}>
              목록
            </Button>
            {sendType == "free" && (
              <Button variant="contained" color="primary" onClick={sendMail}>
                자유형식 메일 전송
              </Button>
            )}
            {sendType == "temp" && (
              <Button variant="contained" color="primary" onClick={sendMail2}>
                템플릿 메일 전송
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={openRecv}
        onClose={() => {
          closeRecv();
        }}
      >
        <Box sx={style2}>
          <div>
            <h3 style={{ textAlign: "center" }}>사업장 설정</h3>
          </div>
          <div style={{ margin: "10px", display: "flex" }}>
            <Select
              value={searchCompType}
              onChange={(e) => {
                setSearchCompType(e.target.value);
              }}
              displayEmpty
              style={{ fontSize: "small", maxHeight: "28px", minWidth: "200px", marginRight: "20px" }}
            >
              <MenuItem value="" style={{ fontSize: "small" }}>
                선택
              </MenuItem>
              <MenuItem value="name" style={{ fontSize: "small" }}>
                사업장명
              </MenuItem>
              <MenuItem value="code" style={{ fontSize: "small" }}>
                사업장코드
              </MenuItem>
              <MenuItem value="mail" style={{ fontSize: "small" }}>
                메일주소
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
            <Table sx={{ minWidth: 800 }} size="small" aria-label="a dense table">
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
                  <TableCell
                    align="center"
                    sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                  >
                    메일
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ position: "sticky", top: 0, backgroundColor: "aliceblue" }}
                  >
                    담당지사
                  </TableCell>
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
                      clickCheck(row);
                    }}
                  >
                    <TableCell align="center">{row.COID}</TableCell>
                    <TableCell align="center">{row.CONM}</TableCell>
                    <TableCell align="center">{row.EMAIL}</TableCell>
                    <TableCell align="center">{row.SMUNIONNM}</TableCell>
                    <TableCell align="center">{row.EMPNM}</TableCell>
                    <TableCell style={{ display: "none" }}>{row.EMPNM}</TableCell>
                    <TableCell style={{ display: "none" }}>{row.SMUNIONCD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="outlined"
            disableRipple
            onClick={() => {
              closeRecv();
            }}
            style={{ float: "right", marginTop: "20px" }}
          >
            닫기
          </Button>
        </Box>
      </Modal>
    </>
  );
}
