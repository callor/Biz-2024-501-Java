import styled from "@emotion/styled";
import { DateUtil } from "@utils/date.util";
import { useMemo } from "react";

const GridTableWrap = styled.table`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  table-layout: fixed;

  th {
    width: 28px;
    background: #fafafa;
    box-sizing: border-box;
    border-right: 1px solid #dbdbdb;
    border-bottom: 1px solid #eee;
  }
  td {
    width: calc(100% / 7);
    border-right: 1px solid #dbdbdb;
    &:last-child {
      border-right: none;
    }
  }
`;
const GridTable = ({ date = new Date() }) => {
  const weekRow = useMemo(() => {
    const totalRow = DateUtil.getWeekOfMonth(DateUtil.getLastMonthDay(date));
    const result: number[] = [];
    for (let i = 0; i < totalRow; i++) {
      result.push(i);
    }
    return result;
  }, [date]);
  return (
    <GridTableWrap>
      <tbody>
        {weekRow.map((_, idx) => (
          <tr key={`grid-table-row-${idx}`}>
            <th>&nbsp;</th>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        ))}
      </tbody>
    </GridTableWrap>
  );
};

export default GridTable;
