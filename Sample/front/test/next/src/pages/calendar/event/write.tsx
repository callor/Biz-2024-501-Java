import MainLayout from "@components/layout/main";
import styled from "@emotion/styled";
import { axios, serverAxios } from "@utils/network.util";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form/dist/index.ie11";
import ko from "date-fns/locale/ko";
import {
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { LocalizedDateUtils } from "@utils/datepicker.utils";
import { BlueButton } from "@components/common/button";
import { FormButtonBlue } from "@components/mypage/form";
import ButtonWrap from "@components/common/button/ButtonWrap";
import { useCallback, useMemo } from "react";
import { DateUtil } from "@utils/date.util";
import Link from "next/link";
import { useRouter } from "next/router";

//#region style
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
  border-right: 1px solid #dbdbdb;
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
        color: #252525;
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
    border: 1px solid #dbdbdb;
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
  input[type="checkbox"] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding-left: 34px;
      background: url("/images/btn/btn_checkbox_no_24x24.png") left center
        no-repeat;
    }
    &:checked + label {
      background: url("/images/btn/btn_checkbox_yes_24x24.png") left center
        no-repeat;
    }
  }
  input[type="radio"] {
    display: none;
    width: 0;
    height: 0;
    + label {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding-left: 34px;
      background: url("/images/btn/btn_checkbox_no_24x24.png") left center
        no-repeat;
    }
    &:checked + label {
      background: url("/images/btn/btn_checkbox_yes_24x24.png") left center
        no-repeat;
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
      background-color: #fff;
      background: url("/images/ico/ico_calendar.png") right 10px center
        no-repeat;
    }
  }
`;

const TimePickerInput = styled(KeyboardTimePicker)`
  margin-left: 7px !important;
  width: 140px;
  height: 36px;
  border-bottom: none;
  > div {
    border: 1px solid #dbdbdb;
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
      background-color: #fff;
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
    background: url("/images/ico/ico_select.png") center no-repeat;

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
    color: #757575;
    margin-left: 17px;
  }
`;
//#endregion

const EventWritePage = ({
  calendarId,
  eventId,
  calendars,
  defaultValues,
}: EventWritePageProps) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    errors,
  } = useForm({
    defaultValues: { ...defaultValues, calendarId, eventId },
  });

  const router = useRouter();
  // 렌더링 대상
  const startDt = watch("startDt"); // 시작일 변경 DatePicker 전달
  const endDt = watch("endDt"); // 종료일 변경 DatePicker 전달
  const isAllDay = watch("isAllDay"); // 종일 여부시 TimePicker 숨김
  const isAlrm = watch("isAlrm"); // 알림 설정 수정
  const isRepeat = watch("isRepeat"); // 반복설정
  const repeatType: string = watch("repeat.type");
  const alrmType: string = watch("alrms[0].type");
  const alrmTime = watch("alrms[0].alrmTime", "09:00");

  const alrmTimeToDate = useMemo(() => {
    const [hh, mm] = alrmTime.split(":");
    return new Date(null, null, null, Number(hh), Number(mm));
  }, [alrmTime]);

  const repeatSubTypes = useMemo(() => {
    const result: { byDay?: string; byWeek?: string; text: string }[] = [];
    setValue("byWeek", undefined);
    setValue("byDay", undefined);
    if (repeatType === "M") {
      const eventStartDt = new Date(startDt);
      //
      result.push({
        text: `매월 ${eventStartDt.getDate()}일`,
      });
      // 마지막 주
      const lastWeekNum = DateUtil.getWeekOfMonth(
        DateUtil.getLastMonthDay(eventStartDt)
      );
      // 현재 주
      const byWeek = DateUtil.getWeekOfMonth(eventStartDt);
      const byWeekText = DateUtil.weekToLocale(byWeek);
      // 현재 요일
      const byDay = DateUtil.getDayType(eventStartDt.getDay());
      const byDayText = DateUtil.dayToLocale(eventStartDt.getDay());

      result.push({
        byWeek: (lastWeekNum === 6 && byWeek === 5
          ? byWeek - 1
          : byWeek
        ).toString(),
        byDay,
        text: `매월 ${byWeekText} ${byDayText}`,
      });
      if (lastWeekNum === 6 && byWeek > 4) {
        result.push({
          byWeek: "5",
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
        const startDt = new Date(getValues("startDt"));
        const endDt = new Date(getValues("endDt"));
        const diff = DateUtil.diffDay(endDt, startDt);
        setValue("startDt", date.toISOString());
        setValue("endDt", DateUtil.addDay(date, diff).toISOString());
        setValue("repeat.byWeek", undefined);
        setValue("repeat.byDay", undefined);
      }
    },
    [setValue, getValues]
  );

  const onChangeEndDt = useCallback(
    (date: Date) => {
      if (!DateUtil.isInvalidDate(date)) {
        setValue("endDt", date.toISOString());
      }
    },
    [setValue, getValues]
  );

  const onChangeAlrmDt = useCallback(
    (_, time: string) => {
      setValue("alrms[0].alrmTime", time);
    },
    [setValue, getValues]
  );

  const onHandleSubmit = useCallback(
    handleSubmit(async ({ isAllDay, isAlrm, isRepeat, ...formData }) => {
      const _calendarId = formData.calendarId ?? calendarId;
      if (isAlrm && formData.alrms[0].num === 0) {
        alert("알람 시간을 설정해주셔야 합니다.");
        return;
      }
      if (isRepeat && formData.repeat.num === 0) {
        alert("반복주기를 설정해주셔야 합니다.");
        return;
      }
      if (isRepeat && formData.repeat.type === "M" && formData.repeat.byWeek) {
        const { byDay, byWeek } = repeatSubTypes.find(
          ({ byWeek }) => byWeek === formData.repeat.byWeek
        );
        formData.repeat["byDay"] = byDay;
        formData.repeat["byWeek"] = byWeek as "1" | "2" | "3" | "4" | "5";
      }
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
        calendarId: _calendarId,
        allDayYn: isAllDay ? "Y" : "N",
        replyYn: "Y",
      };
      if (eventId) {
        await axios.put(`/diary/calendar/${_calendarId}/event`, {
          ...param,
          eventId,
        });
      } else {
        await axios.post(`/diary/calendar/${_calendarId}/event`, param);
      }
      alert("저장되었습니다.");
      // 메인화면 이동
      router.replace("/");
    }),
    [handleSubmit, repeatSubTypes, eventId]
  );

  const onAlrmUpDownButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const num = Number(getValues("alrms[0].num"));
      const upDown = Number(e.currentTarget.dataset.num);
      const result = num + upDown;
      if (result > 0) {
        setValue("alrms[0].num", result);
      }
    },
    [setValue, getValues]
  );

  const onRepeatUpDownButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const num = Number(getValues("repeat.num"));
      const upDown = Number(e.currentTarget.dataset.num);
      const result = num + upDown;
      if (result > 0) {
        setValue("repeat.num", result);
      }
    },
    [setValue, getValues]
  );

  return (
    <MuiPickersUtilsProvider utils={LocalizedDateUtils} locale={ko}>
      <MainLayout title={"일정추가"}>
        <Wrap>
          <LeftWrap />
          <MainWrap>
            <EventFormTable>
              <form onSubmit={onHandleSubmit}>
                <fieldset>
                  <table>
                    <tbody>
                      <tr>
                        <th>일정종류</th>
                        <td>
                          <BoxWrap>
                            <CalendarSelectBox
                              ref={register({
                                required: {
                                  value: true,
                                  message: "종류를 선택하셔야 합니다.",
                                },
                              })}
                              name="calendarId"
                              disabled={!!calendarId}
                            >
                              <option value="">일정 선택</option>
                              {calendars.map(({ name, calendarId }) => (
                                <option
                                  value={calendarId}
                                  key={`select-calendar-${calendarId}`}
                                >
                                  {name}
                                </option>
                              ))}
                            </CalendarSelectBox>
                            <ErrorMessage>
                              {errors.calendarId?.message}
                            </ErrorMessage>
                          </BoxWrap>
                        </td>
                      </tr>
                      <tr>
                        <th>제목</th>
                        <td>
                          <BoxWrap>
                            <NameInput
                              name="name"
                              ref={register({
                                required: {
                                  value: true,
                                  message: "일정 제목을 입력해주세요.",
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
                              />
                              <label htmlFor="date_all">종일</label>
                            </CheckBoxWrap>
                            <DatePeriod>
                              <input
                                type="hidden"
                                name="startDt"
                                ref={register}
                              />
                              <input
                                type="hidden"
                                name="endDt"
                                ref={register}
                              />
                              <DatePickerInput
                                variant="inline"
                                value={startDt}
                                name={"startDt"}
                                onChange={onChangeStartDt}
                              />
                              {!isAllDay && (
                                <TimePickerInput
                                  ampm={false}
                                  variant="inline"
                                  value={startDt}
                                  onChange={onChangeStartDt}
                                />
                              )}
                              <span>~</span>
                              <DatePickerInput
                                variant="inline"
                                value={endDt}
                                minDate={startDt}
                                minDateMessage="종료날짜가 시작날짜보다 이전 입니다."
                                onChange={onChangeEndDt}
                              />
                              {!isAllDay && (
                                <TimePickerInput
                                  ampm={false}
                                  variant="inline"
                                  value={endDt}
                                  onChange={onChangeEndDt}
                                />
                              )}
                            </DatePeriod>
                          </BoxWrap>
                          <AlrmWrap>
                            <CheckBoxWrap>
                              <input
                                type="checkbox"
                                id="alarmOn"
                                name="isAlrm"
                                ref={register}
                              />
                              <label htmlFor="alarmOn">알림</label>
                            </CheckBoxWrap>
                            {isAlrm && (
                              <AlrmTimeWrap>
                                <span>일정시작</span>
                                <input
                                  type="hidden"
                                  name="alrms[0].alrmTime"
                                  ref={register}
                                />
                                <NumberInputBox>
                                  <input
                                    type="number"
                                    name="alrms[0].num"
                                    ref={register}
                                  />
                                  <button
                                    type="button"
                                    data-num={1}
                                    onClick={onAlrmUpDownButton}
                                  />
                                  <button
                                    type="button"
                                    data-num={-1}
                                    onClick={onAlrmUpDownButton}
                                  />
                                </NumberInputBox>
                                <select name="alrms[0].type" ref={register}>
                                  <option value="M">분 전</option>
                                  <option value="H">시간 전</option>
                                  <option value="D">일 전</option>
                                  <option value="W">주 전</option>
                                </select>
                                {alrmType === "D" && (
                                  <TimePickerInput
                                    ampm={false}
                                    variant="inline"
                                    value={alrmTimeToDate}
                                    onChange={onChangeAlrmDt}
                                    invalidDateMessage={
                                      "시간을 정확히 입력해주세요."
                                    }
                                  />
                                )}
                              </AlrmTimeWrap>
                            )}
                          </AlrmWrap>
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
                      <tr>
                        <th>반복설정</th>
                        <td>
                          <BoxWrap>
                            <CheckBoxWrap>
                              <input
                                type="checkbox"
                                id="repeat"
                                name="isRepeat"
                                ref={register}
                              />
                              <label htmlFor="repeat">반복</label>
                            </CheckBoxWrap>
                            {isRepeat && (
                              <RepeatPeriod>
                                <span>반복주기</span>
                                <NumberInputBox>
                                  <input
                                    type="number"
                                    ref={register}
                                    name="repeat.num"
                                  />
                                  <button
                                    type="button"
                                    data-num={1}
                                    onClick={onRepeatUpDownButton}
                                  />
                                  <button
                                    type="button"
                                    data-num={-1}
                                    onClick={onRepeatUpDownButton}
                                  />
                                </NumberInputBox>
                                <select ref={register} name="repeat.type">
                                  <option value="D">일</option>
                                  <option value="W">주</option>
                                  <option value="M">개월</option>
                                  <option value="Y">년</option>
                                </select>
                                {["M"].includes(repeatType) && (
                                  <CycleSelectWrap>
                                    <select ref={register} name="repeat.byWeek">
                                      {repeatSubTypes.map(
                                        ({ text, byWeek }, idx) => (
                                          <option
                                            value={byWeek ?? ""}
                                            key={`subType-key-${idx}`}
                                          >
                                            {text}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </CycleSelectWrap>
                                )}
                              </RepeatPeriod>
                            )}
                          </BoxWrap>
                          {eventId && defaultValues.isRepeat && (
                            <ApplyWrap>
                              <CheckBoxWrap>
                                <input
                                  type="radio"
                                  id="allApply"
                                  name="applyType"
                                  ref={register}
                                  value="ALL"
                                />
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
                                (전체 : 전체일정에 적용 / 다음 : 이 일정부터
                                이후 일정에 적용 / 현재 : 이 일정만 적용)
                              </span>
                            </ApplyWrap>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <ButtonWrap>
                    {calendarId && eventId ? (
                      <FormButtonBlue type="button">삭제</FormButtonBlue>
                    ) : (
                      <Link href={"/"} replace={true}>
                        <FormButtonBlue type="button">취소</FormButtonBlue>
                      </Link>
                    )}
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
  let defaultValues: DefaultValues = {
    name: "",
    note: "",
    type: "E",
    startDt: new Date().toISOString(),
    endDt: new Date().toISOString(),
    isAllDay: true,
    isRepeat: false,
    isAlrm: false,
    applyType: "ALL",
    repeat: {
      type: "W",
      num: 1,
    },
    alrms: [{ num: 1, type: "D", alrmTime: "09:00" }],
  };
  const { calendarId, eventId, date } = ctx.query as {
    calendarId: string;
    eventId: string;
    date: string;
  };

  // 사용중인 캘린더
  const { data: calendars } = await serverAxios(ctx).get("/diary/calendar");

  // 캘린더 이벤트가 있다면
  if (calendarId && eventId) {
    const {
      data: { event },
    } = await serverAxios(ctx).get<CalendarEvent>(
      `/diary/calendar/${calendarId}/event/${eventId}`
    );
    defaultValues = {
      ...event,
      applyType: "ALL",
      isRepeat: !!event?.repeat,
      isAlrm: event.alrms.length > 0,
      isAllDay: event.allDayYn === "Y",
    };
  } else if (date) {
    const startDt = new Date(date);
    if (!DateUtil.isInvalidDate(startDt)) {
      defaultValues.startDt = startDt.toISOString();
      defaultValues.endDt = startDt.toISOString();
    }
  }

  return {
    props: {
      calendarId: calendarId ?? null,
      eventId: eventId ?? null,
      calendars,
      defaultValues,
    },
  };
};
export default EventWritePage;

//#region types
type DefaultValues = {
  type: "E";
  name: string;
  note?: string;
  startDt: string;
  endDt: string;
  isAllDay: boolean;
  isRepeat: boolean;
  isAlrm: boolean;
  applyType: "ALL" | "AFTER" | "CURRENT";
  repeat: {
    type: string;
    num: number;
    byWeek?: "1" | "2" | "3" | "4" | "5";
  };
  alrms: { type: "M" | "H" | "D" | "W"; num: number; alrmTime: string }[];
};
type EventWritePageProps = {
  calendarId?: string;
  eventId?: string;
  calendars: CalendarUsr[];
  defaultValues: DefaultValues;
};

//#endregion
