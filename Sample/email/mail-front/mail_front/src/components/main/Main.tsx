"use client";

// import { useAtom, useAtomValue } from "jotai";
import List from "./List";
// import {
//   mainList,
//   mainPage,
//   mainSearchDay,
//   mainSearchDetail,
//   mainSearchEndDt,
//   mainSearchKeyword,
//   mainSearchMonth,
//   mainSearchSmunionCd,
//   mainSearchStartDt,
//   mainSearchType,
//   mainSearchYear,
//   mainTopBarIdx,
// } from "./Main.atom";
import Page from "./Page";
import Search from "./Search";
import TopBar from "./TopBar";

const Main = () => {
  // const [data, setData] = useAtom(mainList);
  // const mailType = useAtomValue(mainTopBarIdx);
  // const srchYear = useAtomValue(mainSearchYear);
  // const srchMonth = useAtomValue(mainSearchMonth);
  // const srchDay = useAtomValue(mainSearchDay);
  // const page = useAtomValue(mainPage);
  // const detailCkVal = useAtomValue(mainSearchDetail);
  // const searchStartDt = useAtomValue(mainSearchStartDt);
  // const searchEndDt = useAtomValue(mainSearchEndDt);
  // const keyword = useAtomValue(mainSearchKeyword);
  // const searchType = useAtomValue(mainSearchType);
  // const searchSmunionCd = useAtomValue(mainSearchSmunionCd);

  // const { data: maindata } = useSWR({
  //   url: "/list2",
  //   payload: {
  //     mailType: mailType,
  //     searchType: searchType,
  //     keyword: keyword,
  //     srchYear: srchYear.toString(),
  //     srchMonth: srchMonth.toString(),
  //     srchDay: srchDay.toString(),
  //     detailCkVal: detailCkVal,
  //     searchStartDt: dateUtil.dateFormat(searchStartDt, "yyyy-MM-dd"),
  //     searchEndDt: dateUtil.dateFormat(searchEndDt, "yyyy-MM-dd"),
  //     searchSmunionCd: searchSmunionCd,
  //     pnum: page, //검색 했는데 이전페이지(2)가 남아있음
  //     pageSize: "20",
  //   },
  //   isPost: true,
  // } as ISwrFetcher);

  // if (!maindata) {
  //   console.log("데이터 로딩 중 또는 없음");
  //   return; // 데이터가 로드될 때까지 작업 중단
  // }

  // setData(maindata);

  return (
    <>
      {/* {JSON.stringify(maindata)} */}
      <TopBar />
      <Search />
      <List />
      <Page />
    </>
  );
};

export default Main;
