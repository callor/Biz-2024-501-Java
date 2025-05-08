import * as Yup from "yup";

/**
 * @apiNote : 로그인 폼 validation
 */
export const loginFormValidation = Yup.object({
  userid: Yup.string().required("아이디를 입력해주세요."),
  passwd: Yup.string().required("비밀번호를 입력해주세요."),
});
