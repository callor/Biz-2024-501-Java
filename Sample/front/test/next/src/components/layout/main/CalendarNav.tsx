import styled from "@emotion/styled";
import calendarStore from "@stores/calendar";
import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const CalendarBox = styled.div`
  > p {
    display: block;
    padding: 19px 0;
    font-size: 17px;
    font-weight: 500;
    color: #252525;
    text-align: center;
    cursor: pointer;
  }
`;

const CheckBoxWrap = styled.div<{ color: string; bgColor: string }>`
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
        content: "";
        display: block;
        width: 18px;
        height: 18px;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 2px;

        color: ${(props) =>
          props.color.includes("#") ? props.color : `#${props.color}`};
        background-color: ${(props) =>
          props.bgColor.includes("#") ? props.bgColor : `#${props.bgColor}`};
      }
    }
    &:checked + label:after {
      background-image: url("/images/btn/btn_checkbox_white.png");
    }
  }
`;
const CalendarListWrap = styled.div`
  border-top: 1px solid #eeeeee;
  padding-top: 19px;

  > ${CheckBoxWrap} + ${CheckBoxWrap} {
    margin-top: 12px;
  }
`;

const CalendarNav = () => {
  const calendars = useMemo(() => calendarStore.calendars, [
    calendarStore.calendars,
  ]);

  const selectIds = useMemo(() => calendarStore.selectIds, [
    calendarStore.selectIds,
  ]);

  const onToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;

      if (checked) {
        calendarStore.setSelctes([...selectIds, value]);
      } else {
        calendarStore.setSelctes(selectIds.filter((id) => id !== value));
      }
    },
    [selectIds]
  );

  return (
    <CalendarBox>
      <p>전체일정</p>
      <CalendarListWrap>
        {calendars.map(({ calendarId, name, color, bgColor }) => (
          <CheckBoxWrap
            color={color}
            bgColor={bgColor}
            key={`calendar-wrap-${calendarId}`}
          >
            <input
              type="checkbox"
              id={calendarId}
              value={calendarId}
              checked={selectIds.includes(calendarId)}
              onChange={onToggle}
            />
            <label htmlFor={calendarId}>{name}</label>
          </CheckBoxWrap>
        ))}
      </CalendarListWrap>
    </CalendarBox>
  );
};

export default observer(CalendarNav);
