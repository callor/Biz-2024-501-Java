import axios from "@/utils/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

import { cookieUtil } from "@/utils/cookie";

// 아코디언 예제 사용
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const EditPage = dynamic(() => import("./TemplateWrite"), { ssr: false });

// 메모 modal start
import Header from "@/components/Header";
import { cryptoUtil } from "@/utils/crypto";
import dynamic from "next/dynamic";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%", // height를 직접 설정하여 크기 지정
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};
// 메모 modal end

export default function TemplateList() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const [totalCnt, setTotalCnt] = useState();
  const [data, setData] = useState([]);
  const [state, setState] = useState("");
  const [tempCd, setTempCd] = useState(0);
  const [title, setTitle] = useState("");
  // const [contents, setContent] = useState("");
  const [upmuTxt, setUpmuTxt] = useState("");
  const [from, setFrom] = useState("");
  const [recv, setRecv] = useState("");
  const [sendDt, setSendDt] = useState("");
  const [fileTxt, setFileTxt] = useState("");
  const [openTemp, setOpenTemp] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<{ id: string; name: string }[]>([]); // 서버에서 가져온 기존 파일
  const [removedFiles, setRemovedFiles] = useState<{ id: string; name: string }[]>([]); // 삭제된 기존 파일

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [editorContent, setEditorContent] = useState(""); // 에디터 내용 상태 관리

  const handleEditorContentChange = (content: any) => {
    setEditorContent(content); // EditPage에서 템플릿 내용 변경 시 상태 업데이트
  };

  useEffect(() => {}, [editorContent]); // editorContent가 업데이트될 때마다 호출

  const tempSetOpen = () => {
    setState("write");
    setOpenTemp(true);
  };

  const tempEditOpen = (row: any) => {
    setState("edit");
    setTempCd(row.TEMP_CD);
    setUpmuTxt(row.UPMU_TXT);
    setFrom(row.SEND);
    setRecv(row.RECV);
    setSendDt(row.SEND_TIME);
    setTitle(row.TITLE);
    setEditorContent(row.CONTENT);
    // setContent(row.CONTENT);
    setFileTxt(row.FILE_TXT);

    const updatedFiles = row.fileList?.map((file: any) => ({
      ...file,
      id: file.FILE_CD,
      name: file.FILE_NM, // FILE_NM을 name으로 대체
      size: file.FILE_SIZE || 0,
      type: file.FILE_TYPE || "application/octet-stream", // 기본 타입 설정
    }));

    // console.log(row.fileList);
    // console.log(updatedFiles);

    // setFiles(updatedFiles || []);
    setExistingFiles(updatedFiles);
    setOpenTemp(true);
  };

  const handleModalClose = () => {
    const alertTxt = "창을 닫으시면, 작성중인 내용이 사라집니다.";
    if (confirm(alertTxt)) {
      setOpenTemp(false);
      router.reload();
    }
  };

  const getData = useCallback(async () => {
    try {
      const data = await axios.post("/listTemp", JSON.stringify({}), {}).then((res) => {
        setData(res.data);
      });
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
  }, [router]);

  useEffect(() => {
    getData();
    /* eslint-disable-next-line */
  }, [getData]);

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);

    const newFiles = selectedFiles.filter(
      (selectedFile) =>
        !files.some((file) => file.name === selectedFile.name) &&
        !(existingFiles?.some((existingFile) => existingFile.name === selectedFile.name) ?? false),
    );

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 기존파일 삭제하는 경우
  const removeExistingFile = (fileId: string) => {
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
    setRemovedFiles((prev) => {
      const fileToRemove = existingFiles.find((file) => file.id === fileId);
      return fileToRemove ? [...prev, fileToRemove] : prev;
    });
  };

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

  const addTemplate = async () => {
    if (title == null || title == "") {
      alert("메일 제목의 템플릿을 입력하세요.");
      return false;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(editorContent, "text/html");
    const isEmpty = !doc.body.textContent?.trim() && !doc.body.innerHTML?.trim();

    if (isEmpty) {
      alert("메일 내용의 템플릿을 입력하세요.");
      return false;
    }

    const imgTagList = doc.querySelectorAll<HTMLImageElement>("img");
    let imgTags = "";
    for (let i = 0; i < imgTagList.length; i++) {
      imgTags += imgTagList[i].outerHTML;
    }

    const formData = new FormData();

    if (state == "write") {
      const sendData = {
        upmuTxt: upmuTxt ?? "",
        send: from ?? "",
        recv: recv ?? "",
        sendDt: sendDt ?? "",
        title: title,
        contents: doc.body.innerHTML,
        // tempTxt: JSON.stringify({ editorContent }),
        fileTxt: fileTxt,
        state: state,
      };
      formData.append("body", cryptoUtil.encrypt(JSON.stringify(sendData)));
      formData.append("tempTxt", cryptoUtil.encrypt(JSON.stringify(doc.body.textContent)));
      formData.append("imgTags", cryptoUtil.encrypt(JSON.stringify(imgTags)));
    } else if (state == "edit") {
      const sendData = {
        tempCd: tempCd?.toString() || "",
        upmuTxt: upmuTxt ?? "",
        send: from ?? "",
        recv: recv ?? "",
        sendDt: sendDt ?? "",
        title: title ?? "",
        contents: doc.body.innerHTML,
        // tempTxt: JSON.stringify({ editorContent }),
        fileTxt: fileTxt ?? "",
        state: state ?? "",
      };
      formData.append("body", cryptoUtil.encrypt(JSON.stringify(sendData)));
      formData.append("tempTxt", cryptoUtil.encrypt(JSON.stringify(doc.body.textContent)));
      formData.append("imgTags", cryptoUtil.encrypt(JSON.stringify(imgTags)));
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        if (file instanceof File) {
          formData.append("files", file); // 새로운 파일은 그대로 추가
        } else if (file && typeof file === "object" && "FILE_NM" in file) {
          // 기존 파일 데이터를 File 객체로 변환
          const existingFile = file as { FILE_NM: string; [key: string]: any }; // 타입 단언 사용
          handleFileConversion(existingFile)
            .then((convertedFile) => {
              formData.append("files", convertedFile); // 변환된 파일을 추가
            })
            .catch((error) => {
              console.error("파일 변환 실패", error);
            });
        } else {
          formData.append("files", new Blob([]), "empty.txt");
        }
      });
    } else {
      formData.append("files", new Blob([]), "empty.txt");
    }

    if (removedFiles && removedFiles.length > 0 && state == "edit") {
      formData.append("removedFiles", JSON.stringify(removedFiles.map((file) => file.id)));
    } else {
      formData.append("removedFiles", "");
    }

    try {
      if (state == "write") {
        const response = await axios.post("/addTemp", formData);
        if (response.data.code == "S") {
          alert("등록되었습니다.");
          router.reload();
        } else {
          alert("등록에 실패하였습니다.");
          router.reload();
        }
      } else if (state == "edit") {
        const response = await axios.post("/editTemp", formData);
        if (response.data.code == "S") {
          alert("수정되었습니다.");
          router.reload();
        } else {
          alert("수정에 실패하였습니다.");
          router.reload();
        }
      }
    } catch (err: any) {
      if (err.response) {
        // 상태 코드가 401일 경우 (Unauthorized)
        if (err.response.status === 401) {
          if (err.response.data.msg === "JWT Expired or Invalid") {
            console.error("JWT token is expired or invalid");
            alert("토큰이 만료되어 로그아웃 됩니다.");
            cookieUtil.removeCookie("_sd");
            sessionStorage.clear();
            router.push("/", undefined, { shallow: true });
          } else if (err.response.data.msg === "API Key Error") {
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
  };

  const handleFileConversion = (file: any) => {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // reader.result가 null이 아닌지 확인
        if (reader.result) {
          const fileBlob = new Blob([reader.result as ArrayBuffer], { type: file.type });
          const convertedFile = new File([fileBlob], file.FILE_NM, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(convertedFile);
        } else {
          reject(new Error("파일 데이터를 읽을 수 없습니다."));
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file); // 이진 파일을 읽어들임
    });
  };

  async function onClickDownload(fileCD: any, fileNM: any) {
    var tmpUrl = "https://api.kbz.co.kr/email/tempFileDown";
    await axios({
      method: "POST",
      url: tmpUrl,
      data: fileCD,
      responseType: "blob", // Set the response type to 'blob' to handle binary data
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileNM); // Set the desired filename and extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  }

  async function tempDel(tempCd: any) {
    const confirmTxt = "템플릿을 삭제하시겠습니까?";
    if (confirm(confirmTxt)) {
      const response = await axios.post("/delTemp", { tempCd: tempCd });
      if (response.data.code == "S") {
        alert("삭제되었습니다.");
        router.reload();
      } else {
        alert("삭제에 실패하였습니다.");
        router.reload();
      }
    }
  }

  return (
    <div className="content">
      {mounted && <Header />}
      <Button
        variant="contained"
        style={{
          maxHeight: "28px",
          marginTop: "20px",
          float: "right",
          marginRight: "30px",
          // marginRight: "200px",
          marginBottom: "20px",
        }}
        // onClick={() => handleOpen()}
        onClick={() => tempSetOpen()}
      >
        템플릿 추가
      </Button>
      {/* {isOpen && <EditPopup onClose={handleClose} />} */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
        <div style={{ width: "98%", marginBottom: "20px" }}>
          {/* <div style={{ width: "80%", marginBottom: "20px" }}> */}
          <div
            style={{
              display: "flex",
              backgroundColor: "aliceblue",
              textAlign: "center",
              height: "40px",
              alignItems: "center",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <div style={{ width: "6%" }}>번호</div>
            <div style={{ width: "12%" }}>업무구분</div>
            <div style={{ width: "12%" }}>발송인</div>
            <div style={{ width: "10%" }}>수신인</div>
            <div style={{ width: "10%" }}>전송 일시</div>
            <div style={{ width: "48%" }}>메일 제목</div>
            <div style={{ width: "3%" }}></div>
          </div>
          {totalCnt == 0 ? (
            <Typography style={{ marginTop: "20px", textAlign: "center" }}>
              데이터가 없습니다.
            </Typography>
          ) : (
            ""
          )}
          {data.map((row: any, i) => (
            <Accordion key={row.TEMP_CD}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography style={{ width: "6%", textAlign: "center", fontSize: "13px" }}>
                  {row.TEMP_CD}
                </Typography>
                <Typography style={{ width: "12%", textAlign: "center", fontSize: "13px" }}>
                  {row.UPMU_TXT}
                </Typography>
                <Typography style={{ width: "12%", textAlign: "center", fontSize: "13px" }}>
                  {row.SEND}
                </Typography>
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.RECV}
                </Typography>
                <Typography style={{ width: "10%", textAlign: "center", fontSize: "13px" }}>
                  {row.SEND_TIME}
                </Typography>
                <Typography style={{ width: "50%", textAlign: "center", fontSize: "13px" }}>
                  {row.TITLE}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <h4>내용</h4>
                <Typography
                  style={{ fontSize: "12px" }}
                  dangerouslySetInnerHTML={{ __html: row.CONTENT }}
                ></Typography>
                <h4>변수항목</h4>
                {/* <Typography dangerouslySetInnerHTML={{ __html: row["변수 항목"] }}></Typography> */}
                <Typography component="div" style={{ fontSize: "12px" }}>
                  {row.propList &&
                    row.propList.map((propData: any) => (
                      <ul key={propData.PROP_CD} style={{ display: "block", margin: 0 }}>
                        <li>{propData.PROPERTY}</li>
                      </ul>
                    ))}
                </Typography>
                {row.IMG_LIST && <h4>이미지 첨부</h4>}
                <Typography dangerouslySetInnerHTML={{ __html: row.IMG_LIST }} />
                {row.fileList && <h4>첨부 파일</h4>}
                <Typography>
                  {row.fileList &&
                    row.fileList.map((fileData: any) => (
                      <span
                        key={fileData.FILE_CD}
                        style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}
                      >
                        {fileData.FILE_NM}&nbsp;
                        <Button
                          variant="outlined"
                          disableRipple
                          onClick={() => onClickDownload(fileData.FILE_CD, fileData.FILE_NM)}
                        >
                          다운로드
                        </Button>
                      </span>
                    ))}
                </Typography>
                {row.FILE_TXT && <h4>첨부 파일 해설</h4>}
                <Typography dangerouslySetInnerHTML={{ __html: row.FILE_TXT }} />
                <Button
                  variant="contained"
                  style={{
                    maxHeight: "28px",
                    marginTop: "20px",
                    float: "right",
                    marginRight: "30px",
                    marginBottom: "20px",
                  }}
                  onClick={() => tempDel(row.TEMP_CD)}
                >
                  템플릿 삭제
                </Button>
                <Button
                  variant="contained"
                  style={{
                    maxHeight: "28px",
                    marginTop: "20px",
                    float: "right",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                  onClick={() => tempEditOpen(row)}
                >
                  템플릿 수정
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <Modal
          open={openTemp}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              {state === "write" && <h2 style={{ textAlign: "center" }}>템플릿 등록</h2>}
              {state === "edit" && <h2 style={{ textAlign: "center" }}>템플릿 수정</h2>}
            </div>
            <div style={{ paddingRight: 20, paddingLeft: 20 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    id="upmu_txt"
                    variant="outlined"
                    fullWidth
                    label="업무구분"
                    value={upmuTxt}
                    onChange={(e) => setUpmuTxt(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="send"
                    variant="outlined"
                    fullWidth
                    label="발송인"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="recv"
                    variant="outlined"
                    fullWidth
                    label="수신인"
                    value={recv}
                    onChange={(e) => setRecv(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="send_time"
                    variant="outlined"
                    fullWidth
                    label="전송 일시"
                    value={sendDt}
                    onChange={(e) => setSendDt(e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
            <div style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 20 }}>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                label="메일 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* <div style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 20 }}>
              <TextField
                id="contents"
                variant="outlined"
                fullWidth
                multiline
                label="메일 내용"
                value={contents}
                onChange={(e) => setContent(e.target.value)}
                helperText="필수 입력 항목은 #{변수명}으로 표시하세요. ex)서비스명 : #{서비스명}"
              />
            </div> */}
            <div style={{ paddingRight: 20, paddingLeft: 20 }}>
              <h3 style={{ marginBottom: "4px" }}>메일 내용</h3>
              <p style={{ margin: "4px 0 12px", fontSize: "12px", color: "#666" }}>
                필수 항목은
                <strong>{`#{변수명}`}</strong>
                으로 표시하세요.
              </p>
              <EditPage
                onEditorContentChange={handleEditorContentChange}
                initialContent={editorContent}
              />
            </div>
            <div style={{ paddingRight: 20, paddingLeft: 20 }}>
              <h3 style={{ marginBottom: "4px" }}>파일 첨부</h3>
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
                {state === "write" && files.length > 0 && (
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
                )}
                {state === "write" && files.length == 0 && (
                  <p style={{ color: "lightGray" }}>선택된 파일 없음</p>
                )}
                {state === "edit" && (
                  <div>
                    {Array.isArray(existingFiles) && existingFiles.length > 0 && (
                      <ul>
                        {existingFiles.map((file) => (
                          <li key={file.id}>
                            {file.name}
                            <IconButton
                              onClick={() => removeExistingFile(file.id)}
                              size="small"
                              aria-label="remove"
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    )}
                    {files.length > 0 ? (
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>
                            {file.name}
                            <IconButton
                              onClick={() => removeFile(file)}
                              size="small"
                              aria-label="remove"
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: "lightGray" }}>추가된 파일 없음</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div style={{ paddingRight: 20, paddingLeft: 20 }}>
              <TextField
                id="file_text"
                variant="outlined"
                fullWidth
                multiline
                label="첨부 파일 해설"
                value={fileTxt}
                onChange={(e) => setFileTxt(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", marginTop: "10px", float: "right", paddingRight: "20px" }}>
              {/* <button style={{ marginRight: "10px" }} onClick={addTemplate}> */}
              <Button
                variant="contained"
                style={{
                  maxHeight: "28px",
                  marginTop: "10px",
                  // float: "right",
                  marginBottom: "10px",
                  marginRight: "20px",
                }}
                onClick={addTemplate}
              >
                저장
              </Button>
              <Button
                variant="contained"
                style={{
                  maxHeight: "28px",
                  marginTop: "10px",
                  // float: "right",
                  marginBottom: "10px",
                }}
                onClick={handleModalClose}
              >
                닫기
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
