import { makeAutoObservable } from 'mobx';

export default class EventCreateStore {
  startDt: string;
  endDt: string;
  calendarId: string;
  type: 'EVENT' | 'TODO' = 'EVENT';
  name = '';
  note = '';
  isAllDay = true;

  constructor({ startDt, calendarId }: { startDt: string; calendarId: string }) {
    this.startDt = startDt;
    this.endDt = startDt;
    this.calendarId = calendarId;
    makeAutoObservable(this, {});
  }

  setFormData(param: {
    startDt?: string;
    endDt?: string;
    calendarId?: string;
    name?: string;
    note?: string;
    isAllDay?: boolean;
  }) {
    this.startDt = param.startDt;
    this.endDt = param.endDt ?? '';
    this.calendarId = param.calendarId ?? '';
    this.name = param.name ?? '';
    this.note = param.note ?? '';
    this.isAllDay = param.isAllDay ?? true;
  }
}
