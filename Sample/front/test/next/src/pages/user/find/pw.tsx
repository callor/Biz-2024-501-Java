import ButtonWrap from "@components/common/button/ButtonWrap";
import LoginLayout, { LoginBox } from "@components/layout/login";
import {
  FormButtonBasic,
  FormConfrimButton,
  FormWrap,
  InputBox,
} from "@components/mypage/form";
import { axios } from "@utils/network.util";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";

const FindPaswwordPage = () => {
  const router = useRouter();
  const [sno, setSno] = useState<number>();
  const [userId, setUserId] = useState<string>();
  const { register, handleSubmit, getValues } = useForm();

  const onSendSmsClick = async () => {
    const mobile: string = getValues().mobile.replace(/[^\d]/g, "");
    if (mobile.length === 10 || mobile.length === 11) {
      try {
        const { data: sno } = await axios.post("/sms/cert", { mobile });
        setSno(sno);
      } catch (error) {
        if (error?.response?.status === 400) {
          alert("인증횟수가 초과하였습니다.\n잠시 후 다시 시도해주세요");
        }
      }
    } else {
      alert("핸드폰 번호가 올바르지 않습니다.");
    }
  };

  const onSubmit = handleSubmit(async ({ loginId, kornm, mobile, certMsg }) => {
    if (loginId && kornm && mobile && certMsg) {
      try {
        const { data: userId } = await axios.post("/user/find/pw", {
          loginId,
          kornm,
          mobile,
          certMsg,
          sno,
        });
        if (userId) {
          setUserId(userId);
        } else {
          alert("일치하는 정보가 존재하지 않습니다.");
        }
      } catch (error) {
        alert("일치하는 정보가 존재하지 않습니다.");
      }
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  });

  const onPasswordChange = handleSubmit(
    async ({ changePassword, changeConfirm }) => {
      if (changePassword === changeConfirm) {
        try {
          await axios.put("/user/find/change", { userId, changePassword });
          router.replace("/signIn");
        } catch (error) {
          alert("잘못된 접근입니다.");
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  );
  return (
    <LoginLayout>
      {!userId && (
        <LoginBox>
          <h2>비밀번호 찾기</h2>
          <p>가입하셨던 정보를 입력해주세요.</p>
          <form onSubmit={onSubmit}>
            <fieldset>
              <FormWrap>
                <InputBox>
                  <input
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    name="loginId"
                    ref={register}
                  />
                </InputBox>
                <InputBox>
                  <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    name="kornm"
                    ref={register}
                  />
                </InputBox>
                <InputBox hasButton>
                  <input
                    type="text"
                    placeholder="휴대폰번호를 입력해주세요"
                    name="mobile"
                    ref={register}
                  />
                  <FormButtonBasic onClick={onSendSmsClick} type={"button"}>
                    인증번호 발송
                  </FormButtonBasic>
                </InputBox>
                {sno && (
                  <>
                    <InputBox>
                      <input
                        type="text"
                        placeholder="인증번호"
                        name="certMsg"
                        ref={register}
                      />
                    </InputBox>
                    <ButtonWrap>
                      <FormConfrimButton type={"submit"}>
                        확인
                      </FormConfrimButton>
                    </ButtonWrap>
                  </>
                )}
              </FormWrap>
            </fieldset>
          </form>
        </LoginBox>
      )}
      {userId && (
        <LoginBox>
          <h2>비밀번호 재설정</h2>
          <p>비밀번호를 재설정 해주세요.</p>
          <form onSubmit={onPasswordChange}>
            <fieldset>
              <FormWrap>
                <InputBox>
                  <input
                    type="password"
                    placeholder="새 비밀번호"
                    name="changePassword"
                    ref={register({ required: true })}
                  />
                </InputBox>
                <InputBox>
                  <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    name="changeConfirm"
                    ref={register({ required: true })}
                  />
                </InputBox>
                <ButtonWrap>
                  <FormConfrimButton>비밀번호 수정</FormConfrimButton>
                </ButtonWrap>
              </FormWrap>
            </fieldset>
          </form>
        </LoginBox>
      )}
    </LoginLayout>
  );
};

export default FindPaswwordPage;
