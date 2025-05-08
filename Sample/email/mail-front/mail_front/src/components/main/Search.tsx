import theme from "@/styles/theme";
import axios from "@/utils/axios";
import { dateUtil } from "@/utils/date";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import CommonDatePicker from "../commondatepicker/CommonDatePicker";
import {
  mainCompChanged,
  mainList,
  mainPage,
  mainSearchDay,
  mainSearchDetail,
  mainSearchEndDt,
  mainSearchKeyword,
  mainSearchMonth,
  mainSearchSmunionCd,
  mainSearchStartDt,
  mainSearchType,
  mainSearchYear,
  mainTextChanged,
  mainTopBarIdx,
  mainTotalCnt,
} from "./Main.atom";

import { cookieUtil } from "@/utils/cookie";
import { useRouter } from "next/router";

const Search = () => {
  const [data, setData] = useAtom(mainList);
  const [mailType, setMailType] = useAtom(mainTopBarIdx);
  const [srchYear, setSrchYear] = useAtom(mainSearchYear);
  const [srchMonth, setSrchMonth] = useAtom(mainSearchMonth);
  const [srchDay, setSrchDay] = useAtom(mainSearchDay);
  const [totalCnt, setTotalCnt] = useAtom(mainTotalCnt);
  const [page, setPage] = useAtom(mainPage);
  // const page = useAtomValue(mainPage);
  const [detailCkVal, setChecked] = useAtom(mainSearchDetail);
  const [searchStartDt, setSearchStartDt] = useAtom(mainSearchStartDt);
  const [searchEndDt, setSearchEndDt] = useAtom(mainSearchEndDt);
  const [keyword, setKeyword] = useAtom(mainSearchKeyword);
  const [searchType, setSearchType] = useAtom(mainSearchType);
  const [isTextChanged, setIsTextChanged] = useAtom(mainTextChanged);
  const [isCompChanged, setIsCompChanged] = useAtom(mainCompChanged);
  const [searchSmunionCd] = useAtom(mainSearchSmunionCd);

  const router = useRouter();

  // const [searchState, setSearchState] = useAtom(MainSearchState);
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const monthList = Array.from({ length: 12 }, (_, i) => i + 1);
  const dayMax = () => {
    return new Date(Number(srchYear), Number(srchMonth) + 1, 0).getDate(); // 다음 달 1일로 이동 후, 그 날짜의 전날을 얻으면 해당 월의 마지막 날짜
  };
  const dayList = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = dateUtil.startOfDay(new Date());

  const getData = useCallback(async () => {
    try {
      // const apiKey = process.env.REQUEST_API_KEY;
      const data = await axios.post(
        "/list",
        {
          mailType: mailType,
          searchType: searchType,
          keyword: keyword,
          srchYear: srchYear.toString(),
          srchMonth: srchMonth.toString(),
          srchDay: srchDay.toString(),
          detailCkVal: detailCkVal,
          searchStartDt: dateUtil.dateFormat(searchStartDt, "yyyy-MM-dd"),
          searchEndDt: dateUtil.dateFormat(searchEndDt, "yyyy-MM-dd"),
          searchSmunionCd: searchSmunionCd,
          pnum: page, //검색 했는데 이전페이지(2)가 남아있음
          // pnum: 1,
          pageSize: "20",
        },
        {
          headers: {
            "Content-Type": "application/json", // 요청 본문의 타입 설정
          },
        },
      );
      // .then((res) => {
      setTotalCnt(data.data[0]?.pageCnt);
      setData(data.data);
      setIsTextChanged(new Array(data.data.length).fill(false)); // 초기 상태 설정
      setIsCompChanged(new Array(data.data.length).fill(false)); // 초기 상태 설정
      // setSearchState(false);
      // });
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
  }, [
    mailType,
    searchType,
    keyword,
    srchYear,
    srchMonth,
    srchDay,
    detailCkVal,
    searchStartDt,
    searchEndDt,
    searchSmunionCd,
    page,
    setTotalCnt,
    setData,
    setIsTextChanged,
    setIsCompChanged,
    router,
  ]);

  // Main.tsx에서 useSWR을 실행하게되면서 추가 한 부분
  // useEffect(() => {
  //   // maindata가 유효하고, 길이가 0보다 클 때만 상태 업데이트
  //   if (data && data.length > 0) {
  //     setTotalCnt(data[0]?.pageCnt || 0);
  //     setData(data);
  //     setIsTextChanged(new Array(data.length).fill(false));
  //     setIsCompChanged(new Array(data.length).fill(false));
  //   } else {
  //     // maindata가 없거나 길이가 0일 경우 상태 초기화
  //     setTotalCnt(0);
  //     setData([]);
  //     setIsTextChanged([]);
  //     setIsCompChanged([]);
  //   }
  // }, [data, setData, setIsCompChanged, setIsTextChanged, setTotalCnt]);

  // Main.tsx에서 useSWR을 실행하게되면서 주석 한 부분
  useEffect(() => {
    getData();
    /* eslint-disable-next-line */ // 처음 랜더 됐을 때만 돌린다. 의존성이 있으면 의존성 실행 혹은 변경 때마다 돌아감 > 백에 계속 요청
  }, [mailType, page, searchSmunionCd]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getData();
  //   }, 900000); // 15분 간격
  //   return () => clearInterval(interval);
  // }, [getData]);

  // 남은 시간 상태와 새로고침 활성화 상태 관리
  const [remainingTime, setRemainingTime] = useState(300); // 5분 = 300초
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // 주기적으로 데이터 새로고침 및 타이머 관리
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            getData();
            return 300; // 5분 초기화
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefresh, getData]);

  // 남은 시간 초기화 버튼
  const resetTimer = () => {
    setRemainingTime(300);
    if (isAutoRefresh) getData();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: "20px", marginTop: "20px" }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Grid style={{ margin: "10px" }}>
            <Paper
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                ...theme.typography.body2,
                // padding: theme.spacing(2),
                padding: "10px",
                textAlign: "center",
                color: theme.palette.text.secondary,
                minWidth: "500px",
                minHeight: "104px",
                // display: "flex",
                // float: "center",
              }}
            >
              {/* <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                자동 새로고침 설정
              </Typography> */}
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{ padding: "5px" }}
              >
                <Typography>
                  {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초 후에 새로고침 됩니다.
                </Typography>
                <Button variant="contained" onClick={resetTimer}>
                  새로고침 연장
                </Button>
              </Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAutoRefresh}
                    onChange={(e) => setIsAutoRefresh(e.target.checked)}
                  />
                }
                label="자동 새로고침 사용"
              />
            </Paper>
          </Grid>
          <Grid sx={{ width: "50%", marginTop: "10px", marginLeft: "20px" }}>
            {/* <Grid item xs={6}> */}
            <Paper
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                ...theme.typography.body2,
                padding: theme.spacing(1),
                textAlign: "left",
                color: theme.palette.text.secondary,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", paddingLeft: "30px" }}>
                <span>기간</span>
                <FormControl sx={{ m: 1 }} size="small">
                  <Select
                    value={srchYear}
                    onChange={(e) => setSrchYear(e.target.value)}
                    displayEmpty
                    style={{ maxHeight: 28, fontSize: "small" }}
                  >
                    <MenuItem value="" style={{ fontSize: "small" }}>
                      전체
                    </MenuItem>
                    {yearList.map((year, idx) => {
                      return (
                        <MenuItem key={`year_${idx}`} value={year} style={{ fontSize: "small" }}>
                          {year}년
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} size="small">
                  <Select
                    value={srchMonth}
                    onChange={(e) => setSrchMonth(e.target.value)}
                    displayEmpty
                    style={{ maxHeight: 28, fontSize: "small" }}
                  >
                    <MenuItem value="" style={{ fontSize: "small" }}>
                      전체
                    </MenuItem>
                    {monthList.map((month, idx) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <MenuItem key={`month_${idx}`} value={month} style={{ fontSize: "small" }}>
                          {month}월
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} size="small">
                  <Select
                    value={srchDay}
                    onChange={(e) => setSrchDay(e.target.value)}
                    displayEmpty
                    style={{ maxHeight: 28, fontSize: "small" }}
                  >
                    <MenuItem value="" style={{ fontSize: "small" }}>
                      전체
                    </MenuItem>
                    {dayList.map((day, idx) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <MenuItem key={`day_${idx}`} value={day} style={{ fontSize: "small" }}>
                          {day}일
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      onChange={(e) => setChecked(e.target.checked)}
                      value={detailCkVal}
                    />
                  }
                  label="기간 상세 설정"
                  style={{ marginLeft: 20 }}
                />
              </div>
              {detailCkVal && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: "30px",
                  }}
                >
                  <span style={{ marginRight: 10 }}>상세 기간</span>
                  <div style={{ display: "inline-block" }}>
                    <CommonDatePicker
                      mode="date"
                      range
                      startDate={searchStartDt}
                      endDate={searchEndDt}
                      changeStartDate={(e) => setSearchStartDt(e)}
                      changeEndDate={(e) => setSearchEndDt(e)}
                      // 241010 추가
                      viewStartDate={dateUtil.dateFormat(searchStartDt, "yyyy-MM-dd")}
                      viewEndDate={dateUtil.dateFormat(searchEndDt, "yyyy-MM-dd")}
                    />
                    <Button
                      variant="contained"
                      disableRipple
                      // variant="outlined"
                      onClick={(e) => {
                        setSearchStartDt(today);
                        setSearchEndDt(today);
                      }}
                      style={{ marginRight: 5, maxHeight: "28px" }}
                    >
                      당일
                    </Button>
                    <Button
                      variant="contained"
                      disableRipple
                      // variant="outlined"
                      onClick={(e) => {
                        setSearchStartDt(dateUtil.addWeek(today, -1));
                        setSearchEndDt(today);
                      }}
                      style={{ marginRight: 5, maxHeight: "28px" }}
                    >
                      1주일
                    </Button>
                    <Button
                      variant="contained"
                      disableRipple
                      // variant="outlined"
                      onClick={(e) => {
                        setSearchStartDt(dateUtil.addMonth(today, -1));
                        setSearchEndDt(today);
                      }}
                      style={{ marginRight: 5, maxHeight: "28px" }}
                    >
                      1개월
                    </Button>
                    <Button
                      variant="contained"
                      disableRipple
                      // variant="outlined"
                      onClick={(e) => {
                        setSearchStartDt(dateUtil.addMonth(today, -3));
                        setSearchEndDt(today);
                      }}
                      style={{ marginRight: 5, maxHeight: "28px" }}
                    >
                      3개월
                    </Button>
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", paddingLeft: "30px" }}>
                <span>검색어</span>
                <FormControl sx={{ m: 1 }} size="small">
                  <Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    displayEmpty
                    style={{ maxHeight: 28, fontSize: "small" }}
                  >
                    <MenuItem value="" style={{ fontSize: "small" }}>
                      선택
                    </MenuItem>
                    <MenuItem value="upmu" style={{ fontSize: "small" }}>
                      업무
                    </MenuItem>
                    <MenuItem value="fromEmail" style={{ fontSize: "small" }}>
                      발신자
                    </MenuItem>
                    <MenuItem value="email" style={{ fontSize: "small" }}>
                      수신자
                    </MenuItem>
                    <MenuItem value="coName" style={{ fontSize: "small" }}>
                      업체명
                    </MenuItem>
                    <MenuItem value="ddj" style={{ fontSize: "small" }}>
                      담당자
                    </MenuItem>
                    <MenuItem value="title" style={{ fontSize: "small" }}>
                      제목
                    </MenuItem>
                    {/* <MenuItem value="memo" style={{ fontSize: "small" }}>
                      메모
                    </MenuItem> */}
                  </Select>
                </FormControl>
                <Stack sx={{ height: 28, marginRight: 2, padding: 0 }}>
                  <TextField
                    onChange={(e) => setKeyword(e.target.value)}
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
                        setPage(1);
                        // setSearchState(true);
                        getData();
                      }
                    }}
                  />
                </Stack>
                <Button
                  variant="contained"
                  onClick={() => {
                    setPage(1);
                    // setSearchState(true);
                    getData();
                  }}
                >
                  검색
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
