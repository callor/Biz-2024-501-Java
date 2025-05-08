import styled from "@emotion/styled";

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
        strong {
          width: 18px;
          text-align: center;
          position: relative;
          display: inline-block;
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme.colors.black};
          vertical-align: middle;
        }
      }
    }
  }
`;

export default MonthRow;
