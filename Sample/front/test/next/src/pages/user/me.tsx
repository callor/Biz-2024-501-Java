import { BlueButton } from "@components/common/button";
import ButtonWrap from "@components/common/button/ButtonWrap";
import MyPageLayout from "@components/layout/mypage";
import { FormButtonBasic, InputBox } from "@components/mypage/form";
import MyPagePopup from "@components/mypage/popup";
import styled from "@emotion/styled";
import { DEFAULT_PROFILE_IMG } from "@utils/contants";
import { axios, getThumbnail, serverAxios } from "@utils/network.util";
import { StringUtil } from "@utils/string.util";
import { GetServerSideProps, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";

const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 246px;
    height: 36px;
  }
  input[type="checkbox"] {
    display: none;
    width: 0;
    height: 0;
    &:checked {
      + label {
        background: url("/images/btn/btn_checkbox_yes_24x24.png") left center
          no-repeat;
      }
    }
    + label {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      margin: 6px 0;
      padding-left: 34px;
      font-size: 14px;
      color: #454545;
      background: url("/images/btn/btn_checkbox_no_24x24.png") left center
        no-repeat;
    }
  }
`;

const ProfileImg = styled.span<{ url?: string }>`
  width: 100px;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${({ url }) => (url ? url : DEFAULT_PROFILE_IMG)}");
`;

const ProfileInput = styled.input``;

const FormTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-top: 1px solid #454545;
  text-align: left;

  tr {
    border-bottom: 1px solid #eee;

    th {
      font-weight: 500;
      color: #252525;
      padding-left: 20px;
      box-sizing: border-box;
      background-color: #fafafa;
      text-align: left;
    }

    td {
      padding: 10px 40px 10px 20px;
      box-sizing: border-box;

      input {
        width: 100%;
        height: 36px;
        font-size: 14px;
        color: #454545;
      }

      ${ProfileInput} {
        display: none;
        width: 0;
        height: 0;

        + ${BlueButton} {
          display: inline-block;
          width: 60px;
          height: 24px;
          line-height: 22px;
          font-size: 12px;
          color: #ffffff;
          text-align: center;
          border-radius: 2px;
          margin-right: 5px;
          + label {
            display: inline-block;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const ProfileDeleteBtn = styled(FormButtonBasic)`
  width: 60px;
  height: 24px;
  font-size: 12px;
  border-radius: 2px;
  vertical-align: top;
`;

const MyPageButtonWrap = styled(ButtonWrap)`
  text-align: center;
  margin-top: 20px;
  ${BlueButton} {
    width: 120px;
    height: 34px;
    border-radius: 5px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  padding-left: 10px;
  margin-top: 5px;
`;

const PopupWrap = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 30px;

  table {
    width: 100%;
    table-layout: fixed;
    border-top: 1px solid #454545;
    tr {
      border-bottom: 1px solid #eeeeee;
      th {
        font-size: 14px;
        font-weight: 500;
        color: #252525;
        padding-left: 20px;
        box-sizing: border-box;
        background-color: #fafafa;
        text-align: left;
      }
      td {
        padding: 10px 20px;
        box-sizing: border-box;
      }
    }
  }
  ${BoxWrap} {
    input {
      width: 246px;
      height: 36px;
    }

    button {
      width: 84px;
      height: 36px;
      line-height: 34px;
      font-size: 12px;
      color: #888e9c;
      margin-left: 7px;
      border: 1px solid #c3c6cd;
      border-radius: 2px;
      background-color: #f5f6f8;
      box-sizing: border-box;
    }
  }

  ${ButtonWrap} {
    text-align: center;
    margin-top: 20px;

    button {
      width: 120px;
      height: 34px;
      border-radius: 5px;
    }
  }
`;

const MyPage = ({ member }) => {
  const router = useRouter();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(
    member.photo ? getThumbnail(member.photo) : undefined
  );
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    trigger,
  } = useForm({
    defaultValues: {
      loginId: member.loginId,
      kornm: member.kornm,
      mobile: StringUtil.formatMobile(member.mobile),
      photo: member.photo,
      email: member.email,
      notifyYn: member.notifyYn,
      changePassword: "",
      confirmPassword: "",
      confirmMobile: "",
      sno: "",
      certMsg: "",
    },
  });

  const onChangeFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0]);
        try {
          const { data: fileId } = await axios.post("/file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setValue("photo", fileId);
          setPhotoUrl(getThumbnail(fileId));
        } catch (error) {
          alert("에러가 발생하였습니다.");
          setPhotoUrl(undefined);
          setValue("photo", "");
        }
      } else {
        setPhotoUrl(undefined);
        setValue("photo", "");
      }
    },
    []
  );

  const onDeleteProfileClick = useCallback(() => {
    setValue("photo", "");
    setPhotoUrl(undefined);
  }, []);

  const onTriggerClick = useCallback(async () => {
    const isNotError = await trigger();
    const { changePassword, confirmPassword, mobile } = getValues();
    if (isNotError) {
      // 비밀번호 변경란 입력시
      if (
        changePassword &&
        !/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\$\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\/\.\,\>\<\?\\\|]{6,}$/.test(
          changePassword
        )
      ) {
        alert(
          "비밀번호 수정 시 영어1글자 숫자1글자를 포함하여 6자리 이상으로 만들어주세요"
        );
        return;
      }
      // 비밀번호 변경 확인 일치 확인
      if (changePassword && changePassword !== confirmPassword) {
        alert("비밀번호와 비밀번호 확인란이 서로 일치하지 않습니다.");
        return;
      }
      setValue("confirmMobile", mobile);
      setShowSaveForm(true);
    }
  }, []);

  const onSendCert = useCallback(async () => {
    const mobile = getValues().mobile.replace(/[^\d]/g, "");
    if (mobile) {
      try {
        const { data: sno } = await axios.post("/sms/cert", { mobile });
        alert("인증번호를 보냈습니다.");
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

  const onSubmitData = useCallback(
    handleSubmit(
      async ({
        confirmMobile,
        confirmPassword,
        changePassword,
        notifyYn,
        sno,
        ...formData
      }) => {
        const agreeYn = notifyYn || "N";
        if (changePassword) {
          formData["changePassword"] = changePassword;
        }
        await axios.put("/user/info", {
          ...formData,
          agreeYn,
          sno: Number(sno),
        });
        alert("저장되었습니다.");
        router.reload();
      }
    ),
    []
  );

  return (
    <MyPageLayout>
      <form>
        <fieldset>
          <FormTable>
            <colgroup>
              <col width="14.15%" />
              <col width="35.849%" />
              <col width="14.15%" />
              <col width="35.849%" />
            </colgroup>
            <tbody>
              <tr>
                <th>사진</th>
                <td colSpan={3}>
                  <BoxWrap>
                    <ProfileImg url={photoUrl} />
                    <InputBox>
                      <input type="hidden" name="photo" ref={register} />
                      <ProfileInput
                        type="file"
                        id="thumbAdd"
                        onChange={onChangeFile}
                      />
                      <BlueButton
                        type="button"
                        onClick={(e) => {
                          (e.currentTarget
                            .previousElementSibling as HTMLInputElement).click();
                        }}
                      >
                        <label>사진변경</label>
                      </BlueButton>
                      <ProfileDeleteBtn
                        type="button"
                        onClick={onDeleteProfileClick}
                      >
                        삭제
                      </ProfileDeleteBtn>
                    </InputBox>
                  </BoxWrap>
                </td>
              </tr>
              <tr>
                <th>아이디</th>
                <td>
                  <BoxWrap>{member.loginId}</BoxWrap>
                </td>
                <th>이름</th>
                <td>
                  <BoxWrap>
                    <input
                      type="text"
                      ref={register({
                        required: {
                          value: true,
                          message: "이름을 입력해주세요.",
                        },
                        pattern: {
                          value: /[a-zA-Z가-힣]$/,
                          message: "이름은 영문 또는 한글로 사용 가능합니다. ",
                        },
                      })}
                      name="kornm"
                    />
                  </BoxWrap>
                  {errors?.kornm && (
                    <ErrorMessage>{errors.kornm.message}</ErrorMessage>
                  )}
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <BoxWrap>
                    <input
                      type="text"
                      autoComplete="off"
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
                      name="email"
                    />
                  </BoxWrap>
                  {errors?.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                </td>
                <th>핸드폰 번호</th>
                <td>
                  <BoxWrap>
                    <input
                      type="text"
                      autoComplete="off"
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
                      name="mobile"
                    />
                  </BoxWrap>
                  {errors?.mobile && (
                    <ErrorMessage>{errors?.mobile.message}</ErrorMessage>
                  )}
                </td>
              </tr>
              <tr>
                <th>비밀번호 수정</th>
                <td>
                  <BoxWrap>
                    <input
                      type="password"
                      autoComplete="new-password"
                      ref={register}
                      name="changePassword"
                    />
                  </BoxWrap>

                  {errors?.changePassword && (
                    <ErrorMessage>{errors.changePassword.message}</ErrorMessage>
                  )}
                </td>
                <th>비밀번호 수정 확인</th>
                <td>
                  <BoxWrap>
                    <input
                      type="password"
                      autoComplete="new-password"
                      ref={register}
                      name="confirmPassword"
                    />
                  </BoxWrap>
                </td>
              </tr>
              <tr>
                <th>수신동의</th>
                <td colSpan={3}>
                  <BoxWrap>
                    <input
                      type="checkbox"
                      id="agree01"
                      ref={register}
                      name="notifyYn"
                      value="Y"
                    />
                    <label htmlFor="agree01">광고성 정보 수신 동의</label>
                  </BoxWrap>
                </td>
              </tr>
            </tbody>
          </FormTable>
          <MyPageButtonWrap>
            <BlueButton onClick={onTriggerClick} type="button">
              저장
            </BlueButton>
          </MyPageButtonWrap>
        </fieldset>
      </form>
      <MyPagePopup
        title={"내 정보 수정"}
        show={showSaveForm}
        onClose={() => {
          setShowSaveForm(false);
        }}
      >
        <PopupWrap>
          <form>
            <fieldset>
              <table>
                <colgroup>
                  <col width="120px" />
                  <col width="380px" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>핸드폰 번호</th>
                    <td>
                      <BoxWrap>
                        <input
                          type="text"
                          ref={register}
                          name="confirmMobile"
                          readOnly
                        />
                        <button type="button" onClick={onSendCert}>
                          인증번호받기
                        </button>
                      </BoxWrap>
                    </td>
                  </tr>
                  <tr>
                    <th>인증번호</th>
                    <td>
                      <BoxWrap>
                        <input type="hidden" name="sno" ref={register} />
                        <input type="text" ref={register} name="certMsg" />
                      </BoxWrap>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
          <ButtonWrap>
            <BlueButton onClick={onSubmitData}>확인</BlueButton>
          </ButtonWrap>
        </PopupWrap>
      </MyPagePopup>
    </MyPageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await serverAxios(ctx).get("/user/info");
  return { props: { member: data } };
};

export default MyPage;
