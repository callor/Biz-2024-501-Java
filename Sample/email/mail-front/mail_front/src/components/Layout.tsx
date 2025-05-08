"user clie";
import { getUserDetail } from "@/module/user/user";
import { useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import Header from "./Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const LoginForm = dynamic(() => import("@/components/loginform/LoginForm"));

  const { userInfo } = getUserDetail();

  const upTo1921 = useMediaQuery("(min-width: 1921px)");

  if (!userInfo) {
    return <LoginForm />;
  }

  return (
    <div>
      <Header />
      <div
        style={{
          width: upTo1921 ? "1620px" : "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default BaseLayout;
