type InitData = {
  member?: Member;
  commonCalendars?: Calendar[];
  userCalendars?: CalendarUsr[];
};

type Member = {
  userId: string;
  kornm: string;
  mobile: string;
  status: string;
  email: string;
  photo?: string;
  token: string;
  roles: {
    role: { roleId: string; roleLv: number; roleNm: string };
  }[];
};

type Contact = {
  telId?: string;
  name: string;
  memo: string | null;
  favorYn: 'Y' | 'N';
  infos: {
    tel?: string;
    fax?: string;
    email?: string;
    orded: number;
  }[];
};

type Alrm = {
  alrmId: string;
  type: 'NEW_EVENT' | 'INVITE_CALENDAR' | 'LEAVE_GROUP' | 'EVENT_ALRM';
  note: string;
  title: string;
  dataId?: string;
  sendDt: string;
  readDt?: string;
};

type KoscajNewsItem = {
  title: string;
  link: string;
  description: string;
  author: string;
  pubDate: string;
};
type FileItem = { fileId: string; name: string; size: number };
