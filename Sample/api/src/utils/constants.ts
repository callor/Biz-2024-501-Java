// DB
export const SG100 = 'SG100';
export const SG100LOC = 'SG100LOC';
export const SGN2 = 'SGN2';
export const INTRANET = 'INTRANET';
export const GSPOLL = 'GSPOLL';
export const NAMU = 'NAMU';
export const PLANNER = 'PLANNER';
export const SSDB = 'SSDB';
export const KAFKA = 'KAFKA';
// KAKAO BIZ TALK
export const KAKAO_BIZ_TALK_URL = 'https://www.biztalk-api.com/v2/';
// THUNMAIL PATH
export const THUMBNAIL_PATH = 'thumbnail';

// ROLE
export const ROLES = 'ROLES';

export const ROLE_TYPE = {
  PUBLIC: 0,
  APIKEY: 10,
  COMMON_CALENDAR: 30,
  USER: 30,
  ADMIN: 99,
} as const;

export type ROLE_TYPE = typeof ROLE_TYPE[keyof typeof ROLE_TYPE];

// SERVICE
export const SERVICE = {
  DIARY: 'DIARY',
} as const;
export type SERVICE = typeof SERVICE[keyof typeof SERVICE];

// CALENDAR
export const DEFAULT_BG_COLOR = '#039be5';
export const DEFAULT_COLOR = '#ffffff';
export const DEFAULT_CALENDAR_NAME = '내 일정';

export const CALENDAR_INVITE_TITLE = '그룹 초대';

// ALRM
export const ALRM_TYPE = {
  NEW_EVENT: 'NEW_EVENT',
  INVITE_CALENDAR: 'INVITE_CALENDAR',
  LEAVE_GROUP: 'LEAVE_GROUP',
  EVENT_ALRM: 'EVENT_ALRM',
  TODO_ALRM: 'TODO_ALRM',
} as const;

export type ALRM_TYPE = typeof ALRM_TYPE[keyof typeof ALRM_TYPE];
