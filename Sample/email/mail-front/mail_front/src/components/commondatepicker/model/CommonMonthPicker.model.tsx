import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, FormHelperText, IconButton, TextField } from "@mui/material";
import theme from "../../../styles/theme";
import { dateUtil } from "../../../utils/date";
import { useMemo, useRef, useState } from "react";
import { IDatePickerModel } from "../CommonDatePicker.type";

/**
 * @apiNote 먼스피커 모델 ( 단일, 범위 )
 */
const today = new Date();
const CommonMonthPickerModel = ({
  date,
  width,
  selectedDate,
  changeSelectedDate,
  minDate,
  maxDate,
  betweenDateList,
  searchDate,
  setSearchDate,
  type,
}: IDatePickerModel) => {
  const monthList = useMemo(() => {
    return Array.from(Array(12), (_, index) =>
      dateUtil.addMonth(dateUtil.startOfYear(searchDate), index),
    );
  }, [searchDate]);

  const minDateYear = useMemo(() => minDate?.getFullYear(), [minDate]);
  const maxDateYear = useMemo(() => maxDate?.getFullYear(), [maxDate]);
  const searchDateYear = useMemo(() => searchDate.getFullYear(), [searchDate]);
  const [error, setError] = useState(false);
  const textRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={{ width: "49%", marginTop: "10px" }}>
      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: "10px",
            top: "6px",
            fontSize: "12px",
            color: theme.main,
          }}
        >
          {type === "start" && "시작년월"}
          {type === "end" && "종료년월"}
        </span>
        <IconButton
          onClick={() => {
            setError(false);
            if (textRef.current) {
              const nextVal = dateUtil.addYear(searchDate, -1);
              setSearchDate(nextVal);
              textRef.current.value = nextVal.getFullYear().toString();
            }
          }}
          size="small"
          disabled={!!(minDateYear && minDateYear >= searchDateYear)}
        >
          <KeyboardArrowLeft fontSize="small" />
        </IconButton>
        <TextField
          defaultValue={searchDateYear}
          inputRef={textRef}
          sx={{
            "input.MuiOutlinedInput-input": {
              padding: "2px 4px",
            },
            "> div": { padding: "1px" },
            width: "50px",
          }}
          onChange={(e) => {
            const value = e.target.value;
            if (textRef.current) {
              textRef.current.value = value.replace(/[^0-9]/g, "");
              if (value.length === 4) {
                const year = Number(value);
                if (minDateYear && maxDateYear) {
                  if (year >= minDateYear && year <= maxDateYear) {
                    setSearchDate(dateUtil.dateBuilder(searchDate, { year: year }));
                    setError(false);
                  } else {
                    setError(true);
                  }
                }
              } else {
                setError(false);
              }
            }
          }}
          onBlur={() => {
            if (textRef.current) {
              if (error || textRef.current.value.length !== 4) {
                setError(false);
                textRef.current.value = searchDate.getFullYear().toString();
              }
            }
          }}
          error={error}
          inputProps={{ sx: { fontSize: "14px", textAlign: "center" }, maxLength: 4 }}
        />
        <IconButton
          onClick={() => {
            setError(false);
            if (textRef.current) {
              const nextVal = dateUtil.addYear(searchDate, 1);
              setSearchDate(nextVal);
              textRef.current.value = nextVal.getFullYear().toString();
            }
          }}
          size="small"
          disabled={!!(maxDateYear && maxDateYear <= searchDateYear)}
        >
          <KeyboardArrowRight fontSize="small" />
        </IconButton>
      </div>

      {error && (
        <FormHelperText error sx={{ marginLeft: "10px" }}>
          {minDateYear}년 ~ {maxDateYear}년 안으로 입력해주세요.
        </FormHelperText>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {monthList?.map((date, index) => {
          const renderYearMonth = dateUtil.dateFormat(date, "yyyyMM");
          const isPicked = renderYearMonth === dateUtil.dateFormat(selectedDate, "yyyyMM");
          const isBetween = betweenDateList?.find((btw) => btw === renderYearMonth);
          const isToday = dateUtil.dateFormat(today, "yyyyMM") === renderYearMonth;
          const minYearMonth = minDate && dateUtil.dateFormat(minDate, "yyyyMM");
          const maxYearMonth = maxDate && dateUtil.dateFormat(maxDate, "yyyyMM");

          return (
            <Box
              key={`month-picker-month-${index + 1}`}
              sx={{
                backgroundColor: isBetween && !isPicked ? theme.grey.default : "transparent",
                // border: isToday ? `1px solid ${theme.deepGrey}` : '',
                // borderRadius: isToday ? `5px` : '',
                borderRadius: 0,
                width: "33%",

                ":hover": {
                  backgroundColor: "none",
                },
              }}
            >
              <Button
                sx={{
                  color: isPicked ? theme.white : theme.black,
                  margin: 0,
                  marginTop: "-1px",
                  width: "100%",
                  borderRadius: 0,
                  backgroundColor: isPicked ? theme.main : "transparent",
                  borderStartStartRadius: isPicked && type === "start" ? "20px" : "",
                  borderEndStartRadius: isPicked && type === "start" ? "20px" : "",
                  borderEndEndRadius: isPicked && type === "end" ? "20px" : "",
                  borderStartEndRadius: isPicked && type === "end" ? "20px" : "",

                  "&.Mui-disabled": {
                    backgroundColor: theme.grey.light,
                    border: "none",
                    opacity: 0.3,
                  },

                  ":hover": {
                    color: theme.white,
                    backgroundColor: isPicked ? theme.main : theme.grey.default,
                    borderRadius: isPicked ? "" : "20px",
                  },
                }}
                onClick={() => changeSelectedDate(date)}
                disabled={
                  !(
                    minYearMonth &&
                    renderYearMonth &&
                    minYearMonth <= renderYearMonth &&
                    maxYearMonth &&
                    renderYearMonth &&
                    maxYearMonth >= renderYearMonth
                  )
                }
              >
                {dateUtil.dateFormat(date, `M월`)}
              </Button>
            </Box>
          );
        })}
      </div>
    </div>
  );
};
export default CommonMonthPickerModel;
