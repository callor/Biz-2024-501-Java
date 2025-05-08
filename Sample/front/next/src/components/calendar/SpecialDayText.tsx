import styled from "@emotion/styled";

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

export default SpecialDayText;
