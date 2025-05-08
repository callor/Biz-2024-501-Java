import { useCalendarStore } from '@components/common/context/RootStore';
import Modal from '@components/common/modal';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';
import { DatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { EVENT_FORM_DATA } from '@utils/contants';
import { DateUtil } from '@utils/date.util';
import { LocalizedDateUtils } from '@utils/datepicker.utils';
import { axios } from '@utils/network.util';
import { ko } from 'date-fns/locale';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

//#region styled
const CreateModal = styled(Modal)`
  width: 500px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 !important;
  > header {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    > span {
      font-weight: 500;
      font-size: 18px;
    }
  }
  > article {
    width: 100%;
    padding: 0 20px;
    overflow-y: auto;

    padding-top: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
    > ul {
      width: 100%;
      li {
        display: grid;
        grid-template-columns: 1fr;
        select {
          border: 1px solid rgb(219, 219, 219);
          resize: none;
          font-size: 14px;
          color: rgb(69, 69, 69);
          height: 36px;
          font-size: 14px;
        }
        margin-top: 15px;
      }
    }
  }
  > footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f1f3f5;
    a {
      color: #74c0fc;
      cursor: pointer;
      font-size: 13px;
      &:hover {
        color: #228be6;
      }
    }
    button {
      font-size: 14px;
      font-weight: 400;
      padding: 5px 15px;
      border-radius: 4px;
      box-shadow: 0 1px 2px 1.5px #a3a3a3;
      background-color: white;
    }
    button + button {
      margin-left: 10px;
      background-color: #228be6;
      color: white;
    }
  }
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBoxWrap = styled.div`
  display: inline-block;
  input[type='checkbox'] {
    display: none;
    width: 0;
    height: 0;
    + label {
      cursor: pointer;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding-left: 25px;
      font-size: 15px;
      background: url('/images/btn/btn_checkbox_no_24x24.png') left center no-repeat;
      background-size: 20px 20px;
    }
    &:checked + label {
      background: url('/images/btn/btn_checkbox_yes_24x24.png') left center no-repeat;
      background-size: 20px 20px;
    }
  }
`;

const DatePeriod = styled.div`
  margin-left: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  span {
    margin: 0 13px;
    font-size: 16px;
  }
`;

const DatePickerInput = styled(DatePicker)`
  width: 130px;
  height: 32px;
  border-bottom: none;
  > div {
    &:before,
    &:after {
      border: none;
    }
    &:hover {
      &:before,
      &:after {
        border: none !important;
      }
    }
    > input {
      border: 1px solid rgb(219, 219, 219);
      resize: none;
      font-size: 14px;
      color: rgb(69, 69, 69);
      height: 32px;
      padding: 0;
      padding-left: 10px;
      padding-right: 38px;
      background-color: ${({ theme }) => theme.colors.white};
      background: url('/images/ico/ico_calendar.png') right 10px center no-repeat;
    }
  }
`;

const TimePickerInput = styled(KeyboardTimePicker)`
  margin-left: 7px !important;
  width: 90px;
  height: 32px;
  border-bottom: none;
  > div {
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-radius: 5px;
    &:before,
    &:after {
      border: none;
    }
    &:hover {
      &:before,
      &:after {
        border: none !important;
      }
    }
    > input {
      border: 1px solid rgb(219, 219, 219);
      resize: none;
      font-size: 14px;
      color: rgb(69, 69, 69);
      height: 32px;
      border: none;
      padding: 0;
      padding-left: 10px;
      background-color: ${({ theme }) => theme.colors.white};
      + div {
        margin-left: 0;
        margin-right: 5px;
      }
    }
    button {
      padding: 0;
      padding-top: 2px;
    }
    .MuiIconButton-label {
      margin: 0;
    }
  }
`;
const RadioWrap = styled.div`
  position: relative;
  background-color: #e9ecef;
  width: 150px;
  height: 35px;
  box-sizing: border-box;
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
  > label {
    cursor: pointer;
    line-height: 35px;
    flex: 1;
    text-align: center;
    color: #868e96;
    font-size: 14px;
    font-weight: 400;
  }
  > span {
    z-index: -1;
    position: absolute;
    top: 3px;
    width: 68px;
    height: 29px;
    border-radius: 25px;
    background-color: #ffffff;
    display: block;
    transition: left 0.25s ease-in-out;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
  input {
    display: none;
    width: 0;
    height: 0;
    :checked + label {
      color: #333;
      font-weight: 600;
    }
    &#type-event:checked ~ span {
      left: 3px;
    }
    &#type-todo:checked ~ span {
      left: 79px;
    }
  }
`;

//#endregion

const EventCreatePop = observer(() => {
  const router = useRouter();
  const calendarStore = useCalendarStore();
  const userCalendars = useMemo(() => calendarStore.userCalendars.filter(({ lv }) => lv >= 2), [
    calendarStore.userCalendars,
  ]);
  const { register, watch, getValues, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      calendarId: '',
      name: '',
      type: 'EVENT',
      note: '',
      startDt: new Date().toISOString(),
      endDt: new Date().toISOString(),
      isAllDay: true,
    },
  });
  const isShow = useMemo(() => {
    const isShow = calendarStore.createStore !== undefined;
    if (isShow) {
      reset({
        ...calendarStore.createStore,
      });
    }
    return isShow;
  }, [calendarStore.createStore]);

  const type = watch('type');
  const startDt: string = watch('startDt');
  const endDt: string = watch('endDt');
  const isAllDay = watch('isAllDay');

  const onCancelClick = useCallback(() => {
    if (calendarStore.createStore) {
      const { name, note } = getValues();
      if ((name || note) && !confirm('일정 등록 중입니다.\n취소하시겠습니까?')) {
        return;
      }
      calendarStore.setCreateStore(undefined);
    }
  }, [calendarStore.createStore]);

  const onSaveClick = useCallback(
    handleSubmit(async ({ isAllDay, type, ...formData }) => {
      if (type === 'EVENT' && new Date(formData.startDt).getTime() > new Date(formData.endDt).getTime()) {
        alert('종료일자가 시작일자보다 작습니다');
        return;
      }
      if (type === 'EVENT' && !formData.calendarId) {
        alert('그룹을 설장하셔야합니다.');
        return;
      }
      // 종일 일정인경우 시간을 0시 0분 0초로 고정시킨다.
      if (isAllDay) {
        formData.startDt = DateUtil.setDate(new Date(formData.startDt), {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }).toISOString();
        formData.endDt = DateUtil.setDate(new Date(formData.endDt), {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        }).toISOString();
      }

      const param = {
        ...formData,
        allDayYn: isAllDay ? 'Y' : 'N',
        replyYn: 'Y',
      };
      if (type === 'TODO') {
        delete param['endDt'];
        delete param['replyYn'];
        await axios.post('/diary/todo', param);
        await flowResult(calendarStore.syncTodo());
      } else {
        await axios.post(`/diary/calendar/${formData.calendarId}/event`, param);
        await flowResult(calendarStore.syncCalendar());
      }
      alert('저장되었습니다.');
      calendarStore.setCreateStore(undefined);
    }),
    [],
  );

  useEffect(() => {
    if (!isAllDay) {
      const copy = new Date(startDt);
      let date = new Date(endDt);
      date = DateUtil.setDate(date, {
        year: copy.getFullYear(),
        month: copy.getMonth(),
        date: copy.getDate(),
      });
      setValue('endDt', date.toISOString());
    }
  }, [isAllDay, startDt, endDt]);

  const onChangeStartDt = useCallback(
    (date: Date) => {
      if (!DateUtil.isInvalidDate(date)) {
        const startDt = new Date(getValues('startDt'));
        const endDt = new Date(getValues('endDt'));
        setValue('startDt', date.toISOString());
        if (getValues().type === 'EVENT' && getValues().isAllDay) {
          const diff = DateUtil.diffDay(endDt, startDt);
          setValue('endDt', DateUtil.addDay(date, diff).toISOString());
        } else {
          setValue('endDt', startDt.toISOString());
        }
      }
    },
    [setValue, getValues],
  );

  const onChangeEndDt = useCallback(
    (date: Date) => {
      if (!DateUtil.isInvalidDate(date)) {
        setValue('endDt', date.toISOString());
      }
    },
    [setValue, getValues],
  );

  const onChangeStartTime = useCallback(
    (date: Date) => {
      if (!DateUtil.isInvalidDate(date)) {
        setValue('startDt', DateUtil.copyHourMinute(new Date(startDt), date).toISOString());
      }
    },
    [startDt, setValue],
  );
  const onChangeEndTime = useCallback(
    (date: Date) => {
      if (!DateUtil.isInvalidDate(date)) {
        setValue('endDt', DateUtil.copyHourMinute(new Date(endDt), date).toISOString());
      }
    },
    [endDt, setValue],
  );
  const onDetailWriteClick = useCallback(() => {
    const form = getValues();
    sessionStorage.setItem(EVENT_FORM_DATA, JSON.stringify(form));
    calendarStore.setCreateStore(undefined);
    router.push('/calendar/event/write');
  }, []);
  return (
    <CreateModal elementId={'create-event-reply'} isShow={isShow} onBackgroundClick={onCancelClick}>
      <MuiPickersUtilsProvider utils={LocalizedDateUtils} locale={ko}>
        <header>
          <span>신규 일정 생성</span>
          <RadioWrap>
            <input type="radio" name="type" id="type-event" value="EVENT" ref={register()} />
            <label htmlFor="type-event">일정</label>
            <input type="radio" name="type" id="type-todo" value="TODO" ref={register()} />
            <label htmlFor="type-todo">할일</label>
            <span />
          </RadioWrap>
        </header>
        <article>
          <ul>
            {type === 'EVENT' && (
              <li>
                <select ref={register()} name="calendarId">
                  <option>그룹 선택</option>
                  {userCalendars.map(({ calendarId, name }) => (
                    <option key={`select-option-${calendarId}`} value={calendarId}>
                      {name}
                    </option>
                  ))}
                </select>
              </li>
            )}
            <li style={{ marginTop: 5 }}>
              <TextField label={'제목'} required inputRef={register()} name="name" autoComplete="off" />
            </li>
            <li>
              <TimeBox>
                <CheckBoxWrap>
                  <input type="checkbox" id="date_all" name="isAllDay" ref={register()} />
                  <label htmlFor="date_all">종일</label>
                </CheckBoxWrap>
                <DatePeriod>
                  <input type="hidden" name="startDt" ref={register()} />
                  <input type="hidden" name="endDt" ref={register()} />
                  <DatePickerInput
                    autoOk
                    variant="inline"
                    value={startDt}
                    name={'startDt'}
                    onChange={onChangeStartDt}
                  />
                  {!isAllDay && (
                    <TimePickerInput
                      autoOk
                      ampm={false}
                      variant="inline"
                      value={startDt}
                      onChange={onChangeStartTime}
                    />
                  )}
                  {isAllDay && type === 'EVENT' && (
                    <>
                      <span>~</span>
                      <DatePickerInput
                        autoOk
                        variant="inline"
                        value={endDt}
                        minDate={startDt}
                        minDateMessage="종료날짜가 시작날짜보다 이전 입니다."
                        onChange={onChangeEndDt}
                      />
                    </>
                  )}
                  {!isAllDay && type === 'EVENT' && (
                    <TimePickerInput autoOk ampm={false} variant="inline" value={endDt} onChange={onChangeEndTime} />
                  )}
                </DatePeriod>
              </TimeBox>
            </li>
            <li>
              <TextField multiline name="note" variant="outlined" label="내용" inputRef={register()} />
            </li>
          </ul>
        </article>
        <footer>
          <div>
            <a onClick={onDetailWriteClick}>상세 설정</a>
          </div>
          <div>
            <button onClick={onCancelClick}>취소</button>
            <button onClick={onSaveClick}>추가</button>
          </div>
        </footer>
      </MuiPickersUtilsProvider>
    </CreateModal>
  );
});

export default EventCreatePop;
