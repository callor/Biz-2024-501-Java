import styled from "@emotion/styled";
import calendarStore from "@stores/calendar";
import { observer } from "mobx-react";
import { useEffect, useMemo, useState } from "react";
const EventTr = styled.tr`
  height: auto;
`;

const EventTd = styled.td<{ color?: string; bgColor?: string }>`
  > span {
    display: flex;
    align-items: center;
    line-height: normal;
    font-size: 13px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.bgColor};
    border-radius: 10px;
    margin-bottom: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 4px 10px;
    box-sizing: border-box;
    cursor: pointer;
    @media screen and (max-width: 1280px) {
      padding: 3px 0;
      padding-left: 12px;
    }
  }
`;

const MoreScheduleButton = styled.button`
  display: inline-block;
  height: 20px;
  padding: 0 5px;
  font-size: 12px;
  color: #888e9c;
  background-color: #f5f6f8;
  border-radius: 2px;
  border: 1px solid #c3c6cd;
  box-sizing: border-box;
  margin: 0 5px 5px 0;
`;
const EventTable = ({
  week,
}: {
  week: {
    day: string;
    isEmpty: boolean;
    value: Date;
    ymd: string;
  }[];
}) => {
  let totalCol1 = 0;
  let totalCol2 = 0;

  const calendar = useMemo(() => ({ ...calendarStore.calendar }), [
    calendarStore.calendar,
  ]);

  if (Object.keys(calendar).length === 0) {
    return <tr></tr>;
  } else {
    return (
      <>
        <EventTr>
          {week.map(({ day, ymd }) => {
            const colSpan = calendar[ymd]?.[0]?.colSpan ?? 1;
            totalCol1 += colSpan;
            if (totalCol1 > 7) {
              return undefined;
            } else {
              const { name, calendarId } = calendar[ymd]?.shift() ?? {};
              const { color, bgColor } =
                calendarStore.getCalendarData(calendarId) ?? {};
              return (
                <EventTd
                  key={`event-0-td-${day}`}
                  colSpan={colSpan}
                  color={color}
                  bgColor={bgColor}
                >
                  {name ? <span>{name}</span> : " "}
                </EventTd>
              );
            }
          })}
        </EventTr>
        <EventTr>
          {week.map(({ day, ymd }) => {
            const colSpan = calendar[ymd]?.[0]?.colSpan ?? 1;
            totalCol2 += colSpan;
            if (totalCol2 > 7) {
              return undefined;
            } else {
              const { name, calendarId } = calendar[ymd]?.shift() ?? {};
              const { color, bgColor } =
                calendarStore.getCalendarData(calendarId) ?? {};
              return (
                <EventTd
                  key={`event-1-td-${day}`}
                  colSpan={colSpan}
                  color={color}
                  bgColor={bgColor}
                >
                  {name ? <span>{name}</span> : " "}
                </EventTd>
              );
            }
          })}
        </EventTr>
        <EventTr>
          {week.map(({ day, ymd }) => {
            const len = calendar[ymd]?.length;
            return (
              <EventTd key={`event-more-td-${day}`}>
                {len > 0 && (
                  <MoreScheduleButton>{len}개 더보기</MoreScheduleButton>
                )}
              </EventTd>
            );
          })}
        </EventTr>
      </>
    );
  }
};

export default observer(EventTable);
