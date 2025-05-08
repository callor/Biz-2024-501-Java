import DateContents from '@components/calendar/DateContents';
import DateTr from '@components/calendar/DateTr';
import EventTable from '@components/calendar/EventTable';
import MonthRow from '@components/calendar/MonthRow';
import CalendarProvider from '@components/common/context/CalendarContext';
import { useCalendarStore } from '@components/common/context/RootStore';
import MoreIcons from '@components/icon/MoreIcon';
import styled from '@emotion/styled';
import { DateUtil } from '@utils/date.util';
import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const MainCalendar = styled.div`
  height: 100%;
  > div {
    height: 100%;
  }
`;

const WeekCalendarPage = ({ ymd }: MainPageProps) => {
  const [drawSize, setDrawSize] = useState(0);
  const calendarStore = useCalendarStore();
  const date = useMemo(() => calendarStore.date, [calendarStore.date]);
  const mainDomRef = useRef<HTMLDivElement>();

  const weekList = useMemo(() => DateUtil.getWeekDates(DateUtil.ymdToDate(ymd), date), [ymd]);

  useEffect(() => {
    const handleMainResize = () => {
      const { height } = mainDomRef.current.getBoundingClientRect();
      const size = Math.floor(height / 30) - 2;
      setDrawSize(size);
    };
    window.addEventListener('resize', handleMainResize);
    handleMainResize();
    return () => {
      window.removeEventListener('resize', handleMainResize);
    };
  }, [mainDomRef]);

  useEffect(() => {
    return () => {
      calendarStore.setSelectYmd(undefined);
      calendarStore.setDetail(undefined);
    };
  }, []);

  useEffect(() => {
    const weekDate = DateUtil.ymdToDate(ymd);
    const diffMonth = DateUtil.diffMonth(date, weekDate);
    if (diffMonth !== 0) {
      calendarStore.setDate(weekDate);
    }
  }, [ymd, date]);

  return (
    <CalendarProvider>
      <MainCalendar ref={mainDomRef}>
        <MonthRow>
          <table>
            <tbody>
              <DateTr>
                <Link href="/" replace>
                  <th rowSpan={drawSize + 2}>
                    <MoreIcons />
                  </th>
                </Link>
                {weekList.map((props) => (
                  <DateContents key={`date-${props.day}`} {...props} />
                ))}
              </DateTr>
              <EventTable drawSize={drawSize} week={weekList} />
            </tbody>
          </table>
        </MonthRow>
      </MainCalendar>
    </CalendarProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query.ymd) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }
  return { props: { ymd: ctx.query.ymd as string } };
};
export default observer(WeekCalendarPage);

type MainPageProps = { news: KoscajNewsItem[]; ymd: string };
