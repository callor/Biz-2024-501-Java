import EventCreatePop from '@components/calendar/EventCreate';
import { useCalendarStore, useRootStore } from '@components/common/context/RootStore';
import MainLayout from '@components/layout/main';
import EventDetail from '@components/main/event/Detail';
import EventMorePopup from '@components/main/event/EventMorePopup';
import GridTable from '@components/main/grid';
import MainHeader from '@components/main/Header';
import styled from '@emotion/styled';
import EventCreateStore from '@stores/event-create.store';
import { DateUtil } from '@utils/date.util';
import { axios } from '@utils/network.util';
import { observer } from 'mobx-react-lite';
import React, { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';
//#region styled
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

const MonthTable = styled.div`
  position: relative;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const WeekRow = styled.table`
  position: relative;
  width: 100%;
  table-layout: fixed;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
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
      border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
      border-top: 1px solid #454545;
      box-sizing: border-box;
    }
    td {
      width: calc(100% / 7);
      border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black};
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

//#endregion

type Props = { children: ReactNode };
interface IEventProps {
  eventId: string;
  calendarId: string;
  eventDt: Date;
  type: 'EVENT';
}
interface ITodoProps {
  type: 'TODO';
  todoId: string;
}
type onDetailClick = (props: IEventProps | ITodoProps) => void;

const CalendarContext = createContext<{
  onMoreClick: (ymd: string) => void;
  onDetailClick: onDetailClick;
  onCreaetEventPopOpen: (date: string) => void;
}>(undefined);

const CalendarProvider = observer(({ children }: Props) => {
  const rootStore = useRootStore();
  const calendarStore = useCalendarStore();
  const onMoreClick = useCallback((ymd: string) => {
    calendarStore.setSelectYmd(ymd);
  }, []);

  const onCreaetEventPopOpen = useCallback(
    (date: string) => {
      if (rootStore.isLoggedIn && calendarStore.userCalendars.length > 0) {
        const calendarId = calendarStore.userCalendars[0]?.calendarId;
        calendarStore.setCreateStore(new EventCreateStore({ calendarId, startDt: date }));
      }
    },
    [rootStore.isLoggedIn, calendarStore.userCalendars],
  );

  const onDetailClick: onDetailClick = useCallback(async (props) => {
    if (props.type === 'EVENT') {
      const { calendarId, eventId, eventDt } = props;
      const { data } = await axios.get<EventDetail>(
        `/diary/calendar/${calendarId}/event/${eventId}?eventDt=${DateUtil.format(eventDt, 'yyyy-MM-dd')}`,
      );
      calendarStore.setDetail(data);
    } else {
      const { todoId } = props;
      const { data } = await axios.get<TodoDetail>(`/diary/todo/${todoId}`);
      calendarStore.setDetail(data);
    }
  }, []);

  useEffect(() => {
    if (rootStore.isLoggedIn) {
      calendarStore.syncTodo();
    }
  }, [calendarStore.yyyymm]);

  useEffect(() => {
    calendarStore.syncCalendar();
  }, [calendarStore.yyyymm, calendarStore.calendars]);

  return (
    <CalendarContext.Provider value={{ onMoreClick, onDetailClick, onCreaetEventPopOpen }}>
      <MainLayout title={<MainHeader />}>
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
            <GridTable />
            {children}
            <EventMorePopup />
            <EventDetail />
            {rootStore.isLoggedIn && <EventCreatePop />}
          </MonthTable>
        </MainCalendar>
      </MainLayout>
    </CalendarContext.Provider>
  );
});

export const useDetailClick = () => {
  const { onDetailClick } = useContext(CalendarContext);
  return onDetailClick;
};

export const useMoreClick = () => {
  const { onMoreClick } = useContext(CalendarContext);
  return onMoreClick;
};

export const useOpenCreatePopClick = () => {
  const { onCreaetEventPopOpen } = useContext(CalendarContext);
  return onCreaetEventPopOpen;
};
export default CalendarProvider;
