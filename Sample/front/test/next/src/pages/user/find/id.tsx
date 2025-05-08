import React, { useMemo, useState } from "react";
import LoginLayout, { LoginBox } from "@components/layout/login";
import {
  FormButtonBasic,
  FormConfrimButton,
  FormWrap,
  InputBox,
  RadioBox,
} from "@components/mypage/form";
import ButtonWrap from "@components/common/button/ButtonWrap";
import { useForm } from "react-hook-form/dist/index.ie11";
import { axios } from "@utils/network.util";
import { useRouter } from "next/router";

const FindIdPage = () => {
  const router = useRouter();

  const { register, handleSubmit, getValues, errors } = useForm();

  const [sno, setSno] = useState<number | null>(null);
  const [idList, setIdList] = useState<string[]>([]);

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

  const onSubmit = handleSubmit(async ({ kornm, mobile, certMsg }) => {
    try {
      const { data: idList } = await axios.post("/user/find/id", {
        kornm,
        mobile,
        certMsg,
        sno,
      });
      if (idList?.length > 0) {
        setIdList(idList);
      } else {
        alert("입력하신 정보와 일치하는 아이디가 없습니다.");
      }
    } catch (error) {
      alert("모든 항목을 적어주세요.");
    }
  });

  const IdList = useMemo(
    () =>
      idList.map((id, idx) => (
        <div key={`findId${idx}`}>
          <input
            type="radio"
            id={`findId${idx}`}
            name={"selectId"}
            value={id}
            ref={register}
          />
          <label htmlFor={`findId${idx}`}>{id}</label>
        </div>
      )),
    [idList]
  );

  const onIdSubmit = handleSubmit(({ selectId }) => {
    router.replace(selectId ? "/signIn" + `?id=${selectId}` : "/signIn");
  });

  return (
    <LoginLayout>
      {idList.length === 0 && (
        <LoginBox>
          <h2>아이디 찾기</h2>
          <p>가입시 입력하셨던 정보를 입력해주세요.</p>
          <form onSubmit={onSubmit}>
            <fieldset>
              <FormWrap>
                <InputBox>
                  <input
                    name={"kornm"}
                    type="text"
                    placeholder="이름을 입력해주세요"
                    ref={register({ required: true })}
                  />
                </InputBox>
                <InputBox hasButton>
                  <input
                    name={"mobile"}
                    type="text"
                    placeholder="휴대폰번호를 입력해주세요"
                    ref={register({ required: true })}
                  />
                  <FormButtonBasic onClick={onSendSmsClick} type={"button"}>
                    인증번호 발송
                  </FormButtonBasic>
                </InputBox>
                {sno && (
                  <>
                    <InputBox>
                      <input
                        name={"certMsg"}
                        type="text"
                        placeholder="인증번호"
                        ref={register({ required: true })}
                      />
                    </InputBox>
                    <ButtonWrap>
                      <FormConfrimButton onClick={onSubmit} type={"submit"}>
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
      {idList.length > 0 && (
        <LoginBox>
          <h2>아이디 확인</h2>
          <p>가입시 입력하셨던 아이디를 확인해주세요.</p>
          <form onSubmit={onIdSubmit}>
            <fieldset>
              <FormWrap>
                <RadioBox>{IdList}</RadioBox>
                <ButtonWrap>
                  <FormConfrimButton onClick={onIdSubmit}>
                    확인
                  </FormConfrimButton>
                </ButtonWrap>
              </FormWrap>
            </fieldset>
          </form>
        </LoginBox>
      )}
    </LoginLayout>
  );
};

export default FindIdPage;
