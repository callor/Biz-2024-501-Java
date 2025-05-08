import styled from "@emotion/styled";
import React, { useCallback, useEffect, useMemo } from "react";
import MainLayout from "@components/layout/main";
import News from "@components/main/news";
import { GetServerSideProps } from "next";
import { serverAxios } from "@utils/network.util";
import GridTable from "@components/main/grid";
import calendarStore from "@stores/calendar";
import { DateUtil } from "@utils/date.util";
import { observer } from "mobx-react";
import EventTable from "@components/calendar/EventTable";

//#region styled
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > button {
      width: 44px;
      height: 24px;
      border: 1px solid #dbdbdb;
      border-radius: 2px;
      font-size: 14px;
      font-weight: 500;
      color: #252525;
      + div {
        display: inline-block;
        padding: 0 20px;
        > span {
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          color: #252525;
          padding: 0 20px;
          cursor: pointer;
        }
        > button {
          width: 24px;
          height: 24px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          text-indent: -9999px;

          &:nth-of-type(1) {
            background-image: url("/images/btn/btn_calandar_prev_main.png");
          }
          &:nth-of-type(2) {
            background-image: url("/images/btn/btn_calandar_next_main.png");
          }
        }
      }
    }
    + div > p {
      font-size: 13px;
      color: #999999;
      padding-left: 19px;
      background: url("/images/ico/ico_i.png") left center no-repeat;
      > a {
        display: inline-block;
        color: #00c73c;
        padding-right: 10px;
        background: url("/images/ico/ico_tip_green.png") right center no-repeat;
      }
    }
  }
`;

const MainCalendar = styled.div`
  height: 100%;
  form,
  fieldset {
    height: 100%;
  }
  > div {
    position: relative;
    width: 100%;
    table-layout: fixed;
  }
`;

const WeekRow = styled.table`
  position: relative;
  width: 100%;
  table-layout: fixed;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    display: block;
    width: calc(100% - 30px);
    border-top: 1px solid #454545;
    z-index: 2;
  }
  tr {
    height: 30px;
    text-align: center;
    background-color: #fafafa;

    th {
      width: 28px;
      border-right: 1px solid #dbdbdb;
      border-top: 1px solid #454545;
      box-sizing: border-box;
    }
    td {
      width: calc(100% / 7);
      border-right: 1px solid #dbdbdb;
      font-size: 14px;
      font-weight: 500;
      color: #252525;
      box-sizing: border-box;

      &:nth-of-type(1) {
        color: #f52b2b;
      }
      &:nth-of-type(7) {
        color: #2263e8;
        border-right: none;
      }
    }
  }
`;

const MonthTable = styled.div`
  position: relative;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MonthRow = styled.div`
  position: relative;
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
  flex: 1;
  &:last-of-type {
    border-bottom: 1px solid #eee;
  }

  table {
    position: relative;
    width: 100%;
    height: 100%;
    table-layout: fixed;
    tr {
      &:last-of-type {
        height: 100%;
        text-align: right;
        > td {
          vertical-align: bottom;
        }
      }
      th {
        width: 28px;
        background-color: #fafafa;
        box-sizing: border-box;
        cursor: pointer;
        a {
          display: block;
        }
      }

      td {
        position: relative;
        width: 14.285%;

        strong {
          position: relative;
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          color: #252525;
          vertical-align: middle;
        }

        &.today strong {
          color: #fff !important;
          &:after {
            position: absolute;
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            content: "";
            display: block;
            width: 22px;
            height: 22px;
            background-color: #177efb;
            border-radius: 50%;
            z-index: -1;
          }
        }
      }
    }
  }
`;

const DateTd = styled.td<{ isDisable?: boolean; isHoliday?: boolean }>`
  padding-left: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  ${(props) => props.isDisable && "opacity: 0.5;"}
  > strong {
    ${(props) => props.isHoliday && "color: #f52b2b !important;"}
  }
`;
const SpecialDaySpan = styled.span<{ isHoliday?: boolean }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: ${(props) => (props.isHoliday ? "#f52b2b" : "#252525")};
  vertical-align: middle;
  margin-left: 3px;
  line-height: initial;
  &:after {
    content: " ∙ ";
  }
`;
const DateTr = styled.tr`
  height: 22%;
  box-sizing: border-box;

  ${DateTd} {
    padding-left: 14px;

    ${SpecialDaySpan}:last-child:after {
      display: "none";
      content: "";
    }
    &:nth-of-type(1) {
      > strong {
        color: #f52b2b;
      }
    }
    &:nth-of-type(7) {
      > strong {
        color: #2263e8;
      }
      border-right: none;
    }
  }
`;

//#endregion

const MainPage = ({ news }: MainPageProps) => {
  const date = calendarStore.date;
  const dateStr = useMemo(() => DateUtil.format(date, "yyyy.MM"), [date]);
  const weekList = useMemo(() => DateUtil.getCalendar(date), [date]);
  const holidayMap = useMemo(() => calendarStore.holidayMap, [
    calendarStore.holidayMap,
  ]);

  const onTodayClick = useCallback(() => {
    calendarStore.setDate(new Date());
  }, []);

  const onMonthAddClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const add = Number(e.currentTarget.dataset.add);
      calendarStore.setDate(DateUtil.addMonth(date, add));
    },
    [date]
  );

  useEffect(() => {
    console.log("sync....");
    calendarStore.syncHolidays();
    calendarStore.syncCalendar();
  }, []);

  return (
    <MainLayout
      title={
        <CalendarHeader>
          <div>
            <button type="button" onClick={onTodayClick}>
              오늘
            </button>
            <div>
              <button data-add={-1} onClick={onMonthAddClick}>
                prev
              </button>
              <span>{dateStr}</span>
              <button data-add={1} onClick={onMonthAddClick}>
                next
              </button>
            </div>
          </div>
          <div>
            <p>
              필독하면 좋은 <a href="#!">이달의 업무팁</a>
            </p>
          </div>
          <News news={news} />
        </CalendarHeader>
      }
    >
      <MainCalendar>
        <div>
          <WeekRow>
            <tbody>
              <tr>
                <th></th>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>
            </tbody>
          </WeekRow>
        </div>
        <MonthTable>
          <GridTable date={calendarStore.date} />
          {weekList.map((week, idx) => (
            <MonthRow key={`calendar-week-${idx}`}>
              <table>
                <tbody>
                  <DateTr>
                    <th rowSpan={4}>&nbsp;</th>
                    {week.map(({ day, isEmpty, ymd }) => (
                      <DateTd
                        key={`date-${day}`}
                        isDisable={isEmpty}
                        isHoliday={holidayMap[ymd]?.some(
                          (holiday) => holiday.holidayYn === "Y"
                        )}
                      >
                        <strong>{day}</strong>
                        {holidayMap[ymd]?.map(({ name, holidayYn }, idx) => (
                          <SpecialDaySpan
                            isHoliday={holidayYn === "Y"}
                            title={name}
                            key={`special-day-${ymd}-${idx}`}
                          >
                            {name}
                          </SpecialDaySpan>
                        ))}
                      </DateTd>
                    ))}
                  </DateTr>
                  <EventTable week={week} />
                </tbody>
              </table>
            </MonthRow>
          ))}
        </MonthTable>
      </MainCalendar>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: news } = await serverAxios(ctx).get(
    "/crawling/news/koscaj?cnt=5"
  );
  return { props: { news } };
};
export default observer(MainPage);
type MainPageProps = { news: KoscajNewsItem[] };
