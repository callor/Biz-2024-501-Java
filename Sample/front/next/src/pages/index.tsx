import DateContents from '@components/calendar/DateContents';
import DateTr from '@components/calendar/DateTr';
import EventTable from '@components/calendar/EventTable';
import MonthRow from '@components/calendar/MonthRow';
import CalendarProvider from '@components/common/context/CalendarContext';
import { useCalendarStore } from '@components/common/context/RootStore';
import MoreIcons from '@components/icon/MoreIcon';
import { DateUtil } from '@utils/date.util';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';

const MainPage = () => {
  const router = useRouter();
  const calendarStore = useCalendarStore();
  const date = useMemo(() => calendarStore.date, [calendarStore.date]);
  const weekList = useMemo(() => DateUtil.getCalendar(date), [calendarStore.yyyymm]);

  const onWeekViewClick = useCallback((e: React.MouseEvent<HTMLTableDataCellElement>) => {
    router.push(`/week?ymd=${e.currentTarget.dataset.ymd}`);
  }, []);

  useEffect(() => {
    return () => {
      calendarStore.setSelectYmd(undefined);
      calendarStore.setDetail(undefined);
    };
  }, []);

  // WeekList 가 변경될 경우에만 렌더링 된다.
  const renderCalendar = useMemo(() => {
    return weekList.map((week, idx) => (
      <MonthRow key={`calendar-week-${idx}`}>
        <table>
          <tbody>
            <DateTr>
              <th rowSpan={4} data-ymd={week[0].ymd} onClick={onWeekViewClick}>
                <MoreIcons />
              </th>
              {week.map((props) => (
                <DateContents key={`date-${props.day}`} {...props} />
              ))}
            </DateTr>
            <EventTable week={week} />
          </tbody>
        </table>
      </MonthRow>
    ));
  }, [weekList]);

  return <CalendarProvider>{renderCalendar}</CalendarProvider>;
};

export default observer(MainPage);
