import { Event } from "@mui/icons-material";
import { Button, IconButton, Popover, TextField } from "@mui/material";
import theme from "../../../../styles/theme";
import { dateUtil } from "../../../../utils/date";
import { usePopoverScroll } from "../../../../utils/usePopover";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IMonoPicker } from "../../CommonDatePicker.type";
import CommonMonthPickerModel from "../../model/CommonMonthPicker.model";
import * as MonoPickerStyle from "./MonoPicker.style";

/**
 * @apiNote 단일 먼스피커 컴포넌트
 */
const today = new Date();
const MonthMonoPicker = ({
  paddingY = 5,
  fontSize = 13,
  width = 100,
  monoDate,
  changeMonoDate,
  minDate = dateUtil.dateBuilder(today, { year: 2010, month: 0, date: 1 }),
  maxDate = dateUtil.dateBuilder(today, { year: 2100, month: 11, date: 31 }),
  delimiter = "-",
  disabled,
  svgSize,
  direction,
  directionAfter,
}: IMonoPicker) => {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(monoDate);
  const [searchDate, setSearchDate] = useState<Date>(selectedDate);
  const anchorRef = useRef<HTMLInputElement | null>(null);

  const isOpen = useMemo(() => Boolean(openPopover), [openPopover]);

  // 스크롤 이벤트
  usePopoverScroll(!!openPopover, () => setOpenPopover(null), "mono-month-picker", { once: false });

  // const trigger = useScrollTrigger({ threshold: 0 });
  // useEffect(() => {
  //   trigger && isOpen && setOpenPopover(null);
  // }, [isOpen, openPopover, trigger]);

  /**
   * 팝오버 닫기 이벤트
   */
  const onClose = useCallback(() => {
    changeMonoDate(selectedDate);
    setOpenPopover(null);
  }, [changeMonoDate, selectedDate]);

  /**
   * '이번달' 선택 이벤트
   */
  const onClickSetThisMonth = useCallback(() => {
    if (anchorRef.current) {
      setSearchDate(today);
      setSelectedDate(today);
      anchorRef.current.value = dateUtil.dateFormat(today, `yyyy${delimiter}MM`) as string;
    }
  }, [delimiter]);

  /**
   * 텍스트 입력 날짜적용 메서드
   */
  const submitDate = useCallback(() => {
    if (anchorRef.current) {
      // input 입력값
      const value = anchorRef.current.value;
      // 오늘날짜
      const todayInit = dateUtil.startOfDay(today);
      // input 입력값을 Date형으로 변환하기 위해 포맷팅
      const stringValue = delimiter !== "-" ? value.replaceAll(delimiter, "-") : value;
      // Date형 입력값
      const dateValue = new Date(stringValue);
      if (!isNaN(dateValue.getTime()) && stringValue.length >= 6) {
        if (minDate && maxDate) {
          // minDate와 maxDate 값이 존재할경우
          if (dateUtil.diffDay(minDate, dateValue) <= 0 && dateUtil.diffDay(maxDate, dateValue) >= 0) {
            changeMonoDate(dateValue);
            setSelectedDate(dateValue);
          } else {
            // minDate와 maxDate 사이날짜가 입력되지 않았을경우 오늘날짜로 초기화
            changeMonoDate(todayInit);
            setSelectedDate(todayInit);
          }
        } else if (minDate && !maxDate) {
          //minDate값만 존재할경우
          if (dateUtil.diffDay(minDate, dateValue) <= 0) {
            changeMonoDate(dateValue);
            setSelectedDate(dateValue);
          } else {
            // minDate값보다 작은 날짜가 입력되었을경우 오늘날짜로 초기화
            changeMonoDate(todayInit);
            setSelectedDate(todayInit);
          }
        } else if (!minDate && maxDate) {
          // maxDate값만 존재할경우
          if (dateUtil.diffDay(maxDate, dateValue) >= 0) {
            changeMonoDate(dateValue);
            setSelectedDate(dateValue);
          } else {
            // maxDate값보다 큰 날짜가 입력되었을경우 오늘날짜로 초기화
            changeMonoDate(todayInit);
            setSelectedDate(todayInit);
          }
        } else {
          // minDate값과 maxDate값이 존재하지않을경우
          changeMonoDate(dateValue);
          setSelectedDate(dateValue);
        }
      } else {
        // 날짜가 유효하지않을경우 오늘날짜로
        changeMonoDate(todayInit);
        setSelectedDate(todayInit);
      }
    }
  }, [changeMonoDate, delimiter, maxDate, minDate]);

  /**
   * 텍스트로 날짜입력시 검증 메서드
   */
  const onChangeInputValue = useCallback(() => {
    if (anchorRef.current) {
      const inputValue = anchorRef.current.value;
      const reg = `(\\${delimiter}{1,2})$`;

      anchorRef.current.value = inputValue
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})$/g, `$1${delimiter}$2`)
        .replace(new RegExp(reg, "g"), ``);
    }
  }, [delimiter]);

  // 텍스트 값 세팅
  useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.value = dateUtil.dateFormat(selectedDate, `yyyy${delimiter}MM`) as string;
    }
  }, [delimiter, selectedDate, setSelectedDate]);

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
          style: {
            padding: `${paddingY}px 0 ${paddingY}px 10px`,
            fontSize: `${fontSize}px`,
            width: `${width}px`,
          },
          maxLength: 7,
        }}
        onChange={onChangeInputValue}
        inputRef={anchorRef}
        onKeyDown={(e) => e.key === "Enter" && submitDate()}
        onBlur={submitDate}
        sx={{
          backgroundColor: theme.white,
          "> div.MuiOutlinedInput-root": {
            paddingRight: "3px",
          },
        }}
        disabled={disabled}
      />
      <Popover
        id={isOpen ? "mono-month-picker" : undefined}
        open={isOpen}
        onClose={onClose}
        anchorEl={anchorRef.current}
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
        <CommonMonthPickerModel
          date={monoDate}
          width={width}
          selectedDate={selectedDate}
          changeSelectedDate={(date) => setSelectedDate(date)}
          minDate={minDate}
          maxDate={maxDate}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
        />
        <MonoPickerStyle.SelectButtonWrapper>
          <Button variant="outlined" className="light" onClick={onClickSetThisMonth}>
            이번달
          </Button>
          <Button variant="contained" className="light" onClick={onClose}>
            선택
          </Button>
        </MonoPickerStyle.SelectButtonWrapper>
      </Popover>
    </>
  );
};
export default MonthMonoPicker;
