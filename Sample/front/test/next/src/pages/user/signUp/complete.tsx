import ButtonWrap from "@components/common/button/ButtonWrap";
import LoginLayout, { LoginBox } from "@components/layout/login";
import { FormButtonBlue } from "@components/mypage/form";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const JoinBox = styled(LoginBox)`
  padding-top: 170px;
  > ${ButtonWrap} {
    margin-top: 30px;
    > button {
      width: 100%;
      height: 48px;
      font-size: 18px;
      font-weight: 500;
      line-height: 46px;
      border-radius: 5px;
    }
  }
`;

const JoinCompletePage = () => {
  const router = useRouter();

  const onClick = () => {
    router.replace("/");
  };
  return (
    <LoginLayout>
      <JoinBox>
        <h2>회원가입이 완료되었습니다.</h2>
        <p>자동 로그인 되었으며, 서비스를 이용할 수 있습니다.</p>
        <ButtonWrap>
          <FormButtonBlue onClick={onClick}>확인</FormButtonBlue>
        </ButtonWrap>
      </JoinBox>
    </LoginLayout>
  );
};
export default JoinCompletePage;
