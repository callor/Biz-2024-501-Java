import MyPageLayout from "@components/layout/mypage";
import styled from "@emotion/styled";

const MyServicePage = () => {
  return <MyPageLayout></MyPageLayout>;
};

MyServicePage.getInitialProps = async () => {
  return { a: 1 };
};

export default MyServicePage;
