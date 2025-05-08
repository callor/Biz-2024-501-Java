import Pagination from "@/components/pagination/Pagination";

import { mainList, mainPage, mainTopBarIdx, mainTotalCnt } from "@/components/main/Main.atom";
import { useAtom } from "jotai";

const Page = () => {
  const [value, setValue] = useAtom(mainTopBarIdx);
  const [data, setData] = useAtom(mainList);
  const [page, setPage] = useAtom(mainPage);
  const [totalCnt, setTotalCnt] = useAtom(mainTotalCnt);

  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Pagination currentPage={page} setCurrentPage={setPage} totalCnt={alarmMaster?.total_cnt ?? 1} /> */}
        <Pagination
          viewCount={"20"}
          currentPage={page}
          setCurrentPage={(e) => {
            setPage(e);
          }}
          totalCnt={totalCnt}
        />
      </div>
    </>
  );
};

export default Page;
