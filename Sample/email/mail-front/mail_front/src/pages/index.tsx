import Header from "@/components/Header";
import Main from "@/components/main/Main";
import { getUserDetail } from "@/module/user/user";
import { useMediaQuery } from "@mui/material";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { mainSearchSmunionCd } from "../components/main/Main.atom";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 유저쿠키값 가져와서 > header에 적용 > 문제! 클라이언트 cookie 가져오는걸 씀 > ssr 에 없어서 문제남
  //   console.log(cookies().get("_sd"));

  const LoginForm = dynamic(() => import("@/components/loginform/LoginForm"));
  const { userInfo } = getUserDetail();
  // const [fold, setFold] = useAtom(floatingSliderAtom);
  const upTo1921 = useMediaQuery("(min-width: 1921px)");
  const [searchSmunionCd, setSearchSmunionCd] = useAtom(mainSearchSmunionCd);

  if (!userInfo) {
    return <LoginForm />;
  } else {
    if (searchSmunionCd == "") {
      // if (userInfo.auth != "admin" && searchSmunionCd == "") {
      let smunionListTxt =
        userInfo.smunionList?.map((item) => item.SMUNIONCD.toString()).join(",") || "";
      setSearchSmunionCd(smunionListTxt);
    }
    // if (userInfo.auth == "admin" && searchSmunionCd == "") {
    //   let smunionListTxt = "101,103,104,106,600,107";
    //   setSearchSmunionCd(smunionListTxt);
    // }
  }

  return (
    <>
      {mounted && <Header />}
      {mounted && <Main />}
    </>
  );
};

export default Index;
