import { styled } from "@mui/material/styles";

export const CalendarWrapper = styled("div")<{ width: string }>`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => width};
  max-width: 550px;
  padding: 0 10px;
`;

export const MacroButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "10px",
  ".light": {
    margin: "0 10px",
  },
});
