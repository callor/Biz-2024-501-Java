import { Button, Checkbox, FormControlLabel, FormHelperText, TextField } from "@mui/material";
import axios from "@/utils/axios";
import { cookieUtil } from "@/utils/cookie";
import { cryptoUtil } from "@/utils/crypto";
import { Formik, FormikProps } from "formik";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import * as LoginStyle from "./LoginForm.style";
import { loginFormValidation } from "./loginform.validation";

/**
 * @apiNote : 로그인 컴포넌트
 */
const isRememberIdAtom = atomWithStorage<1 | 0>("_iirt", 0);
const rememberedIdAtom = atomWithStorage<string | undefined>("_irt", undefined);
const returnMessageAtom = atom("");

const LoginForm = () => {
  const [isRememberId, setIsRememberId] = useAtom(isRememberIdAtom);
  const [rememberedId, setRememberedId] = useAtom(rememberedIdAtom);
  const [returnMessage, setReturnMessage] = useAtom(returnMessageAtom);

  const router = useRouter();
  const passwdRef = useRef<HTMLInputElement | null>(null);

  /**
   * 로그인 메서드
   */
  const doLogin = useCallback(
    async (values: any & { rememberId?: ["on"] | [] }) => {
      if (values.rememberId?.find((val: any) => val === "on") && values.userid) {
        setIsRememberId(1);
        setRememberedId(cryptoUtil.encrypt(values.userid));
      } else if (values.rememberId?.length === 0) {
        setIsRememberId(0);
        localStorage.removeItem("_irt");
      }

      const { data } = await axios
        .post("/login", {
          // const { data } = await axios.post("/ts/login", {
          user: cryptoUtil.encrypt(JSON.stringify({ userid: values.userid, passwd: values.passwd })),
        })
        .catch((err) => {
          alert("로그인 중 서버오류가 발생했습니다.");
          return err;
        });

      if (data) {
        if (data.code === "S") {
          cookieUtil.setCookie("_sd", cryptoUtil.encrypt(JSON.stringify(data.body)));
          router.reload();
        } else {
          setReturnMessage(data.return_message);
        }
      }
    },
    [router, setIsRememberId, setRememberedId, setReturnMessage],
  );

  /**
   * 에러메시지 출력
   */
  const printErrorMessage = useCallback(
    (props: FormikProps<any>) => {
      if (props.errors.userid || props.errors.passwd) {
        if (props.errors.userid && props.errors.passwd) {
          if (props.touched.userid && props.touched.passwd) {
            return <FormHelperText error>* 아이디와 비밀번호를 입력해주세요</FormHelperText>;
          }
        } else if (props.errors.userid) {
          if (props.touched.userid) {
            return <FormHelperText error>* 아이디를 입력해주세요</FormHelperText>;
          }
        } else if (props.errors.passwd) {
          if (props.touched.passwd) {
            return <FormHelperText error>* 비밀번호를 입력해주세요</FormHelperText>;
          }
        }
      } else {
        if (returnMessage !== "") {
          return <FormHelperText error>{`* ${returnMessage}`}</FormHelperText>;
        } else {
          return <FormHelperText error />;
        }
      }
    },
    [returnMessage],
  );

  return (
    <LoginStyle.Container>
      {/* <div>
        <Image src="/static/image/login_logo.png" width={279} height={107} alt="login_logo" />
      </div> */}
      {/* =========== LOGIN =========== */}
      <div style={{ width: "70%" }}>
        <Formik
          initialValues={
            {
              userid:
                rememberedId && rememberedId !== "" && isRememberId === 1
                  ? cryptoUtil.decrypt(rememberedId)
                  : "",
              passwd: "",
              rememberId: isRememberId === 1 ? ["on"] : [],
            } as any & { rememberId?: ["on"] | [] }
          }
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            doLogin(values);
            actions.setSubmitting(false);
          }}
          validationSchema={loginFormValidation}
          validateOnChange={false}
        >
          {(props) => (
            <>
              <TextField
                id="userid"
                value={props.values.userid}
                type="text"
                onChange={(e) => {
                  props.handleChange(e);
                  props.setFieldValue("userid", e.target.value.replace(/\s/g, ""));
                }}
                label="아이디"
                size="small"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (props.values.passwd ? props.submitForm() : passwdRef.current?.focus())
                }
                sx={{ marginBottom: "5px" }}
                fullWidth
              />
              <TextField
                id="passwd"
                value={props.values.passwd}
                type="password"
                inputRef={passwdRef}
                onChange={(e) => {
                  props.handleChange(e);
                  props.setFieldValue("passwd", e.target.value.replace(/\s/g, ""));
                }}
                label="비밀번호"
                size="small"
                onKeyDown={(e) => e.key === "Enter" && props.submitForm()}
                sx={{ marginTop: "5px" }}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="rememberId"
                    defaultChecked={isRememberId === 1}
                    onChange={props.handleChange}
                    size="small"
                  />
                }
                label="ID저장"
                sx={{ display: "flex", alignItems: "center" }}
              />
              <div style={{ height: "30px" }}>{printErrorMessage(props)}</div>
              <Button variant="contained" fullWidth onClick={props.submitForm}>
                로그인
              </Button>
            </>
          )}
        </Formik>
      </div>
      {/* <div>
        <FormHelperText>
          본 사이트에는 중요한 영업비밀 등 회사 정보 및 개인정보가 포함되어있습니다 <br />
          이에 본 사이트를 이용함에 있어 `부정경쟁방지 및 영업비밀보호에 관한 법률`,
          <br />
          `개인정보보호법`을 성실히 준수하겠습니다.
        </FormHelperText>
      </div> */}
    </LoginStyle.Container>
  );
};

export default LoginForm;
