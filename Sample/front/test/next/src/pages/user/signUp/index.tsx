import { CheckBoxBasic } from "@components/common/basic/CheckBoxBasic";
import { BlueButton } from "@components/common/button";
import ButtonWrap from "@components/common/button/ButtonWrap";
import LoginLayout, { LoginBox } from "@components/layout/login";
import {
  CheckRow,
  FormButtonBasic,
  FormConfrimButton,
  FormWrap,
  InputBox,
} from "@components/mypage/form";
import MyPagePopup from "@components/mypage/popup";
import styled from "@emotion/styled";
import rootStore from "@stores";
import { axios } from "@utils/network.util";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";
import "react-toastify/dist/ReactToastify.css";

const JoinBox = styled(LoginBox)`
  padding-top: 60px;
  > h2 {
    margin-bottom: 40px;
  }
  ${CheckBoxBasic} input[type="checkbox"] + label strong {
    font-weight: 500px;
  }

  ${CheckBoxBasic} + ${CheckBoxBasic} {
    margin-top: 10px;
  }
`;

const PopCont = styled.div`
  padding: 20px;
  box-sizing: border-box;
  ${ButtonWrap} {
    margin-top: 20px;
    > button {
      width: 120px;
      height: 34px;
      line-height: 32px;
      border-radius: 5px;
    }
  }
`;

const AgreeBoxWrap = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #dbdbdb;
  padding: 10px;
  padding-right: 3px;
  box-sizing: border-box;

  > div.agree_box {
    font-size: 14px;
    line-height: 1.5;
    padding-right: 15px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  padding-left: 10px;
  margin-top: 5px;
`;

const JoinPage = () => {
  //#region popup
  const [isUseAgreePop, setUseAgreePop] = useState(false);
  const [isPrivacyPop, setPrivacyPop] = useState(false);
  const [isAdPop, setAdPop] = useState(false);
  const onToggleUseAgreePop = useCallback(() => {
    setUseAgreePop(!isUseAgreePop);
  }, [isUseAgreePop]);

  const onTogglePrivacyPop = useCallback(() => {
    setPrivacyPop(!isPrivacyPop);
  }, [isPrivacyPop]);

  const onToggleAdPop = useCallback(() => {
    setAdPop(!isAdPop);
  }, [isAdPop]);
  //#endregion

  const router = useRouter();
  const { register, errors, getValues, setValue, handleSubmit } = useForm();

  const onJoinSubmit = useCallback(
    handleSubmit(
      async ({ checkId, useYn, passwordConfirm, notifyYn, ...formData }) => {
        if (checkId !== "Y") {
          alert("아이디 중복검사를 하셔야 합니다.");
          return;
        }
        if (useYn !== "Y") {
          alert("이용약관에 동의하셔야 합니다.");
          return;
        }
        if (formData.password !== passwordConfirm) {
          alert("비밀번호와 비밀번호 확인에 입력하신 정보가 맞지 않습니다.");
          return;
        }
        const agreeYn = notifyYn ? "Y" : "N";
        try {
          const { data: token } = await axios.post("/user/signUp", {
            ...formData,
            sno: Number(formData.sno),
            agreeYn,
          });
          const { data } = await axios.post(
            "/api/signUp",
            { token },
            { baseURL: "" }
          );
          axios.defaults.headers.authorization = `Bearer ${data.token}`;
          rootStore.commonStore.settingLoggedIn(data);
          alert("회원가입 되셨습니다.");
          router.replace("/user/signUp/complete");
        } catch (error) {
          alert("오류가 발생했습니다.");
        }
      }
    ),
    []
  );

  const onSendCert = useCallback(async () => {
    const mobile = getValues().mobile.replace(/[^\d]/g, "");
    if (mobile) {
      try {
        const { data: sno } = await axios.post("/sms/cert", { mobile });
        setValue("sno", sno);
      } catch (error) {
        if (error?.response?.status === 400) {
          alert("인증횟수가 초과하였습니다.\n잠시 후 다시 시도해주세요");
        }
      }
    } else {
      alert("핸드폰 번호를 입력해주세요.");
    }
  }, []);

  const onCheckLoginIdClick = useCallback(async () => {
    const loginId = getValues().loginId;
    if (loginId) {
      const { data: isUser } = await axios.get(`/user/check/${loginId}`);
      if (isUser) {
        setValue("checkId", "Y");
        alert("사용가능한 아이디 입니다.");
      } else {
        alert("이미 사용중인 아이디 입니다.");
      }
    } else {
      alert("아이디를 입력해주세요.");
    }
  }, []);

  return (
    <LoginLayout>
      <JoinBox>
        <h2>회원가입</h2>
        <form autoComplete="off" onSubmit={onJoinSubmit}>
          <input type="hidden" ref={register} name="sno" />
          <input type="hidden" ref={register} name="checkId" />
          <fieldset>
            <FormWrap>
              <InputBox hasButton>
                {/** Dummy 크롬 자동완성 방해 */}
                <input
                  type="password"
                  autoComplete="new-password"
                  style={{ display: "none" }}
                />
                <input
                  name="loginId"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  autoComplete="off"
                  ref={register({
                    required: {
                      value: true,
                      message: "사용하실 아이디를 입력해주세요.",
                    },
                    pattern: {
                      value: /(?!(\.|_))(?!.*(\.|_)$)(?!.*(\.|_){2,})^[\w.]{4,18}$/,
                      message: "아이디는 영문과 숫자의 조합으로만 가능합니다.",
                    },
                  })}
                />
                <FormButtonBasic onClick={onCheckLoginIdClick} type="button">
                  중복확인
                </FormButtonBasic>
                {errors?.loginId && (
                  <ErrorMessage>{errors?.loginId.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요"
                  ref={register({
                    required: {
                      value: true,
                      message: "비밀번호를 입력해주세요.",
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\$\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\/\.\,\>\<\?\\\|]{6,}$/,
                      message:
                        "비밀번호는 영어1글자 숫자1글자를 포함하여 6자리 이상으로 만들어주세요.",
                    },
                  })}
                />
                {errors?.password && (
                  <ErrorMessage>{errors?.password.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox>
                <input
                  name="passwordConfirm"
                  type="password"
                  placeholder="비밀번호 확인"
                  autoComplete="off"
                  ref={register({
                    required: {
                      value: true,
                      message: "비밀번호 확인을 입력해주세요.",
                    },
                  })}
                />
                {errors?.passwordConfirm && (
                  <ErrorMessage>{errors?.passwordConfirm.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox>
                <input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  autoComplete="off"
                  name="kornm"
                  ref={register({
                    required: { value: true, message: "이름을 입력해주세요." },
                    pattern: {
                      value: /[a-zA-Z가-힣]$/,
                      message: "이름은 영문 또는 한글로 사용 가능합니다. ",
                    },
                  })}
                />
                {errors?.kornm && (
                  <ErrorMessage>{errors?.kornm.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  autoComplete="off"
                  name={"email"}
                  ref={register({
                    required: {
                      value: true,
                      message: "이메일을 입력해주세요.",
                    },
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "이메일이 정확하지 않습니다.",
                    },
                  })}
                />
                {errors?.email && (
                  <ErrorMessage>{errors?.email.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox hasButton>
                <input
                  type="text"
                  placeholder="핸드폰번호를 입력해주세요."
                  autoComplete="off"
                  name="mobile"
                  ref={register({
                    required: {
                      value: true,
                      message: "핸드폰번호를 입력해주세요.",
                    },
                    pattern: {
                      value: /([\d]{3})(-|)([\d]{3,4})(-|)([\d]{4})/,
                      message: "핸드폰번호가 정확하지 않습니다.",
                    },
                  })}
                />
                <FormButtonBasic onClick={onSendCert} type={"button"}>
                  인증번호 발송
                </FormButtonBasic>
                {errors?.mobile && (
                  <ErrorMessage>{errors?.mobile.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox>
                <input
                  type="text"
                  placeholder="인증번호"
                  autoComplete="off"
                  name={"certMsg"}
                  ref={register({
                    required: {
                      value: true,
                      message: "인증번호를 입력해주세요.",
                    },
                  })}
                />
                {errors?.certMsg && (
                  <ErrorMessage>{errors?.certMsg.message}</ErrorMessage>
                )}
              </InputBox>
              <CheckRow>
                <CheckBoxBasic>
                  <input
                    type="checkbox"
                    id="agree01"
                    name={"useYn"}
                    ref={register}
                    value={"Y"}
                  />
                  <label htmlFor="agree01">
                    <a onClick={onToggleUseAgreePop}>
                      <strong>이용약관</strong>
                    </a>
                    과{" "}
                    <a onClick={onTogglePrivacyPop}>
                      <strong>개인정보처리방침</strong>
                    </a>
                    에 동의합니다.(필수)
                  </label>
                </CheckBoxBasic>
                <CheckBoxBasic>
                  <input
                    type="checkbox"
                    name={"notifyYn"}
                    id="agree02"
                    ref={register}
                    value={"Y"}
                  />
                  <label htmlFor="agree02">
                    <a onClick={onToggleAdPop}>
                      <strong>광고성 정보 수신</strong>
                    </a>
                    에 동의합니다.(선택)
                  </label>
                </CheckBoxBasic>
              </CheckRow>
              <ButtonWrap>
                <FormConfrimButton type={"submit"}>회원가입</FormConfrimButton>
              </ButtonWrap>
            </FormWrap>
          </fieldset>
        </form>
      </JoinBox>
      <MyPagePopup
        title="이용약관"
        show={isUseAgreePop}
        onClose={onToggleUseAgreePop}
      >
        <PopCont>
          <AgreeBoxWrap>
            <div className="agree_box">이용약관</div>
          </AgreeBoxWrap>
          <ButtonWrap>
            <BlueButton onClick={onToggleUseAgreePop}>확인</BlueButton>
          </ButtonWrap>
        </PopCont>
      </MyPagePopup>
      <MyPagePopup
        title="개인정보처리방침"
        show={isPrivacyPop}
        onClose={onTogglePrivacyPop}
      >
        <PopCont>
          <AgreeBoxWrap>
            <div className="agree_box">개인정보처리방침</div>
          </AgreeBoxWrap>
          <ButtonWrap>
            <BlueButton onClick={onTogglePrivacyPop}>확인</BlueButton>
          </ButtonWrap>
        </PopCont>
      </MyPagePopup>
      <MyPagePopup
        title="광고성 정보 수신"
        show={isAdPop}
        onClose={onToggleAdPop}
      >
        <PopCont>
          <AgreeBoxWrap>
            <div className="agree_box">광고성 정보 수신</div>
          </AgreeBoxWrap>
          <ButtonWrap>
            <BlueButton onClick={onToggleAdPop}>확인</BlueButton>
          </ButtonWrap>
        </PopCont>
      </MyPagePopup>
    </LoginLayout>
  );
};

export default JoinPage;
