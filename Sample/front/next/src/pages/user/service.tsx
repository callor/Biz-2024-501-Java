import MyPageLayout from '@components/layout/mypage';

const MyServicePage = () => {
  return <MyPageLayout></MyPageLayout>;
};

MyServicePage.getInitialProps = async () => {
  return { a: 1 };
};

export default MyServicePage;
