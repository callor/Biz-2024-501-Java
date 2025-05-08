import { styled } from "@mui/material/styles";
import theme from "../../styles/theme";

/**
 * 페이지네이션 컨테이너
 */
export const Container = styled("div")`
  /* min-width: 1200px; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * 페이지네이션 공통 버튼
 */
export const Button = styled("button")<{ w?: number; mx?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: ${({ w }) => (w ? `${w}px` : "34px")};
  margin-left: ${({ mx }) => (mx ? `${mx}px` : "3px")};
  margin-right: ${({ mx }) => (mx ? `${mx}px` : "3px")};
  border: 1px solid ${theme.border};
  background-color: ${theme.white};
  color: ${theme.indigo};
  &.index {
    :hover,
    &.on {
      background-color: ${theme.indigo};
      color: ${theme.white};
      cursor: pointer;
    }
  }
  &.arrow {
    &.on {
      :hover {
        background-color: ${theme.indigo};
        color: ${theme.white};
        cursor: pointer;
      }
    }
    &.disabled {
      background-color: ${theme.grey.default};
      color: ${theme.grey.deep};
    }
  }
`;
