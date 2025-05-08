// 배너 관련
export const TOP_BANNER = "TOP_BANNER";
export const TOP_BANNER_SHOW = "FALSE";

// 쿠키 로그인 안한 경우
export const COOKIE_NOT_LOGIN = "NOT_LOGIN";

// 프로필 이미지 기본
export const DEFAULT_PROFILE_IMG = "/images/sub/mypage_profile_basic.jpg";

// ALRM
export const ALRM_TYPE = {
  NEW_EVENT: "NEW_EVENT",
  INVITE_CALENDAR: "INVITE_CALENDAR",
  LEAVE_GROUP: "LEAVE_GROUP",
  EVENT_ALRM: "EVENT_ALRM",
} as const;

export type ALRM_TYPE = typeof ALRM_TYPE[keyof typeof ALRM_TYPE];
