import { useCalendarStore, useRootStore } from '@components/common/context/RootStore';
import Modal from '@components/common/modal';
import styled from '@emotion/styled';
import ColorUtil from '@utils/color.util';
import { SELECTS_CALENDAR_LIST, TODO_BG_COLOR } from '@utils/contants';
import { axios } from '@utils/network.util';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import { IoCalendarOutline } from 'react-icons/io5';
import { SHOW_TODO_YN } from '@utils/contants';

//#region styled
const CalendarBox = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > p {
    display: block;
    padding: 19px 0;
    font-size: 17px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
    cursor: pointer;
  }
  > div:first-of-type {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
`;

const CheckBoxWrap = styled.div<{ bgColor: string }>`
  padding-left: 10px;
  > input {
    display: none;
    width: 0;
    height: 0;

    & + label {
      position: relative;
      display: block;
      font-size: 14px;
      line-height: 18px;
      color: #454545;
      padding-left: 26px;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 2px;
        background-color: ${(props) => (props.bgColor.includes('#') ? props.bgColor : `#${props.bgColor}`)};
      }
    }
    &:checked + label:after {
      background-image: url('/images/btn/btn_checkbox_white.png');
    }
  }
`;
const CalendarListWrap = styled.div`
  transition: max-height 0.25s ease-in-out;
  height: calc(100% - 23px);
  overflow-y: auto;
  overflow-x: hidden;
  > ${CheckBoxWrap} + ${CheckBoxWrap} {
    margin-top: 12px;
  }
`;

const FoldingWrap = styled.div`
  flex: 1;
  padding-top: 15px;
  overflow: hidden;
  &:first-of-type {
    flex: none;
    border-top: 1px solid #eeeeee;
  }
`;

const FoldingHelper = styled.span`
  > input[type='checkbox'] {
    display: none;
    width: 0;
    height: 0;
  }
  display: flex;
  align-items: center;

  > label {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    > svg {
      transition: 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
      vertical-align: middle;
      margin-right: 4px;
    }
    &:first-of-type {
      font-weight: 500;
    }
    &:nth-of-type(2) {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.borderBlack};
      margin-left: auto;
    }
  }
  margin-bottom: 10px;
`;

const FoldingCheckbox = styled.input`
  display: none;
  width: 0;
  height: 0;

  &:checked {
    + ${FoldingHelper} {
      label > svg {
        transform: rotate(-90deg);
      }
      + ${CalendarListWrap} {
        max-height: 0;
        overflow: hidden;
      }
    }
  }
`;

const GraoupAddWrap = styled.div`
  position: absolute;
  right: 0;
  z-index: 2;
  padding: 0 4px;
  transition: 0.25s ease-in;
  width: 9px;
  height: 12px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  color: #333;
  display: flex;
  align-items: center;
  > span {
    flex: 1;
    margin-left: 3px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    cursor: pointer;
  }
  > svg {
    flex: 0 0 12px;
  }

  &:hover {
    color: #1c7ed6;
    width: 60px;
  }
`;

const GroupAddModal = styled(Modal)`
  width: 300px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 !important;
  > header {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      font-weight: 500;
      font-size: 18px;
    }
  }
  > article {
    padding: 0 20px;
    padding-top: 0;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    input {
      flex: 1;
      padding-bottom: 3px;
      font-size: 15px;
      padding-left: 1px;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #a3a3a3;
    }
    > div {
      display: flex;
      align-items: center;
      margin-top: 20px;

      > span {
        font-size: 15px;
        color: #9f9f9f;
        flex: 0 0 60px;
        + {
          flex: 1;
        }
      }
    }
  }
  > footer {
    display: flex;
    justify-content: flex-end;
    padding: 15px 20px;
    background-color: #f1f3f5;
    button {
      font-size: 14px;
      font-weight: 400;
      padding: 5px 15px;
      border-radius: 4px;
      box-shadow: 0 1px 2px 1.5px #a3a3a3;
      background-color: white;
    }
    > button + button {
      margin-left: 10px;
      background-color: #228be6;
      color: white;
    }
  }
`;
//#endregion

const CalendarNav = () => {
  const rootStore = useRootStore();
  const calendarStore = useCalendarStore();
  const [isShowGroupAdd, setShowGroupAdd] = useState(false);
  const selects = useMemo(() => calendarStore.selects, [calendarStore.selects]);
  const commonCalendars = useMemo(() => calendarStore.commonCalendars, [calendarStore.commonCalendars]);
  const userCalendars = useMemo(() => calendarStore.userCalendars, [calendarStore.userCalendars]);
  const calendars = useMemo(() => [...commonCalendars, ...userCalendars], [commonCalendars, userCalendars]);
  const refs: HTMLInputElement[] = useMemo(() => [], [calendars]);
  const { watch, register, setValue, getValues, reset } = useForm({ defaultValues: { name: '', bgColor: '' } });
  const color: string = watch('bgColor');
  const setRefs = useCallback(
    (ref: HTMLInputElement) => {
      refs.push(ref);
    },
    [refs],
  );

  useEffect(() => {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const checkBox = document.getElementById(key);
      if (checkBox) {
        const checkedYN = sessionStorage.getItem(key);
        (checkBox as HTMLInputElement).checked = checkedYN === 'Y';
      }
    }
    calendarStore.setShowTodo(sessionStorage.getItem(SHOW_TODO_YN) ?? 'Y' === 'Y' ? true : false);
  }, []);

  useEffect(() => {
    const isLoggedIn = rootStore.isLoggedIn;
    const selects: string[] = JSON.parse(localStorage.getItem(SELECTS_CALENDAR_LIST));
    if (isLoggedIn && selects) {
      calendarStore.setSelctes(selects);
    } else {
      calendarStore.setSelctes(calendars.map(({ calendarId }) => calendarId));
    }
  }, [rootStore.isLoggedIn, calendars]);

  const onToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;

      const selects = checked
        ? [...calendarStore.selects, value]
        : calendarStore.selects.filter((select) => select !== value);

      if (rootStore.isLoggedIn) {
        localStorage.setItem(SELECTS_CALENDAR_LIST, JSON.stringify(selects));
      } else {
        localStorage.removeItem(SELECTS_CALENDAR_LIST);
      }
      calendarStore.setSelctes(selects);
    },
    [rootStore.isLoggedIn, calendarStore.setSelctes],
  );

  const onAllClick = useCallback(() => {
    const selects = refs.every((el) => el.checked) ? [] : refs.map((el) => el.value);

    if (rootStore.isLoggedIn) {
      localStorage.setItem(SELECTS_CALENDAR_LIST, JSON.stringify(selects));
    }
    calendarStore.setSelctes(selects);
  }, [refs]);

  const onChangeFolding = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedYN = e.target.checked ? 'Y' : 'N';
    const id = e.target.id;
    sessionStorage.setItem(id, checkedYN);
  }, []);

  const onOpenModalClick = useCallback(() => {
    setShowGroupAdd(true);
  }, []);

  const onCloseModalClick = useCallback(() => {
    reset();
    setShowGroupAdd(false);
  }, []);

  const onSaveCalendarClick = useCallback(async () => {
    const { name } = getValues();
    let { bgColor } = getValues();
    if (!rootStore.isLoggedIn) {
      alert('잘못된 접근입니다.');
      return;
    }
    if (!name) {
      alert('그룹명을 입력해 주세요.');
      return;
    }

    bgColor = bgColor ?? ColorUtil.randomColor();
    const color = ColorUtil.isDark(bgColor) ? '#ffffff' : '#333333';

    await axios.post('/diary/calendar', { name, bgColor, color });
    await flowResult(calendarStore.syncUserCalendar());
    await flowResult(calendarStore.syncCalendar());

    reset();
    setShowGroupAdd(false);
  }, [rootStore.isLoggedIn]);

  const onToggleTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    localStorage.setItem(SHOW_TODO_YN, checked ? 'Y' : 'N');
    calendarStore.setShowTodo(checked);
  }, []);

  const userCalendarsRender = useMemo(
    () =>
      userCalendars.map(({ calendarId, name, bgColor }) => (
        <CheckBoxWrap bgColor={bgColor} key={`calendar-wrap-${calendarId}`}>
          <input
            ref={setRefs}
            type="checkbox"
            id={calendarId}
            value={calendarId}
            checked={selects.includes(calendarId)}
            onChange={onToggle}
          />
          <label htmlFor={calendarId}>{name}</label>
        </CheckBoxWrap>
      )),
    [userCalendars, selects],
  );

  const commonCalendarsRender = useMemo(
    () =>
      commonCalendars.map(({ calendarId, name, color, bgColor }) => (
        <CheckBoxWrap color={color} bgColor={bgColor} key={`calendar-wrap-${calendarId}`}>
          <input
            ref={setRefs}
            type="checkbox"
            id={calendarId}
            value={calendarId}
            checked={selects.includes(calendarId)}
            onChange={onToggle}
          />
          <label htmlFor={calendarId}>{name}</label>
        </CheckBoxWrap>
      )),
    [commonCalendars, selects],
  );
  return (
    <CalendarBox>
      <p onClick={onAllClick}>전체일정</p>
      <div>
        <FoldingWrap>
          <FoldingCheckbox type="checkbox" id="commonCalendar" onChange={onChangeFolding} />
          <FoldingHelper>
            <label htmlFor="commonCalendar">
              <FaChevronDown />
              건설업무일정
            </label>
          </FoldingHelper>
          <CalendarListWrap>{commonCalendarsRender}</CalendarListWrap>
        </FoldingWrap>
        {rootStore.isLoggedIn && (
          <>
            <FoldingWrap>
              <FoldingCheckbox type="checkbox" id="userCalendar" onChange={onChangeFolding} />
              <FoldingHelper>
                <label htmlFor="userCalendar">
                  <FaChevronDown />
                  그룹일정
                </label>
                <GraoupAddWrap onClick={onOpenModalClick}>
                  <FaPlus size={14} />
                  <span>그룹추가</span>
                </GraoupAddWrap>
              </FoldingHelper>
              <CalendarListWrap>
                <CheckBoxWrap bgColor={TODO_BG_COLOR}>
                  <input
                    ref={setRefs}
                    type="checkbox"
                    id={'user-todo'}
                    checked={calendarStore.isShowTodo}
                    onChange={onToggleTodo}
                  />
                  <label htmlFor={'user-todo'}>할 일</label>
                </CheckBoxWrap>
                {userCalendarsRender}
              </CalendarListWrap>
            </FoldingWrap>
            <GroupAddModal elementId={'group-add'} isShow={isShowGroupAdd}>
              <header>
                <span>신규 그룹 생성</span>
                <IoCalendarOutline size={20} color={'#9f9f9f'} />
              </header>
              <article>
                <div>
                  <span>그룹명</span>
                  <input type="text" name="name" ref={register} />
                  <input type="hidden" name="bgColor" ref={register} />
                </div>
                <div>
                  <span>배경색</span>
                  <CirclePicker
                    circleSize={21}
                    circleSpacing={8}
                    colors={['#f44336', '#e91e63', '#495057', '#673ab7', '#3f51b5', '#2196f3', '#099268']}
                    color={color}
                    onChange={(color) => {
                      setValue('bgColor', color.hex);
                    }}
                  />
                </div>
              </article>
              <footer>
                <button type="button" onClick={onCloseModalClick}>
                  취소
                </button>
                <button type="button" onClick={onSaveCalendarClick}>
                  생성
                </button>
              </footer>
            </GroupAddModal>
          </>
        )}
      </div>
    </CalendarBox>
  );
};

export default observer(CalendarNav);
