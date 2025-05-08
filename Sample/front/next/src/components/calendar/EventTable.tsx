import { useDetailClick, useMoreClick, useOpenCreatePopClick } from '@components/common/context/CalendarContext';
import { useCalendarStore } from '@components/common/context/RootStore';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TODO_BG_COLOR, TODO_COLOR } from '@utils/contants';
import { DateUtil } from '@utils/date.util';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoFileTrayFullOutline } from 'react-icons/io5';

//#region styled
const EventTr = styled.tr`
  &:last-of-type {
    height: 100%;
  }
`;
const TodoEndCss = css`
  &:before {
    content: ' ';
    width: calc(100% - 50px);
    left: 30px;
    height: 1px;
    background-color: #fff;
    position: absolute;
    top: 50%;
  }
  & {
    opacity: 0.5;
  }
`;

const EventTd = styled.td<{ color?: string; bgColor?: string; type?: 'EVENT' | 'TODO'; endYn?: YN }>`
  overflow: hidden;
  > span {
    width: 100%;
    display: inline-block;
    /* align-items: center; */
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
    position: relative;
    @media screen and (max-width: 1280px) {
      padding: 3px 0;
      padding-left: 12px;
    }
    display: flex;
    align-items: center;

    > svg {
      margin-right: 5px;
    }
    ${(props) => (props.type === 'TODO' && props.endYn === 'Y' ? TodoEndCss : '')}
  }
`;
/* text-decoration: ${props => props.type === 'TODO' && props.endYn ==='Y'  : 'none' }; */

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

const NonText = styled.i`
  width: 0px;
  height: 0;
  font-size: 0;
  line-height: 0;
  display: block;
`;
//#endregion

const EventTable = ({
  week,
  drawSize = 2,
}: {
  week: {
    day: string;
    isEmpty: boolean;
    value: Date;
    ymd: string;
  }[];
  drawSize?: number;
}) => {
  const onMoreClick = useMoreClick();
  const onDetailClick = useDetailClick();
  const onEventCreateClick = useOpenCreatePopClick();
  const calendarStore = useCalendarStore();
  const drawArr: null[] = useMemo(() => Array.apply([], { length: drawSize }), [drawSize]);
  let totalCol = 0;

  const calendar: CalendarType = useMemo(() => {
    const copy = {};
    Object.keys(calendarStore.calendar).forEach((ymd) => {
      copy[ymd] = calendarStore.calendar[ymd].map((item) => toJS(item));
    });
    return copy;
  }, [drawArr, calendarStore.calendar]);

  const onMoreButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onMoreClick(e.currentTarget.dataset.ymd);
    },
    [onMoreClick],
  );

  const onClick = useCallback((e: React.MouseEvent<HTMLTableDataCellElement>) => {
    const tagName = e.currentTarget.children.item(0)?.tagName;
    if (tagName === undefined || tagName === 'I' || tagName === 'BUTTON') {
      const startDt = e.currentTarget.dataset.startDt?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      onEventCreateClick(startDt);
    }
  }, []);

  if (Object.keys(calendar).length === 0) {
    return (
      <>
        {drawArr.map((_, idx) => (
          <EventTr key={`not-render-${idx}`}>
            {week.map(({ ymd }) => (
              <td key={`date-none-${ymd}`} onClick={onClick}>
                &nbsp;
              </td>
            ))}
          </EventTr>
        ))}
      </>
    );
  } else {
    return (
      <>
        {drawArr.map((_, drrIdx) => (
          <EventTr key={`event-key-tr-${drrIdx}`}>
            {week.map(({ day }, idx) => {
              if (idx === 0) {
                totalCol = 0;
              }
              const ymd = DateUtil.format(DateUtil.addDay(week[0].value, totalCol), 'yyyyMMdd');

              const colSpan = calendar[ymd]?.[0]?.colSpan ?? 1;
              totalCol += colSpan;
              if (totalCol > 7) {
                return undefined;
              } else {
                const event = calendar[ymd]?.shift() ?? ({} as ICalendarEvent | ICalendarTodo);
                const { name, startDt, type } = event;

                const { color, bgColor } =
                  type === 'EVENT'
                    ? calendarStore.getCalendarData((event as ICalendarEvent).calendarId)
                    : { color: TODO_COLOR, bgColor: TODO_BG_COLOR };
                return (
                  <EventTd
                    key={`event-0-td-${day}`}
                    colSpan={colSpan}
                    color={color}
                    bgColor={bgColor}
                    data-start-dt={ymd}
                    onClick={onClick}
                    endYn={event['endYn']}
                    type={event.type}
                  >
                    {name ? (
                      <span
                        title={name}
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
                        {event['files']?.length > 0 && (
                          <IoFileTrayFullOutline size={16} color={color} style={{ flex: '0 0 16px' }} />
                        )}
                        {event['todoId'] && (
                          <IoMdCheckmarkCircleOutline size={16} color={color} style={{ flex: '0 0 16px' }} />
                        )}
                        {name}
                      </span>
                    ) : (
                      <NonText>X</NonText>
                    )}
                  </EventTd>
                );
              }
            })}
          </EventTr>
        ))}
        <EventTr>
          {week.map(({ day, ymd }) => {
            const len = calendar[ymd]?.length;
            return (
              <EventTd key={`event-more-td-${day}`} data-start-dt={ymd} onClick={onClick}>
                {len > 0 && (
                  <MoreScheduleButton data-ymd={ymd} onClick={onMoreButtonClick}>
                    {len}개 더보기
                  </MoreScheduleButton>
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
