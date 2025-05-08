import { useDetailClick } from '@components/common/context/CalendarContext';
import { useCalendarStore } from '@components/common/context/RootStore';
import MyPagePopup from '@components/mypage/popup';
import styled from '@emotion/styled';
import { DateUtil } from '@utils/date.util';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo } from 'react';

const PopupWrap = styled.div`
  height: 338px;
  overflow-y: auto;
  li {
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    cursor: pointer;
    p {
      &:nth-of-type(1) {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
      }
      &:nth-of-type(2) {
        font-size: 13px;
        color: #999999;
        margin: 10px 0 14px;
      }
      &:nth-of-type(3) {
        font-size: 15px;
        color: #454545;
        line-height: 1.333;
      }
    }
  }
`;

const EventMorePopup = observer(() => {
  const calendarStore = useCalendarStore();
  const onDetailClick = useDetailClick();
  const events = useMemo(() => calendarStore.calendar[calendarStore.selectYmd] ?? [], [
    calendarStore.selectYmd,
    calendarStore.calendar,
  ]);

  const onMoreClose = useCallback(() => {
    calendarStore.setSelectYmd(undefined);
  }, []);

  return (
    <MyPagePopup
      title={
        calendarStore.selectYmd
          ? `${DateUtil.format(DateUtil.ymdToDate(calendarStore.selectYmd), 'MM월 d일 일정 상세')}`
          : ''
      }
      show={calendarStore.selectYmd !== undefined}
      onClose={onMoreClose}
    >
      <PopupWrap>
        <ul>
          {events.map(({ name, startDt, endDt, note, colSpan, type, ...event }, idx) => (
            <li
              key={`more-pop-event-${idx}`}
              onClick={() => {
                if (type === 'EVENT') {
                  const { calendarId, eventId } = event as ICalendarEvent;
                  onDetailClick({
                    type,
                    calendarId,
                    eventId,
                    eventDt: startDt,
                  });
                } else {
                  const { todoId } = event as ICalendarTodo;
                  onDetailClick({ todoId, type });
                }
              }}
            >
              <p>{name}</p>
              <p>
                {DateUtil.format(startDt, 'yyyy.MM.dd(iii)')}
                {colSpan > 1 && `에서 ${DateUtil.format(endDt, 'yyyy.MM.dd(iii)')} 까지`}
              </p>
              <p>{note}</p>
            </li>
          ))}
        </ul>
      </PopupWrap>
    </MyPagePopup>
  );
});

export default EventMorePopup;
