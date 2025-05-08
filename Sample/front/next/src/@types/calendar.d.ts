type ByDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
type ByWeek = '1' | '2' | '3' | '4' | '5';
type RepeatType = 'W' | 'Y' | 'D' | 'M';
type AlrmType = 'M' | 'H' | 'D' | 'W' | 'NOW';

type YN = 'Y' | 'N';

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
  loginId: string;
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

type Tip = {
  tipId?: string;
  month: number;
  note: string;
  retdt?: Date;
  uptdt?: Date;
};

type EventRepeat = {
  type: 'W' | 'Y' | 'D' | 'M';
  num: number;
  byWeek?: '1' | '2' | '3' | '4' | '5';
  byDay?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
};

type EventAlrm = {
  type: AlrmType;
  num: number;
  alrmTime?: string;
};

type EventReply = {
  replyId: string;
  userId: string;
  reply: string;
  retdt: string;
  member: Member;
  isModify?: boolean;
};

type EventFile = {
  eventId: string;
  fileId: string;
  sno: number;
  file: {
    fileId: string;
    orgNm: string;
    fsize: number;
  };
};

type EventDetail = {
  calendarId: string;
  eventId: string;
  parentId?: string;
  name: string;
  note?: string;
  allDayYn: YN;
  startDt: string;
  endDt: string;
  repeat: EventRepeat;
  alrms: EventAlrm[];
  replys: EventReply[];
  member: Member;
  isCommon: boolean;
  isModify: boolean;
  files: EventFile[];
  calendars: {
    calendarId: string;
    calendarUsr: CalendarUsr;
  };
};

type CalendarEvent = {
  calendarId: string;
  eventId: string;
  event: EventDetail;
};

interface ICalendarEvent extends EventDetail {
  calendarId: string;
  colSpan: number;
  startDt: Date;
  endDt: Date;
  eventStartDt: Date;
  type: 'EVENT';
}
interface IIcons extends React.SVGAttributes<SVGElement> {
  color?: string;
}

type TodoDetail = {
  userId: string;
  todoId: string;
  name: string;
  note?: string;
  allDayYn: YN;
  startDt: string;
  endDt?: string;
  endYn: YN;
  regdt: Date;
  uptdt: Date;
  member: Member;
  alrm?: EventAlrm;
};

interface ICalendarTodo extends TodoDetail {
  colSpan: number;
  type: 'TODO';
  startDt: Date;
}
type CalendarType = {
  [key: string]: (ICalendarEvent | ICalendarTodo)[];
};
