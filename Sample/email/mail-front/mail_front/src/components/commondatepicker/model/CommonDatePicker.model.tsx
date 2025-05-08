import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Table, Tooltip } from "@mui/material";
import { useMemo } from "react";
import theme from "../../../styles/theme";
import { dateUtil } from "../../../utils/date";
import { IDatePickerModel } from "../CommonDatePicker.type";

const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
/**
 * @apiNote 데이트피커 모델 ( 단일, 범위 )
 */
const today = new Date();
const CommonDatePickerModel = ({
  date,
  width,
  selectedDate,
  changeSelectedDate,
  minDate,
  maxDate,
  betweenDateList,
  searchDate,
  setSearchDate,
}: IDatePickerModel) => {
  const baseDateYear = useMemo(() => searchDate.getFullYear(), [searchDate]);

  const holidayList = useMemo(() => [], []);

  const calendarData = useMemo(
    () => dateUtil.getCalendar(searchDate, holidayList),
    [holidayList, searchDate],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: `${width}px`,
        borderLeft: `1px solid ${theme.grey}`,
        borderRight: `1px solid ${theme.grey}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: `${width}px`,
          fontSize: `0.9em`,
          height: "40px",
        }}
      >
        <IconButton
          onClick={() => setSearchDate(dateUtil.addMonth(searchDate, -1) as Date)}
          size="small"
        >
          <KeyboardArrowLeft fontSize="small" />
        </IconButton>
        {dateUtil.dateFormat(searchDate, "yyyy년 MM월")}
        <IconButton onClick={() => setSearchDate(dateUtil.addMonth(searchDate, 1))} size="small">
          <KeyboardArrowRight fontSize="small" />
        </IconButton>
      </div>
      <Table sx={{ th: { fontSize: "13px", fontWeight: 500, color: theme.black } }}>
        <thead>
          <tr>
            {weekArr.map((data, index) => (
              <th key={`day-ofthe-week-${index}`}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarData?.map((weeks, index) => (
            <tr key={`week-${index}`}>
              {weeks.map((week, index) => {
                const isToday = dateUtil.isSameDay(week.value, today);
                const isViewDate = dateUtil.isSameDay(week.value, selectedDate);
                const isBetween = Boolean(betweenDateList?.find((btw) => week.ymd === btw));
                const isStartDate = betweenDateList?.[0] === week.ymd;
                const isEndDate = betweenDateList?.[betweenDateList.length - 1] === week.ymd;

                return (
                  <Tooltip key={`day-${index}`} title={week?.holidayNm ?? ""} followCursor>
                    <td
                      key={`day-${index}`}
                      style={{
                        // 글자색 스타일
                        color:
                          minDate && dateUtil.diffDay(minDate, week.value) > 0
                            ? theme.grey.default
                            : maxDate && dateUtil.diffDay(maxDate, week.value) < 0
                            ? theme.grey.default
                            : week.isEmpty
                            ? // 이전달 또는 다음달일경우
                              theme.grey.default
                            : // 일요일 일경우
                            week.value.getDay() === 0 || week.holidayYn
                            ? theme.red
                            : week.value.getDay() === 6
                            ? // 토요일 일경우
                              theme.blue
                            : // 일반날짜 일경우
                            isViewDate
                            ? // 선택된 날짜일경우
                              theme.white
                            : // 미선택 날짜일경우
                              theme.black,
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "0.9em",
                      }}
                      onClick={() => {
                        const dateValue = week.value;
                        if (minDate && maxDate) {
                          // minDate와 maxDate가 존재할경우
                          if (
                            dateUtil.diffDay(minDate, dateValue) <= 0 &&
                            dateUtil.diffDay(maxDate, dateValue) >= 0
                          ) {
                            changeSelectedDate(dateValue);
                          }
                        } else if (minDate && !maxDate) {
                          // minDate만 존재할경우
                          if (dateUtil.diffDay(minDate, dateValue) <= 0) {
                            changeSelectedDate(dateValue);
                          }
                        } else if (!minDate && maxDate) {
                          // maxDate만 존재할경우
                          if (dateUtil.diffDay(maxDate, dateValue) >= 0) {
                            changeSelectedDate(dateValue);
                          }
                        } else {
                          // minDate와 maxDate가 존재하지않을경우
                          changeSelectedDate(dateValue);
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: isBetween ? `rgba(25, 28, 39, 0.37)` : "transparent",
                          color: isBetween
                            ? week.value.getDay() === 0 || week.holidayYn
                              ? theme.red
                              : week.value.getDay() === 6
                              ? // 토요일 일경우
                                theme.blue
                              : theme.white
                            : "",
                          borderTopLeftRadius: isStartDate ? "30px" : "",
                          borderBottomLeftRadius: isStartDate ? "30px" : "",
                          borderTopRightRadius: isEndDate ? "30px" : "",
                          borderBottomRightRadius: isEndDate ? "30px" : "",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: `${width / 7.3}px`,
                            width: `${width / 7.3}px`,
                            // 보더
                            border: isToday ? `1px solid ${theme.grey.dark}` : "transparent",
                            // 배경색
                            backgroundColor: isViewDate ? theme.main : "transparent",
                            borderRadius: "30px",
                          }}
                        >
                          {Number(week.day)}
                        </div>
                      </div>
                    </td>
                  </Tooltip>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default CommonDatePickerModel;
