import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useMemo } from "react";
import * as PaginationStyle from "./Pagination.style";

/**
 * @apiNote : 페이지네이션 생성 컴포넌트
 */
const Pagination = ({
  viewCount = "20",
  currentPage,
  setCurrentPage,
  totalCnt = 0,
}: {
  viewCount?: string;
  currentPage: number | undefined;
  setCurrentPage: (nextPage: number) => void;
  totalCnt?: number;
}) => {
  const totalPageCnt = useMemo(() => Math.ceil(totalCnt / parseInt(viewCount)), [totalCnt, viewCount]);
  const pageList = useMemo(
    () => (totalPageCnt ? Array.from(Array(totalPageCnt), (_, index) => index + 1) : [1]),
    [totalPageCnt],
  );
  // 각 블럭당 첫번째 페이지
  const eachBlockFirstPage = useMemo(
    () =>
      pageList.filter((page) => {
        return page % 10 === 1;
      }),
    [pageList],
  );

  // 마지막 페이지 번호
  const lastPageNo = useMemo(() => pageList[pageList.length - 1], [pageList]);
  // 각블럭당 페이지 리스트
  const pageListByEachBlock = useMemo(
    () => eachBlockFirstPage.map((page) => Array.from(Array(10), (_, index) => page + index)),
    [eachBlockFirstPage],
  );

  // 이전블럭 페이지 리스트
  const prevPageList = useMemo(
    () => pageListByEachBlock[Math.floor((currentPage ? currentPage : 0) / 10) - 1],
    [currentPage, pageListByEachBlock],
  );
  // 현재블럭 페이지 리스트
  const currentPageList = useMemo(
    () =>
      pageListByEachBlock
        .find((pageList) => pageList.includes(currentPage ? currentPage : 0))
        ?.filter((cPage) => cPage <= lastPageNo),
    [currentPage, lastPageNo, pageListByEachBlock],
  );
  // 다음블럭 페이지 리스트
  const nextPageList = useMemo(
    () => pageListByEachBlock[Math.floor((currentPage ? currentPage : 0) / 10) + 1],
    [currentPage, pageListByEachBlock],
  );

  return (
    <PaginationStyle.Container>
      <PaginationStyle.Button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className={`arrow ${currentPage === 1 ? "disabled" : "on"}`}
      >
        <KeyboardDoubleArrowLeft fontSize="small" />
      </PaginationStyle.Button>
      <PaginationStyle.Button
        onClick={() => {
          if (prevPageList) {
            setCurrentPage(prevPageList[0]);
          } else {
            setCurrentPage(1);
          }
        }}
        disabled={currentPage === 1}
        className={`arrow ${currentPage === 1 ? "disabled" : "on"}`}
      >
        <KeyboardArrowLeft fontSize="small" />
      </PaginationStyle.Button>
      {currentPageList?.map((page) => (
        <PaginationStyle.Button
          className={`index ${currentPage === page ? "on" : ""}`}
          key={`page-${page}`}
          w={26}
          mx={1}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PaginationStyle.Button>
      ))}
      <PaginationStyle.Button
        onClick={() => {
          if (nextPageList) {
            setCurrentPage(nextPageList[0]);
          } else {
            setCurrentPage(lastPageNo);
          }
        }}
        disabled={currentPage === lastPageNo}
        className={`arrow ${currentPage === lastPageNo ? "disabled" : "on"}`}
      >
        <KeyboardArrowRight fontSize="small" />
      </PaginationStyle.Button>
      <PaginationStyle.Button
        onClick={() => setCurrentPage(lastPageNo)}
        className={`arrow ${currentPage === lastPageNo ? "disabled" : "on"}`}
      >
        <KeyboardDoubleArrowRight fontSize="small" />
      </PaginationStyle.Button>
    </PaginationStyle.Container>
  );
};

export default Pagination;
