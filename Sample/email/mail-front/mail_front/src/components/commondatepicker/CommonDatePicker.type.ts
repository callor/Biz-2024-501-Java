import { PopoverOrigin } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

// 데이트피커 기본 type
type IBasePicker = {
  paddingY?: number; // 높이 지정
  fontSize?: number; // 텍스트필드 폰트사이즈
  width?: number; // 텍스트필드 너비
  minDate?: Date; // 선택가능한 최소날짜
  maxDate?: Date; // 선택가능한 최대날짜
  delimiter?: string; // 날짜 구분자
  disabled?: boolean; // 비활성 여부
  svgSize?: number; // 달력아이콘 크기
  // 팝오버 방향
  direction?: PopoverOrigin;
  // 팝오버 조정값
  directionAfter?: PopoverOrigin;
  closePopover?: (startDt: Date, endDt: Date) => void;
};

// 데이트피커 공통 interface
export interface ICommonPicker extends IBasePicker {
  mode: "date" | "month" | "skeleton";
  range?: boolean; // true: 범위 데이트피커 | false : 단일 데이트피커
  monoDate?: Date; // 단일 날짜
  changeMonoDate?: (date: Date) => void; // 단일날짜 변경 메서드
  startDate?: Date; // 범위 시작날짜
  changeStartDate?: (date: Date) => void; // 범위 시작날짜 변경 메서드
  endDate?: Date; // 범위 종료날짜
  changeEndDate?: (date: Date) => void; // 범위 종료날짜 변경 메서드
  showRangeMacroButtons?: boolean; // 범위피커일때 매크로버튼 show 여부
  // 241010 추가
  viewStartDate?: String
  viewEndDate?: String
}

// 단일피커 공통 interface
export interface IMonoPicker extends IBasePicker {
  monoDate: Date; // 단일 날짜
  changeMonoDate: (date: Date) => void; //단일날짜 변경메서드
}

// 범위피커 공통 interface
export interface IRangePicker extends IBasePicker {
  startDate: Date;
  changeStartDate: (date: Date) => void;
  endDate: Date;
  changeEndDate: (date: Date) => void;
  showRangeMacroButtons?: boolean;
  // 241010 추가
  viewStartDate?: String
  viewEndDate?: String
}

// 데이트피커 모델 interface
export interface IDatePickerModel {
  date: Date;
  width: number;
  selectedDate: Date;
  changeSelectedDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  betweenDateList?: (string | undefined)[];
  searchDate: Date;
  setSearchDate: Dispatch<SetStateAction<Date>>;
  type?: "start" | "end";
}

// kmemo 특일 응답 interface
export interface IHolidayResponse {
  locDate?: number; // 날짜 ( yyyyMMdd )
  sno?: number; // 순번( 같은날에 여러 특일이 존재할 경우 증가 )
  name?: string; // 특일명
  kind?: string; // 특일 종류 (01: 공휴일, 02: 기념일)
  holidayYn?: "Y" | "N"; // Y-공휴일 / 대체공휴일, N-기념일(안쉬는날)
}
