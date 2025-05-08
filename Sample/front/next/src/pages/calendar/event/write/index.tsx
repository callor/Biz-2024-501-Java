import DropZone from '@components/common/basic/DropZone';
import { BlueButton } from '@components/common/button';
import ButtonWrap from '@components/common/button/ButtonWrap';
import DeleteIcon from '@components/icon/DeleteIcon';
import MainLayout from '@components/layout/main';
import { FormButtonBlue } from '@components/mypage/form';
import styled from '@emotion/styled';
import { DatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { EVENT_FORM_DATA } from '@utils/contants';
import { DateUtil } from '@utils/date.util';
import { LocalizedDateUtils } from '@utils/datepicker.utils';
import { FileUtil } from '@utils/file.util';
import { axios, serverAxios } from '@utils/network.util';
import ko from 'date-fns/locale/ko';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

//#region style
const FileContent = styled.div`
  background-color: white;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AttachedFileWrap = styled.div`
  line-height: 10px;
  font-size: 13px;
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
    > span {
      color: ${({ theme }) => theme.colors.black};
      margin-right: 10px;
    }
    > svg {
      cursor: pointer;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  padding-left: 10px;
  margin-top: 5px;
`;
const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
`;

const LeftWrap = styled.div`
  width: 30px;
  flex: 0 0 30px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;
`;
const MainWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const EventFormTable = styled.div`
  width: calc(100% - 30px);
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  table {
    width: calc(100% - 30px);
    height: 100%;
    box-sizing: border-box;

    tr {
      border-bottom: 1px solid #eeeeee;

      th {
        width: 150px;
        background-color: #fafafa;
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        text-align: left;
      }
      td {
        padding: 10px 20px;
        box-sizing: border-box;
      }
    }
  }
  input,
  select,
  textarea {
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    resize: none;
    font-size: 14px;
    color: #454545;
  }
  textarea {
    height: 120px;
    padding: 10px;
    box-sizing: border-box;
  }
  input::placeholder {
    font-size: 14px;
    color: #999;
  }
  input,
  select {
    height: 36px;
  }

  ${ButtonWrap} {
    text-align: center;
    padding: 18px 0;
    box-sizing: border-box;

    > button {
      width: 145px;
      height: 40px;
      border-radius: 5px;
      + button {
        margin-left: 14px;
      }
    }
  }
`;

const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  label,
  span {
    display: inline-block;
    font-size: 14px;
    color: #454545;
  }
  textarea {
    width: 100%;
  }
`;

const CheckBoxWrap = styled.div`
  display: inline-block;
  input[type='checkbox'] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding-left: 34px;
      background: url('/images/btn/btn_checkbox_no_24x24.png') left center no-repeat;
    }
    &:checked + label {
      background: url('/images/btn/btn_checkbox_yes_24x24.png') left center no-repeat;
    }
  }
  input[type='radio'] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding-left: 34px;
      background: url('/images/btn/btn_checkbox_no_24x24.png') left center no-repeat;
    }
    &:checked + label {
      background: url('/images/btn/btn_checkbox_yes_24x24.png') left center no-repeat;
    }
  }
`;

const CalendarSelectBox = styled.select`
  width: 220px;
`;
const NameInput = styled.input`
  width: 100%;
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
  width: 144px;
  height: 36px;
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
  width: 140px;
  height: 36px;
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
      border: none;
      padding: 0;
      padding-left: 10px;
      background-color: ${({ theme }) => theme.colors.white};
    }
    button {
      padding: 0;
      padding-top: 6px;
    }
  }
`;

const AlrmWrap = styled(BoxWrap)`
  margin-top: 10px;
`;

const AlrmTimeWrap = styled.div`
  margin-left: 20px;
`;
const RepeatPeriod = styled.div`
  margin-left: 20px;
`;

const NumberInputBox = styled.div`
  margin: 0 7px;
  position: relative;
  display: inline-block;
  select,
  input {
    width: 80px;
  }
  button {
    position: absolute;
    right: 5px;
    width: 18px;
    height: 18px;
    background: url('/images/ico/ico_select.png') center no-repeat;

    &:nth-of-type(1) {
      top: 0;
      transform: rotate(180deg);
      background-position: center top 4px;
    }
    &:nth-of-type(2) {
      bottom: 0;
      background-position: center top 2px;
    }
  }
`;

const CycleSelectWrap = styled.div`
  margin-left: 7px;
  display: inline-block;
`;

const ApplyWrap = styled(BoxWrap)`
  margin-top: 10px;
  @media screen and (max-width: 1470px) {
    display: block;
    margin-top: 10px;
    margin-left: 0;
  }
  ${CheckBoxWrap} + ${CheckBoxWrap} {
    margin-left: 14px;
  }
  span {
    color: ${({ theme }) => theme.colors.grey};
    margin-left: 17px;
  }
`;

const TabWrap = styled.div`
  display: flex;
  width: 98%;
  border-bottom: 1px solid #eeeeee;
  > label {
    width: 200px;
    line-height: 45px;
    background-color: #f1f3f5;
    text-align: center;
    border-radius: 12px 12px 0 0;
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-bottom: none;
    transition: 0.25s ease-in-out;
  }
  > input {
    display: none;
    &:checked + label {
      background-color: #177efb;
      font-weight: bold;
      color: white;
    }
  }
`;
//#endregion

const EventWritePage = ({ calendars, event }: EventWritePageProps) => {
  const router = useRouter();
  const isDisableModify = useMemo(() => !!(event.isRepeat && event.eventId), []);
  // Form
  const { register, watch, getValues, setValue, handleSubmit, errors, control } = useForm({
    defaultValues: event,
  });
  // Form 항목 중 Array 가 필요한 것들 FIXME: 나중에 알림 항목도 넣을지 고민 해봐야함
  const { fields, append, remove } = useFieldArray<EventFile>({
    control,
    name: 'files',
  });

  // 렌더링 대상
  const type = watch('type'); // 일정 타입
  const startDt = watch('startDt'); // 시작일 변경 DatePicker 전달
  const endDt = watch('endDt'); // 종료일 변경 DatePicker 전달
  const isAllDay = watch('isAllDay'); // 종일 여부시 TimePicker 숨김
  const isRepeat = watch('isRepeat'); // 반복설정
  const applyType = watch('applyType'); // 반복 적용
  const isAlrm = watch('isAlrm'); // 알림 설정 수정
  const repeatType: string = watch('repeat.type'); // 반복 타입 수정
  const alrmType: string = watch('alrms[0].type'); // 알림 타입 수정 FIXME: 알림 여러개 등록가능하도록 하면 변경 필요
  const alrmTime: string = watch('alrms[0].alrmTime'); // 알림 시간 수정 FIXME: 알림 여러개 등록가능하도록 하면 변경 필요

  // 파일 업로드
  const onUploadFiles = useCallback((files: FileItem[]) => {
    files.forEach(({ fileId, name, size }) => {
      append({ fileId, file: { orgNm: name, fileId, fsize: size } });
    });
  }, []);

  useEffect(() => {
    const item = sessionStorage.getItem(EVENT_FORM_DATA);
    if (item) {
      const form = JSON.parse(item);
      Object.keys(form).forEach((key) => {
        setValue(key, form[key]);
      });
      sessionStorage.removeItem(EVENT_FORM_DATA);
    }
  }, []);
  useEffect(() => {
    if (isRepeat) {
      setValue('repeat.num', 1);
      setValue('repeat.type', 'W');
    }
  }, [isRepeat]);

  useEffect(() => {
    if (isAllDay && isAlrm && ['H', 'M'].includes(alrmType)) {
      setValue('alrms[0].type', 'D');
      setValue('alrms[0].num', 1);
      setValue('alrms[0].alrmTime', '09:00');
    }
  }, [isAllDay, isAlrm, alrmType]);

  const maxValue = useMemo(() => {
    const value: number = getValues('alrms[0].num');
    let maxVal = 999;

    if (alrmType === 'H') {
      maxVal = 24;
    } else if (alrmType === 'D') {
      maxVal = 30;
    } else if (alrmType === 'W') {
      maxVal = 4;
    }

    // alrmType 변경될때마다 값 1로 초기화
    if (value > maxVal) {
      setValue('alrms[0].num', 1);
    }

    return maxVal;
  }, [alrmType, getValues, setValue]);

  const repeatSubTypes = useMemo(() => {
    const result: { byDay?: string; byWeek?: string; text: string }[] = [];
    if (repeatType === 'M') {
      const eventStartDt = new Date(startDt);
      result.push({
        text: `매월 ${eventStartDt.getDate()}일`,
      });
      // 마지막 주
      const lastWeekNum = DateUtil.getWeekOfMonth(DateUtil.getLastMonthDay(eventStartDt));
      // 현재 주
      const byWeek = DateUtil.getWeekOfMonth(eventStartDt);
      const byWeekText = DateUtil.weekToLocale(lastWeekNum === 6 && byWeek === 5 ? byWeek - 1 : byWeek);
      // 현재 요일
      const byDay = DateUtil.getDayType(eventStartDt.getDay());
      const byDayText = DateUtil.dayToLocale(eventStartDt.getDay());

      result.push({
        byWeek: (lastWeekNum === 6 && byWeek === 5 ? byWeek - 1 : byWeek).toString(),
        byDay,
        text: `매월 ${byWeekText} ${byDayText}`,
      });
      if (lastWeekNum === 6 && byWeek > 4) {
        result.push({
          byWeek: '5',
          byDay,
          text: `매월 마지막 ${byDayText}`,
        });
      }
    }
    return result;
  }, [repeatType, startDt, setValue]);

  const onChangeStartDt = useCallback(
    (date: Date) => {
      if (!DateUtil.isInvalidDate(date)) {
        const startDt = new Date(getValues('startDt'));
        const endDt = new Date(getValues('endDt'));
        const diff = DateUtil.diffDay(endDt, startDt);
        setValue('startDt', date.toISOString());
        setValue('endDt', DateUtil.addDay(date, diff).toISOString());
        setValue('repeat.byWeek', undefined);
        setValue('repeat.byDay', undefined);
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

  // 반복 num 관련 버튼 핸들링
  const onRepeatUpDownButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const num = Number(getValues('repeat.num'));
      const upDown = Number(e.currentTarget.dataset.num);
      const result = num + upDown;
      if (result > 0) {
        setValue('repeat.num', result);
      }
    },
    [setValue, getValues],
  );

  // 저장
  const onHandleSubmit = useCallback(
    handleSubmit(async ({ type, isAllDay, isAlrm, isRepeat, ...formData }) => {
      // 알림기능
      if (isAlrm && formData.alrms[0].num === 0) {
        alert('알림 시간을 설정해주셔야 합니다.');
        return;
      }
      // 반복 검사
      if (isRepeat && formData.repeat.num === 0) {
        alert('반복주기를 설정해주셔야 합니다.');
        return;
      }
      if (type === 'EVENT' && new Date(formData.startDt).getTime() > new Date(formData.endDt).getTime()) {
        alert('종료일자가 시작일자보다 작습니다');
        return;
      }

      // 반복이 월일경우
      if (isRepeat && formData.repeat.type === 'M' && formData.repeat.byWeek) {
        const { byDay, byWeek } = repeatSubTypes.find(({ byWeek }) => byWeek === formData.repeat.byWeek);
        formData.repeat['byDay'] = byDay as ByDay;
        formData.repeat['byWeek'] = byWeek as ByWeek;
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

      if (event.eventId && event.isRepeat) {
        param.repeat = event.repeat;
      }
      if (type === 'EVENT') {
        formData.alrms?.forEach(({ type }, idx) => {
          if (type === 'NOW') {
            param.alrms[idx].type = 'D';
            param.alrms[idx].num = 0;
          }
        });
        if (event.eventId) {
          await axios.put(`/diary/calendar/${event.calendarId}/event`, param);
        } else {
          delete param['eventId'];
          await axios.post(`/diary/calendar/${event.calendarId}/event`, param);
        }
      } else {
        delete param['endDt'];
        delete param['replyYn'];
        if (formData.alrms?.length > 0) {
          const alrm = formData.alrms[0];
          if (alrm.type === 'NOW') {
            param['alrm'] = { type: 'D', num: 0, alrmTime: alrm.alrmTime };
          } else {
            param['alrm'] = alrm;
          }
          delete param['alrms'];
        }
        if (event.todoId) {
          await axios.put(`/diary/todo`, param);
        } else {
          delete param['todoId'];
          await axios.post(`/diary/todo`, param);
        }
      }
      alert('저장되었습니다.');
      // 메인화면 이동
      router.replace('/');
    }),
    [handleSubmit, repeatSubTypes],
  );

  //#region 알람 영역
  const alrmTimeToDate = useMemo(() => {
    if (alrmTime) {
      const [hh, mm] = alrmTime?.split(':').map((i) => Number(i));
      return new Date(null, null, null, hh, mm);
    } else {
      return new Date(null, null, null, 9, 0);
    }
  }, [alrmTime]);

  const onChangeAlrmDt = useCallback(
    (_, time: string) => {
      setValue('alrms[0].alrmTime', time);
    },
    [setValue, getValues],
  );

  const onAlrmUpDownButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const num = Number(getValues('alrms[0].num'));
      const upDown = Number(e.currentTarget.dataset.num);
      const result = num + upDown;
      if (result > 0) {
        setValue('alrms[0].num', result);
      }
    },
    [setValue, getValues],
  );

  //#endregion

  return (
    <MuiPickersUtilsProvider utils={LocalizedDateUtils} locale={ko}>
      <MainLayout title={'일정추가'}>
        <Wrap>
          <LeftWrap />
          <MainWrap>
            <EventFormTable>
              {!event.todoId && !event.eventId ? (
                <TabWrap>
                  <input type="radio" name="type" id="type-event" value="EVENT" ref={register} />
                  <label htmlFor="type-event">일정</label>
                  <input type="radio" name="type" id="type-todo" value="TODO" ref={register} />
                  <label htmlFor="type-todo">할일</label>
                </TabWrap>
              ) : (
                <input type="hidden" name="type" ref={register} />
              )}
              <form onSubmit={onHandleSubmit}>
                {event.todoId && <input type="hidden" ref={register} name="todoId" />}
                {event.eventId && <input type="hidden" ref={register} name="eventId" />}
                <fieldset>
                  <table>
                    <tbody>
                      {type === 'EVENT' && (
                        <tr>
                          <th>일정종류</th>
                          <td>
                            <BoxWrap>
                              <CalendarSelectBox
                                ref={register({
                                  required: {
                                    value: true,
                                    message: '종류를 선택하셔야 합니다.',
                                  },
                                })}
                                name="calendarId"
                              >
                                <option value="">일정 선택</option>
                                {calendars.map(({ name, calendarId }) => (
                                  <option value={calendarId} key={`select-calendar-${calendarId}`}>
                                    {name}
                                  </option>
                                ))}
                              </CalendarSelectBox>
                              <ErrorMessage>{errors.calendarId?.message}</ErrorMessage>
                            </BoxWrap>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th>제목</th>
                        <td>
                          <BoxWrap>
                            <NameInput
                              name="name"
                              ref={register({
                                required: {
                                  value: true,
                                  message: '일정 제목을 입력해주세요.',
                                },
                              })}
                              placeholder="제목을 입력해주세요."
                            />
                          </BoxWrap>
                          <ErrorMessage>{errors.name?.message}</ErrorMessage>
                        </td>
                      </tr>
                      <tr>
                        <th>일시</th>
                        <td>
                          <BoxWrap>
                            <CheckBoxWrap>
                              <input
                                type="checkbox"
                                id="date_all"
                                name="isAllDay"
                                ref={register}
                                disabled={isDisableModify}
                              />
                              <label htmlFor="date_all">종일</label>
                            </CheckBoxWrap>
                            <DatePeriod>
                              <input type="hidden" name="startDt" ref={register} />
                              <input type="hidden" name="endDt" ref={register} />
                              <DatePickerInput
                                autoOk
                                variant="inline"
                                value={startDt}
                                name={'startDt'}
                                onChange={onChangeStartDt}
                                disabled={isDisableModify}
                              />
                              {!isAllDay && (
                                <TimePickerInput
                                  autoOk
                                  ampm={false}
                                  variant="inline"
                                  value={startDt}
                                  onChange={onChangeStartTime}
                                  disabled={isDisableModify}
                                />
                              )}
                              {type === 'EVENT' && (
                                <>
                                  <span>~</span>
                                  <DatePickerInput
                                    autoOk
                                    variant="inline"
                                    value={endDt}
                                    minDate={startDt}
                                    minDateMessage="종료날짜가 시작날짜보다 이전 입니다."
                                    onChange={onChangeEndDt}
                                    disabled={isDisableModify}
                                  />
                                  {!isAllDay && (
                                    <TimePickerInput
                                      autoOk
                                      ampm={false}
                                      variant="inline"
                                      value={endDt}
                                      onChange={onChangeEndTime}
                                      disabled={isDisableModify}
                                    />
                                  )}
                                </>
                              )}
                            </DatePeriod>
                          </BoxWrap>
                          <AlrmWrap>
                            <CheckBoxWrap>
                              <input type="checkbox" id="alarmOn" name="isAlrm" ref={register} />
                              <label htmlFor="alarmOn">알림</label>
                            </CheckBoxWrap>
                            {isAlrm && (
                              <AlrmTimeWrap>
                                {alrmType !== 'NOW' && <span>일정시작</span>}
                                <input type="hidden" name="alrms[0].alrmTime" ref={register} />
                                {alrmType !== 'NOW' && (
                                  <NumberInputBox>
                                    <input
                                      type="number"
                                      name="alrms[0].num"
                                      ref={register({
                                        max: {
                                          value: maxValue,
                                          message: `알림은 ${maxValue} 까지 등록 가능합니다.`,
                                        },
                                      })}
                                    />
                                    <button type="button" data-num={1} onClick={onAlrmUpDownButton} />
                                    <button type="button" data-num={-1} onClick={onAlrmUpDownButton} />
                                  </NumberInputBox>
                                )}
                                <select name="alrms[0].type" ref={register}>
                                  <option value="NOW">{isAllDay ? '일정시작일' : '일정시작시간'}</option>
                                  {!isAllDay && (
                                    <>
                                      <option value="M">분 전</option>
                                      <option value="H">시간 전</option>
                                    </>
                                  )}
                                  <option value="D">일 전</option>
                                  <option value="W">주 전</option>
                                </select>
                                {isAllDay && ['D', 'W', 'NOW'].includes(alrmType) && (
                                  <TimePickerInput
                                    ampm={false}
                                    variant="inline"
                                    value={alrmTimeToDate}
                                    onChange={onChangeAlrmDt}
                                    invalidDateMessage={'시간을 정확히 입력해주세요.'}
                                  />
                                )}
                              </AlrmTimeWrap>
                            )}
                          </AlrmWrap>
                          <ErrorMessage>{errors.alrms?.[0]?.num?.message}</ErrorMessage>
                        </td>
                      </tr>
                      <tr>
                        <th>내용</th>
                        <td>
                          <BoxWrap>
                            <textarea name="note" ref={register}></textarea>
                          </BoxWrap>
                        </td>
                      </tr>
                      {type === 'EVENT' && (
                        <>
                          <tr>
                            <th>첨부파일</th>
                            <td>
                              <FileContent>
                                <DropZone onUploadFiles={onUploadFiles} />
                              </FileContent>
                              <AttachedFileWrap>
                                {fields.map(({ file: { fileId, orgNm, fsize } }, idx) => (
                                  <p key={fileId}>
                                    <input
                                      name={`files[${idx}].fileId`}
                                      key={`file-fileId-${fileId}`}
                                      type="hidden"
                                      value={fileId}
                                      ref={register()}
                                    />
                                    <span>
                                      {orgNm} ( {FileUtil.getFileSize(fsize)} ){' '}
                                    </span>
                                    <DeleteIcon
                                      onClick={() => {
                                        remove(idx);
                                      }}
                                    >
                                      X
                                    </DeleteIcon>
                                  </p>
                                ))}
                              </AttachedFileWrap>
                            </td>
                          </tr>
                          <tr>
                            <th>반복설정</th>
                            <td>
                              {!isDisableModify && (
                                <BoxWrap>
                                  <CheckBoxWrap>
                                    <input
                                      type="checkbox"
                                      id="repeat"
                                      name="isRepeat"
                                      ref={register}
                                      disabled={isDisableModify}
                                    />
                                    <label htmlFor="repeat">반복</label>
                                  </CheckBoxWrap>
                                  {isRepeat && (
                                    <RepeatPeriod>
                                      <span>반복주기</span>
                                      <NumberInputBox>
                                        <input type="number" ref={register} name="repeat.num" />
                                        <button type="button" data-num={1} onClick={onRepeatUpDownButton} />
                                        <button type="button" data-num={-1} onClick={onRepeatUpDownButton} />
                                      </NumberInputBox>
                                      <select ref={register} name="repeat.type">
                                        <option value="D">일</option>
                                        <option value="W">주</option>
                                        <option value="M">개월</option>
                                        <option value="Y">년</option>
                                      </select>
                                      {['M'].includes(repeatType) && (
                                        <CycleSelectWrap>
                                          <select ref={register} name="repeat.byWeek">
                                            {repeatSubTypes.map(({ text, byWeek }, idx) => (
                                              <option value={byWeek ?? ''} key={`subType-key-${idx}`}>
                                                {text}
                                              </option>
                                            ))}
                                          </select>
                                        </CycleSelectWrap>
                                      )}
                                    </RepeatPeriod>
                                  )}
                                </BoxWrap>
                              )}
                              {isDisableModify && (
                                <>
                                  <ApplyWrap>
                                    <CheckBoxWrap>
                                      <input type="radio" id="allApply" name="applyType" ref={register} value="ALL" />
                                      <label htmlFor="allApply">전체적용</label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                      <input
                                        type="radio"
                                        id="nextApply"
                                        name="applyType"
                                        ref={register}
                                        value="AFTER"
                                      />
                                      <label htmlFor="nextApply">다음</label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                      <input
                                        type="radio"
                                        id="currentApply"
                                        name="applyType"
                                        ref={register}
                                        value="CURRENT"
                                      />
                                      <label htmlFor="currentApply">현재</label>
                                    </CheckBoxWrap>
                                    <span>
                                      (전체 : 전체일정에 적용 / 다음 : 이 일정부터 이후 일정에 적용 / 현재 : 이 일정만
                                      적용)
                                    </span>
                                  </ApplyWrap>
                                  {applyType === 'ALL' && (
                                    <ErrorMessage>⚠️ 반복된 일정의 댓글 전체가 삭제 됩니다.</ErrorMessage>
                                  )}
                                  {applyType === 'AFTER' && (
                                    <ErrorMessage>⚠️ 이후 일정의 댓글 전체가 삭제 됩니다.</ErrorMessage>
                                  )}
                                </>
                              )}
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <ButtonWrap>
                    <Link href={'/'} replace={true}>
                      <FormButtonBlue type="button">취소</FormButtonBlue>
                    </Link>
                    <BlueButton>저장</BlueButton>
                  </ButtonWrap>
                </fieldset>
              </form>
            </EventFormTable>
          </MainWrap>
        </Wrap>
      </MainLayout>
    </MuiPickersUtilsProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { calendarId, eventId, date, todoId } = ctx.query as {
    todoId: string;
    calendarId: string;
    eventId: string;
    date: string;
  };

  // 사용중인 캘린더
  const { data: calendars } = await serverAxios(ctx).get('/diary/calendar');

  let event: any;

  if (calendarId && eventId) {
    const { data } = await serverAxios(ctx).get<EventDetail>(`/diary/calendar/${calendarId}/event/${eventId}`);
    event = data;
  }
  if (todoId) {
    const {
      data: { name, allDayYn, alrm, startDt, note },
    } = await serverAxios(ctx).get<TodoDetail>(`/diary/todo/${todoId}`);

    event = { name, allDayYn, alrms: alrm ? [alrm] : undefined, startDt, note };
  }

  const applyType = 'ALL';
  const files = event?.files ?? [];
  const repeat = event?.repeat ?? { type: 'W', num: 1 };
  const alrms =
    event?.alrms?.length > 0
      ? event.alrms.map(({ type, num, alrmTime }) => ({
          num,
          alrmTime,
          type: num === 0 && type === 'D' ? 'NOW' : type,
        }))
      : [{ num: 1, type: 'D', alrmTime: '09:00' }];

  let startDt = event?.startDt ?? new Date().toISOString();
  let endDt = event?.endDt ?? new Date().toISOString();
  if (date) {
    const diff = event ? DateUtil.diffDay(new Date(event.endDt), new Date(event.startDt)) : 0;
    const writeDate = new Date(`${date} GMT+9`);
    startDt = DateUtil.copyHourMinute(writeDate, new Date(startDt)).toISOString();
    endDt = DateUtil.copyHourMinute(DateUtil.addDay(writeDate, diff), new Date(endDt)).toISOString();
  }

  return {
    props: {
      calendars: calendars?.filter(({ lv }) => lv >= 2),
      event: {
        type: todoId ? 'TODO' : 'EVENT',
        startDt,
        endDt,
        repeat,
        alrms,
        files,
        applyType,
        calendarId: calendarId ?? calendars[0]?.calendarId ?? null,
        eventId: eventId ?? null,
        todoId: todoId ?? null,
        name: event?.name ?? '',
        note: event?.note ?? '',
        isAllDay: (event?.allDayYn ?? 'Y') === 'Y',
        isAlrm: event?.alrms?.length > 0,
        isRepeat: event?.repeat ?? false,
      },
    },
  };
};
export default EventWritePage;

type EventWritePageProps = {
  calendars: CalendarUsr[];
  event: {
    todoId: string;
    calendarId: string;
    eventId: string;
    startDt: string;
    endDt: string;
    repeat: EventRepeat;
    alrms: EventAlrm[];
    files: FileItem[];
    applyType: 'ALL' | 'CURRENT' | 'AFTER';
    name: string;
    note: string;
    isAllDay: boolean;
    isAlrm: boolean;
    isRepeat: boolean;
    type: 'EVENT' | 'TODO';
  };
};
