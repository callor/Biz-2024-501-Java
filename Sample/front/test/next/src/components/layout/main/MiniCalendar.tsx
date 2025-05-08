import styled from "@emotion/styled";
import calendarStore from "@stores/calendar";
import { DateUtil } from "@utils/date.util";
import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const MiniCalendarWrap = styled.div`
  > div {
    position: relative;
    user-select: none;
    > button {
      text-indent: -9999px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 10px;

      &.prev {
        background: url(/images/btn/btn_calandar_prev.png) no-repeat center;
        left: 10px;
      }
      &.next {
        background: url(/images/btn/btn_calandar_next.png) no-repeat center;
        right: 10px;
      }
    }
    > span {
      display: block;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: #252525;
    }
  }
  > table {
    margin: 20px 0;
    text-align: center;
    th {
      line-height: 26px;
      font-size: 10px;
      color: #999;
      user-select: none;
    }
    /* td a {
      display: block;
      line-height: 26px;
      font-size: 12px;
      color: #666;
      cursor: pointer;
      &:hover {
        background-color: #6a8192;
        color: #fff;
        border-radius: 50%;
      }
    } */
  }
`;

const Day = styled.a<{ isEmpty: boolean }>`
  user-select: none;
  display: block;
  line-height: 26px;
  font-size: 12px;
  color: ${(props) => (props.isEmpty ? "rgba(0,0,0,0.3)" : "#666")};

  &:hover {
    color: ${(props) => (props.isEmpty ? "rgba(0,0,0,0.3)" : "#666")};
  }
`;

const MiniCalendar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(calendarStore.date);
  }, [calendarStore.date]);

  const addMonth = useCallback(
    (num: number) => {
      setDate(DateUtil.addMonth(date, num));
    },
    [date]
  );
  const calendar = useMemo(() => DateUtil.getCalendar(date), [date]);

  const CalendarRender = useMemo(() => {
    return calendar.map((week, idx) => (
      <tr key={`mini-calendar-week-${idx}`}>
        {week.map((day) => (
          <td key={`mini-calendar-day-${day.day}`}>
            <Day isEmpty={day.isEmpty}>{day.day}</Day>
          </td>
        ))}
      </tr>
    ));
  }, [calendar]);

  return (
    <MiniCalendarWrap>
      <div>
        <button
          className="prev"
          onClick={() => {
            addMonth(-1);
          }}
        >
          prev
        </button>
        <span>{DateUtil.format(date, "yyyy.MM")}</span>
        <button
          className="next"
          onClick={() => {
            addMonth(1);
          }}
        >
          next
        </button>
      </div>
      <table>
        <colgroup>
          <col width="26px" />
          <col width="26px" />
          <col width="26px" />
          <col width="26px" />
          <col width="26px" />
          <col width="26px" />
          <col width="26px" />
        </colgroup>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>{CalendarRender}</tbody>
      </table>
    </MiniCalendarWrap>
  );
};

export default observer(MiniCalendar);
