import { useCalendarStore } from "@components/common/context/RootStore";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DateUtil } from "@utils/date.util";
import { observer } from "mobx-react-lite";

type DateTdProps = {
  isDisable?: boolean;
  isHoliday?: boolean;
  isToday?: boolean;
  isMini?: boolean;
};

const SpecialDayText = styled.span<{ isHoliday?: boolean }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: ${(props) => (props.isHoliday ? "#f52b2b" : "#252525")};
  vertical-align: middle;
  margin-left: 5px;
  line-height: initial;
  &:after {
    content: " ∙ ";
  }
`;

const todayCss = css`
  & {
    color: #ffffff !important;

    &:after {
      position: absolute;
      top: -4px;
      left: 9px;
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
`;

const miniCss = css`
  & {
    color: #177efb !important;
    &:after {
      display: none;
    }
  }
`;
const DateTd = styled.td<DateTdProps>`
  padding-left: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding-left: 8px;
  ${(props) => props.isDisable && "opacity: 0.5;"}
  > strong {
    ${(props) => props.isHoliday && "color: #f52b2b !important;"}
    ${(props) => props.isToday && todayCss};
    ${(props) => props.isMini && miniCss};
  }

  ${SpecialDayText}:last-child:after {
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
`;

interface IProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  day: string;
  isEmpty: boolean;
  value: Date;
  ymd: string;
}

const DateContents = observer(
  ({ day, isEmpty, value, ymd, ...props }: IProps) => {
    const calendarStore = useCalendarStore();
    const holidayMap = calendarStore.holidayMap;
    return (
      <DateTd
        {...props}
        isDisable={isEmpty}
        isHoliday={holidayMap
          .get(value.getFullYear().toString())
          ?.get(ymd)
          ?.some((holiday) => holiday.holidayYn === "Y")}
        isToday={DateUtil.diffDay(value, new Date()) === 0}
        isMini={DateUtil.diffDay(value, calendarStore.miniDate) === 0}
      >
        <strong>{day}</strong>
        {holidayMap
          .get(value.getFullYear().toString())
          ?.get(ymd)
          ?.map(({ name, holidayYn }, idx) => (
            <SpecialDayText
              isHoliday={holidayYn === "Y"}
              title={name}
              key={`special-day-${ymd}-${idx}`}
            >
              {name}
            </SpecialDayText>
          ))}
      </DateTd>
    );
  }
);
export default DateContents;
