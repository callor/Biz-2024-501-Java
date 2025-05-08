import styled from "@emotion/styled";
import { ALRM_TYPE } from "@utils/contants";

const getBackgroudImage = (type: ALRM_TYPE): string => {
  switch (type) {
    case "NEW_EVENT":
      return "/images/ico/ico_alarm_type01.png";
    case "INVITE_CALENDAR":
      return "/images/ico/ico_alarm_type02.png";
    case "LEAVE_GROUP":
      return "/images/ico/ico_alarm_type03.png";
    case "EVENT_ALRM":
      return "/images/ico/ico_alarm_type04.png";
  }
};

const IconWrap = styled.div<{ type: ALRM_TYPE }>`
  width: 35px;
  text-align: right;
  > span {
    display: inline-block;
    width: 15px;
    height: 17px;
    margin-top: 4px;
    vertical-align: top;
    background-position: center top;
    background-repeat: no-repeat;
    background-image: url("${({ type }) => getBackgroudImage(type)}");
  }
`;

const AlrmIcon = ({ type }: { type: ALRM_TYPE }) => {
  return (
    <IconWrap type={type}>
      <span />
    </IconWrap>
  );
};

export default AlrmIcon;
