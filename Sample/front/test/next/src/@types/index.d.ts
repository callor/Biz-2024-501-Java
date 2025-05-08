type YN = "Y" | "N";

type Calendar = {
  calendarId: string;
  name: string;
  bgColor: string;
  color: string;
  regdt: string;
  uptdt: string;
};

type CalendarUsr = {
  userId: string;
  calendarId: string;
  name: string;
  bgColor: string;
  color: string;
  lv: number;
  inviteYn: YN;
  useYn: YN;
  regdt: Date;
  uptdt: Date;
  calendar: Calendar;
};

type Member = {
  kornm: string;
  mobile: string;
  status: string;
  email: string;
  photo?: string;
  token: string;
};

type Contact = {
  telId?: string;
  name: string;
  memo: string | null;
  favorYn: "Y" | "N";
  infos: {
    tel?: string;
    fax?: string;
    email?: string;
    orded: number;
  }[];
};

type Alrm = {
  alrmId: string;
  type: "NEW_EVENT" | "INVITE_CALENDAR" | "LEAVE_GROUP" | "EVENT_ALRM";
  note: string;
  dataId?: string;
  sendDt: string;
  readDt?: string;
};

type EventRepeat = {
  eventId: string;
  type: "W" | "Y" | "D" | "M";
  num: number;
  byWeek?: "1" | "2" | "3" | "4" | "5";
  byDay?: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
};

type EventAlrm = {
  type: "M" | "H" | "D" | "W";
  num: number;
  alrmTime: string;
};

type EventDetail = {
  eventId: string;
  parentId: string;
  type: "E";
  name: string;
  note?: string;
  allDayYn: YN;
  startDt: string;
  endDt: string;
  repeat: EventRepeat;
  alrms: EventAlrm[];
};

type CalendarEvent = {
  calendarId: string;
  eventId: string;
  event: EventDetail;
};

type KoscajNewsItem = {
  title: string;
  link: string;
  description: string;
  author: string;
  pubDate: string;
};

interface ICalendarEvent extends EventDetail {
  calendarId: string;
  colSpan: number;
  startDt: Date;
  endDt: Date;
  eventStartDt: Date;
}
