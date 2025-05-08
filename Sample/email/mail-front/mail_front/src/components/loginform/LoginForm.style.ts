import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * 로그인 컨테이너 styled-component
 */
export const Container = styled(Paper)({
  position: "fixed",
  top: "50%",
  right: "50%",
  transform: "Translate(50%, -50%)",
  width: "450px",
  height: "380px",
  display: "flex",
  // flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
});
