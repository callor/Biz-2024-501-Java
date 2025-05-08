import { useCalendarStore } from "@components/common/context/RootStore";
import styled from "@emotion/styled";
import { DateUtil } from "@utils/date.util";
import { flowResult } from "mobx";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

const MiniCalendarWrap = styled.div`
  height: 225px;
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
      color: ${({ theme }) => theme.colors.black};
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
  }
`;

const DayTd = styled.td<{ isEmpty: boolean; isHoliday: boolean }>`
  > a {
    opacity: ${(props) => (props.isEmpty ? "0.5" : "1")};
    ${(props) => props.isHoliday && "color:#f52b2b !important;"}
  }
  &:nth-of-type(1) {
    > a {
      color: #f52b2b;
    }
  }
  &:nth-of-type(7) {
    > a {
      color: #2263e8;
    }
  }
`;

const Day = styled.a<{ isEmpty: boolean }>`
  cursor: pointer;
  user-select: none;
  display: block;
  line-height: 26px;
  font-size: 12px;
  color: ${(props) => (props.isEmpty ? "rgba(0,0,0,0.3)" : "#666")};

  &:hover {
    color: #339af0;
  }
`;

const MiniCalendar = () => {
  const calendarStore = useCalendarStore();
  const [date, setDate] = useState(new Date());
  const dateStr = useMemo(() => DateUtil.format(date, "yyyy.MM"), [date]);

  useEffect(() => {
    calendarStore.syncHolidays(date.getFullYear());
  }, [date]);

  useEffect(() => {
    if (DateUtil.format(date, "yyyyMM") !== calendarStore.yyyymm) {
      setDate(DateUtil.ymdToDate(`${calendarStore.yyyymm}01`));
    }
  }, [calendarStore.yyyymm]);

  const addMonth = useCallback(
    async (num: number) => {
      setDate(DateUtil.addMonth(date, num));
    },
    [date]
  );
  const calendar = useMemo(() => DateUtil.getCalendar(date), [date]);

  const onDayClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const selectDate = DateUtil.ymdToDate(e.currentTarget.dataset.ymd);
      calendarStore.setDate(date);
      calendarStore.setMiniDate(selectDate);
    },
    [date]
  );

  const CalendarRender = useMemo(() => {
    const holidayMap = calendarStore.holidayMap;

    return calendar.map((week, idx) => (
      <tr key={`mini-calendar-week-${idx}`}>
        {week.map(({ day, isEmpty, ymd, value }) => (
          <DayTd
            isEmpty={isEmpty}
            isHoliday={holidayMap
              .get(value.getFullYear().toString())
              ?.get(ymd)
              ?.some((holiday) => holiday.holidayYn === "Y")}
            key={`mini-calendar-day-${day}`}
          >
            <Day isEmpty={isEmpty} data-ymd={ymd} onClick={onDayClick}>
              {day}
            </Day>
          </DayTd>
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
        <span>{dateStr}</span>
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
