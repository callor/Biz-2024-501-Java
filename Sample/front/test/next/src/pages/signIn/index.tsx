import React, { useEffect } from "react";
import LoginLayout, { LoginBox } from "@components/layout/login";
import styled from "@emotion/styled";
import { FormConfrimButton, FormWrap, InputBox } from "@components/mypage/form";
import ButtonWrap from "@components/common/button/ButtonWrap";
import Link from "next/link";
import { useForm } from "react-hook-form/dist/index.ie11";
import { flowResult } from "mobx";
import { observer } from "mobx-react";
import rootStore from "@stores";
import { axios } from "@utils/network.util";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

const FindBox = styled.div`
  text-align: center;
  margin-top: 30px;
  > a {
    position: relative;
    display: inline-block;
    font-weight: 350;
    color: #454545;
    + a {
      margin-left: 23px;
    }
    &:after {
      position: absolute;
      top: 60%;
      right: -13px;
      transform: translateY(-50%);
      content: "";
      display: block;
      width: 1px;
      height: 12px;
      background-color: #999999;
    }
    &:last-child:after {
      display: none;
    }
  }
`;

const LoginPage = ({ id }: { id?: string }) => {
  const { register, handleSubmit } = useForm<{ id: string; pw: string }>({
    defaultValues: { id: id ?? "" },
  });
  const { authStore } = rootStore;
  const router = useRouter();

  const onSubmit = handleSubmit(async ({ id, pw }) => {
    try {
      const member = await flowResult(authStore.userSignIn(id, pw));
      if (member) {
        axios.defaults.headers.authorization = `Bearer ${member.token}`;
        rootStore.commonStore.settingLoggedIn(member);
        alert("로그인 되었습니다");
        router.replace("/");
      } else {
        alert("아이디 또는 비밀번호가 맞지않습니다.");
      }
    } catch (error) {
      alert("아이디 또는 비밀번호가 맞지않습니다.");
    }
  });

  useEffect(() => {
    if (rootStore.commonStore.isLoggedIn) {
      alert("로그인이 되어있습니다.");
      router.replace("/");
    }
  }, []);

  return (
    <LoginLayout>
      <LoginBox>
        <h2>로그인</h2>
        <p>Kmemo에 오신 것을 환영합니다.</p>
        <form onSubmit={onSubmit}>
          <fieldset>
            <FormWrap>
              <InputBox>
                <input
                  type="text"
                  name="id"
                  ref={register}
                  placeholder="아이디를 입력해주세요"
                  autoComplete="username"
                />
              </InputBox>
              <InputBox>
                <input
                  type="password"
                  name="pw"
                  ref={register}
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="current-password"
                />
              </InputBox>
              {/* <CheckRow>
                <CheckBoxBasic>
                  <input type="checkbox" id="loginIng" />
                  <label htmlFor="loginIng">로그인 상태 유지</label>
                </CheckBoxBasic>
              </CheckRow> */}
              <ButtonWrap>
                <FormConfrimButton>로그인</FormConfrimButton>
              </ButtonWrap>
              <FindBox>
                <Link href="/user/find/id">
                  <a>아이디찾기</a>
                </Link>
                <Link href="/user/find/pw">
                  <a>비밀번호찾기</a>
                </Link>
                <Link href="/user/signUp">
                  <a>회원가입</a>
                </Link>
              </FindBox>
            </FormWrap>
          </fieldset>
        </form>
      </LoginBox>
    </LoginLayout>
  );
};

LoginPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  return { id };
};

export default observer(LoginPage);
