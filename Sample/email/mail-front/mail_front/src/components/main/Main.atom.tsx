import { dateUtil } from "@/utils/date";
import { atomWithReset, RESET } from "jotai/utils";

// 메일 조회 메뉴
export const mainTopBarIdx = atomWithReset<number>(0);
// 이 페이지를 벗어나면 다시 0으로 돌아감
mainTopBarIdx.onMount = (setAtom) => {
  // 페이지 들어왔을 때 실행

  // return > 페이지 나갈 때 실행
  return () => setAtom(RESET);
};

export const mainSearchYear = atomWithReset<string>(dateUtil.dateFormat(new Date(), "yyyy") as string);
mainSearchYear.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchMonth = atomWithReset<string>(dateUtil.dateFormat(new Date(), "M") as string);
mainSearchMonth.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchDay = atomWithReset<string>(dateUtil.dateFormat(new Date(), "d") as string);
mainSearchDay.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainList = atomWithReset<any[]>([]);
mainList.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainPage = atomWithReset<number>(1);
mainPage.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainTotalCnt = atomWithReset<number>(0);
mainTotalCnt.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchStartDt = atomWithReset<Date>(new Date());
mainSearchStartDt.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchEndDt = atomWithReset<Date>(new Date());
mainSearchEndDt.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchKeyword = atomWithReset<String>("");
mainSearchKeyword.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchType = atomWithReset<String>("");
mainSearchType.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchDetail = atomWithReset<Boolean>(false);
mainSearchDetail.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainTextChanged = atomWithReset<Boolean[]>([]);
mainTextChanged.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainCompChanged = atomWithReset<Boolean[]>([]);
mainCompChanged.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

export const mainSearchSmunionCd = atomWithReset<String>("");
mainSearchSmunionCd.onMount = (setAtom) => {
  return () => setAtom(RESET);
};

// export const MainSearchState = atomWithReset<Boolean>(false);
// MainSearchState.onMount = (setAtom) => {
//   return () => setAtom(RESET);
// };
