import { mainPage, mainTopBarIdx } from "@/components/main/Main.atom";
import { getUserDetail } from "@/module/user/user";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { useEffect } from "react";

const TopBar = () => {
  const [value, setValue] = useAtom(mainTopBarIdx);
  const [page, setPage] = useAtom(mainPage);
  const { userInfo } = getUserDetail();

  // mailType이 변경될 때 page를 1로 초기화
  useEffect(() => {
    setPage(1);
    /* eslint-disable-next-line */
  }, [value]); // mailType이 변경될 때마다 page를 1로 설정

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(e, newValue: string) => setValue(Number(newValue))}
            aria-label="basic tabs example"
          >
            {(userInfo?.auth?.trim().toUpperCase() === "ADMIN"
              ? ["전체", "수신메일📥", "발신메일📤", "테스트전체", "테스트수신", "테스트발신"]
              : ["전체", "수신메일📥", "발신메일📤"]
            ).map((item, idx) => (
              <Tab
                key={`tab_${item}`}
                label={item}
                id={`simple-tab-${idx}`}
                aria-controls={`simple-tabpanel-${idx}`}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
