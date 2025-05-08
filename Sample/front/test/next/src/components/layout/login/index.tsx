import styled from "@emotion/styled";
import React, { ReactNode } from "react";

const Container = styled.div`
  /* TODO: 수정요청함 */
  height: 100%;
`;

export const LoginBox = styled.div`
  position: relative;
  width: 400px;
  margin: 0 auto;
  padding-top: 100px;
  > h2 {
    font-size: 30px;
    font-weight: 500;
    color: #252525;
    text-align: center;
    + p {
      font-size: 18px;
      color: #999999;
      padding: 22px 0 30px;
      text-align: center;
    }
  }
`;
const LoginLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default LoginLayout;
