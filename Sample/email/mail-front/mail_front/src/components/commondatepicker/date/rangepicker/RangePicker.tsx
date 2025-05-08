import { Event } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Popover,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import theme from "../../../../styles/theme";
import { dateUtil } from "../../../../utils/date";
import { usePopoverScroll } from "../../../../utils/usePopover";
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IRangePicker } from "../../CommonDatePicker.type";
import CommonDatePickerModel from "../../model/CommonDatePicker.model";
import * as RangePickerStyle from "./RangePicker.style";
/**
 * @apiNote 범위 데이트피커 컴포넌트
 */
const today = new Date();

const DateRangePicker = ({
  paddingY = 5,
  fontSize = 13,
  width = 300,
  startDate,
  changeStartDate,
  endDate,
  changeEndDate,
  minDate,
  maxDate,
  delimiter = "-",
  showRangeMacroButtons,
  disabled,
  svgSize,
  direction,
  directionAfter,
  closePopover,
  viewStartDate,
  viewEndDate,
}: IRangePicker) => {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate);
  // const [focus, setFocus] = useState<'start' | 'end' | undefined>(undefined);
  const [startViewDate, setStartViewDate] = useState<Date>(selectedStartDate);
  const [endViewDate, setEndViewDate] = useState<Date>(selectedEndDate);
  const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);

  const isOpen = useMemo(() => Boolean(openPopover), [openPopover]);

  const onClose = useCallback(() => {
    if (typeof closePopover === "undefined") {
      changeStartDate(selectedStartDate);
    } else {
      closePopover(selectedStartDate, selectedEndDate);
    }
    changeStartDate(selectedStartDate);
    setOpenPopover(null);
  }, [changeStartDate, closePopover, selectedEndDate, selectedStartDate]);

  useEffect(() => {
    if (!isOpen && typeof closePopover === "undefined") {
      changeEndDate(selectedEndDate);
    }
    /* eslint-disable-next-line */
  }, [selectedEndDate, isOpen]);

  // 스크롤 이벤트
  usePopoverScroll(!!openPopover, () => setOpenPopover(null), "range-date-picker", { once: false });

  // const trigger = useScrollTrigger({ threshold: 0 });
  // useEffect(() => {
  //   trigger && isOpen && setOpenPopover(null);
  // }, [isOpen, openPopover, trigger]);

  /**
   * 날짜선택 변경 메서드
   */
  const changeSelectedDate = useCallback((type: "start" | "end", date: Date) => {
    switch (type) {
      case "start":
        setSelectedStartDate(date);
        break;
      case "end":
        setSelectedEndDate(date);
        break;
    }
  }, []);

  // 선택된 날짜 사잇값
  const betweenDateList = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      let dateArray: Date[] = [];
      let currentDate = selectedStartDate;
      while (currentDate <= selectedEndDate) {
        dateArray.push(new Date(currentDate));
        currentDate = dateUtil.addDay(currentDate, 1);
      }
      return dateArray.map((date) => dateUtil.dateFormat(date, "yyyyMMdd"));
    }
  }, [selectedEndDate, selectedStartDate]);

  /**
   * 텍스트로 날짜입력시 검증 메서드
   */
  const onChangeInputValue = useCallback(
    (ref: MutableRefObject<HTMLInputElement | null>) => {
      if (ref.current) {
        const inputValue = ref.current.value;
        const reg = `(\\${delimiter}{1,2})$`;

        ref.current.value = inputValue
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, `$1${delimiter}$2${delimiter}$3`)
          .replace(new RegExp(reg, "g"), ``);
      }
    },
    [delimiter],
  );

  // 범위선택기에서 매크로버튼 클릭 시
  const onClickMacroButton = useCallback((value: number, type?: "week" | "month") => {
    const todayInit = dateUtil.startOfDay(today);
    let startDate = null;
    if (type) {
      if (type === "week") {
        startDate = dateUtil.addDay(todayInit, value * -7);
      } else {
        startDate = dateUtil.addMonth(todayInit, value * -1);
      }
    } else {
      startDate = todayInit;
    }
    setSelectedStartDate(startDate);
    setSelectedEndDate(todayInit);
    setStartViewDate(startDate);
    setEndViewDate(todayInit);
  }, []);

  // 시작날짜 텍스트입력 적용 메서드
  const submitStartDate = useCallback(() => {
    if (startRef.current && endRef.current) {
      // input 입력값
      const value = startRef.current.value;
      const endValue = endRef.current.value;
      // 오늘날짜
      const todayInit = dateUtil.startOfDay(today);
      // input 입력값을 Date형으로 변환하기 위해 포맷팅
      const stringValue = delimiter !== "-" ? value.replaceAll(delimiter, "-") : value;
      const endStringValue = delimiter !== "-" ? endValue.replaceAll(delimiter, "-") : endValue;
      // Date형 입력값
      const dateValue = new Date(stringValue);
      const endDateValue = new Date(endStringValue);

      if (!isNaN(dateValue.getTime()) && stringValue.length >= 9) {
        if (minDate && maxDate) {
          // minDate와 maxDate 값이 존재할경우
          if (dateUtil.diffDay(minDate, dateValue) <= 0 && dateUtil.diffDay(maxDate, dateValue) >= 0) {
            changeStartDate(dateValue);
            setSelectedStartDate(dateValue);
          } else {
            // minDate와 maxDate 사이날짜가 입력되지 않았을경우 오늘날짜로 초기화
            changeStartDate(todayInit);
            setSelectedStartDate(todayInit);
          }
        } else if (minDate && !maxDate) {
          //minDate값만 존재할경우
          if (dateUtil.diffDay(minDate, dateValue) <= 0) {
            changeStartDate(dateValue);
            setSelectedStartDate(dateValue);
          } else {
            // minDate값보다 작은 날짜가 입력되었을경우 오늘날짜로 초기화
            changeStartDate(todayInit);
            setSelectedStartDate(todayInit);
          }
        } else if (!minDate && maxDate) {
          // maxDate값만 존재할경우
          if (dateUtil.diffDay(maxDate, dateValue) >= 0) {
            changeStartDate(dateValue);
            setSelectedStartDate(dateValue);
          } else {
            // maxDate값보다 큰 날짜가 입력되었을경우 오늘날짜로 초기화
            changeStartDate(todayInit);
            setSelectedStartDate(todayInit);
          }
        } else {
          // minDate값과 maxDate값이 존재하지않을경우
          changeStartDate(dateValue);
          setSelectedStartDate(dateValue);
        }
        if (dateUtil.diffDay(dateValue, endDateValue) > 0) {
          // 시작날짜가 종료날짜보다 클경우
          changeEndDate(dateValue);
          setSelectedEndDate(dateValue);
          endRef.current.value = startRef.current.value;
        }
      } else {
        // 날짜가 유효하지않을경우 오늘날짜로
        changeStartDate(todayInit);
        setSelectedStartDate(todayInit);
      }
    }
  }, [changeEndDate, changeStartDate, delimiter, maxDate, minDate]);

  // 종료날짜 텍스트입력 적용 메서드
  const submitEndDate = useCallback(() => {
    if (endRef.current && startRef.current) {
      // input 입력값
      const value = endRef.current.value;
      const startValue = startRef.current.value;
      // 오늘날짜
      const todayInit = dateUtil.startOfDay(today);
      // input 입력값을 Date형으로 변환하기 위해 포맷팅
      const stringValue = delimiter !== "-" ? value.replaceAll(delimiter, "-") : value;
      const startStringValue = delimiter !== "-" ? startValue.replaceAll(delimiter, "-") : startValue;
      // Date형 입력값
      const dateValue = new Date(stringValue);
      const startDateValue = new Date(startStringValue);
      if (!isNaN(dateValue.getTime()) && stringValue.length >= 9) {
        if (minDate && maxDate) {
          // minDate와 maxDate 값이 존재할경우
          if (dateUtil.diffDay(minDate, dateValue) <= 0 && dateUtil.diffDay(maxDate, dateValue) >= 0) {
            changeEndDate(dateValue);
            setSelectedEndDate(dateValue);
          } else {
            // minDate와 maxDate 사이날짜가 입력되지 않았을경우 오늘날짜로 초기화
            changeEndDate(todayInit);
            setSelectedEndDate(todayInit);
          }
        } else if (minDate && !maxDate) {
          //minDate값만 존재할경우
          if (dateUtil.diffDay(minDate, dateValue) <= 0) {
            changeEndDate(dateValue);
            setSelectedEndDate(dateValue);
          } else {
            // minDate값보다 작은 날짜가 입력되었을경우 오늘날짜로 초기화
            changeEndDate(todayInit);
            setSelectedEndDate(todayInit);
          }
        } else if (!minDate && maxDate) {
          // maxDate값만 존재할경우
          if (dateUtil.diffDay(maxDate, dateValue) >= 0) {
            changeEndDate(dateValue);
            setSelectedEndDate(dateValue);
          } else {
            // maxDate값보다 큰 날짜가 입력되었을경우 오늘날짜로 초기화
            changeEndDate(todayInit);
            setSelectedEndDate(todayInit);
          }
        } else {
          // minDate값과 maxDate값이 존재하지않을경우
          changeEndDate(dateValue);
          setSelectedEndDate(dateValue);
        }
        if (dateUtil.diffDay(dateValue, startDateValue) < 0) {
          // 종료날짜가 시작날짜보다 작을경우
          changeStartDate(dateValue);
          setSelectedStartDate(dateValue);
          startRef.current.value = endRef.current.value;
        }
      } else {
        // 날짜가 유효하지않을경우 오늘날짜로
        changeEndDate(todayInit);
        setSelectedEndDate(todayInit);
      }
    }
  }, [changeEndDate, changeStartDate, delimiter, maxDate, minDate]);

  // 시작날짜 값 세팅
  useEffect(() => {
    if (startRef.current) {
      const inputValue = startRef.current.value;
      const reg = `(\\${delimiter}{1,2})$`;

      startRef.current.value = inputValue
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, `$1${delimiter}$2${delimiter}$3`)
        .replace(new RegExp(reg, "g"), ``);
    }
  }, [delimiter]);
  // 종료날짜 값 세팅
  useEffect(() => {
    if (endRef.current) {
      const inputValue = endRef.current.value;
      const reg = `(\\${delimiter}{1,2})$`;

      endRef.current.value = inputValue
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, `$1${delimiter}$2${delimiter}$3`)
        .replace(new RegExp(reg, "g"), ``);
    }
  }, [delimiter]);

  // 시작 텍스트값 세팅
  useEffect(() => {
    if (startRef.current) {
      startRef.current.value = dateUtil.dateFormat(
        selectedStartDate,
        `yyyy${delimiter}MM${delimiter}dd`,
      ) as string;
    }
  }, [delimiter, selectedStartDate, setSelectedStartDate]);

  // 종료 텍스트값 세팅
  useEffect(() => {
    if (endRef.current) {
      endRef.current.value = dateUtil.dateFormat(
        selectedEndDate,
        `yyyy${delimiter}MM${delimiter}dd`,
      ) as string;
    }
  }, [delimiter, selectedEndDate, setSelectedEndDate]);

  return (
    <>
      <TextField
        InputProps={{
          endAdornment: (
            <IconButton
              size="small"
              onClick={(e) => setOpenPopover(e.currentTarget)}
              disabled={disabled}
              sx={{ padding: "4px" }}
            >
              <Event fontSize="small" sx={{ height: `${svgSize}px`, width: `${svgSize}px` }} />
            </IconButton>
          ),
        }}
        inputProps={{
          style: { padding: `${paddingY}px 0 ${paddingY}px 10px`, fontSize: `${fontSize}px` },
          maxLength: 10,
        }}
        onChange={() => onChangeInputValue(startRef)}
        inputRef={startRef}
        onKeyDown={(e) => e.key === "Enter" && submitStartDate()}
        onBlur={submitStartDate}
        sx={{
          backgroundColor: theme.white,
          "> div.MuiOutlinedInput-root": {
            paddingRight: "3px",
          },
        }}
        disabled={disabled}
        value={viewStartDate}
      />
      <span>~</span>
      <TextField
        InputProps={{
          endAdornment: (
            <IconButton
              size="small"
              onClick={(e) => setOpenPopover(e.currentTarget)}
              disabled={disabled}
              sx={{ padding: "4px" }}
            >
              <Event fontSize="small" sx={{ height: `${svgSize}px`, width: `${svgSize}px` }} />
            </IconButton>
          ),
        }}
        inputProps={{
          style: { padding: `${paddingY}px 0 ${paddingY}px 10px`, fontSize: `${fontSize}px` },
          maxLength: 10,
        }}
        onChange={() => onChangeInputValue(endRef)}
        inputRef={endRef}
        onKeyDown={(e) => e.key === "Enter" && submitEndDate()}
        onBlur={submitEndDate}
        sx={{
          backgroundColor: theme.white,
          "> div.MuiOutlinedInput-root": {
            paddingRight: "3px",
          },
        }}
        disabled={disabled}
        value={viewEndDate}
      />
      <Popover
        id={isOpen ? "range-date-picker" : undefined}
        open={isOpen}
        onClose={onClose}
        anchorEl={startRef.current}
        anchorOrigin={{
          vertical: direction?.vertical ?? "bottom",
          horizontal: direction?.horizontal ?? "left",
        }}
        transformOrigin={
          directionAfter
            ? {
                vertical: directionAfter?.vertical,
                horizontal: directionAfter?.horizontal,
              }
            : undefined
        }
      >
        <RangePickerStyle.CalendarWrapper width={`${width * 2}px`}>
          <Box>
            <CommonDatePickerModel
              date={startDate}
              width={width - 2}
              selectedDate={selectedStartDate ?? startDate}
              changeSelectedDate={(date) => changeSelectedDate("start", date)}
              betweenDateList={betweenDateList}
              minDate={minDate}
              maxDate={selectedEndDate}
              searchDate={startViewDate}
              setSearchDate={setStartViewDate}
            />
          </Box>
          <Box>
            <CommonDatePickerModel
              date={endDate}
              width={width - 2}
              selectedDate={selectedEndDate ?? endDate}
              changeSelectedDate={(date) => changeSelectedDate("end", date)}
              betweenDateList={betweenDateList}
              minDate={selectedStartDate}
              maxDate={maxDate}
              searchDate={endViewDate}
              setSearchDate={setEndViewDate}
            />
          </Box>
        </RangePickerStyle.CalendarWrapper>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
          <RangePickerStyle.MacroButtonWrapper>
            {showRangeMacroButtons && (
              <ToggleButtonGroup
                size="small"
                value={""}
                sx={{ "> button": { height: "30px", width: `${width / 5}px` } }}
              >
                <ToggleButton value={"today"} size="small" onClick={() => onClickMacroButton(0)}>
                  오늘
                </ToggleButton>
                <ToggleButton
                  value={"month-1"}
                  size="small"
                  onClick={() => onClickMacroButton(1, "week")}
                >
                  1주일
                </ToggleButton>
                <ToggleButton
                  value={"month-1"}
                  size="small"
                  onClick={() => onClickMacroButton(1, "month")}
                >
                  1개월
                </ToggleButton>
                <ToggleButton
                  value={"month-3"}
                  size="small"
                  onClick={() => onClickMacroButton(3, "month")}
                >
                  3개월
                </ToggleButton>
                <ToggleButton
                  value={"month-6"}
                  size="small"
                  onClick={() => onClickMacroButton(6, "month")}
                >
                  6개월
                </ToggleButton>
                <ToggleButton
                  value={"year"}
                  size="small"
                  onClick={() => onClickMacroButton(12, "month")}
                >
                  1년
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            <Button variant="contained" className="light" onClick={onClose}>
              선택
            </Button>
          </RangePickerStyle.MacroButtonWrapper>
        </div>
      </Popover>
    </>
  );
};
export default DateRangePicker;
