import { createTheme, css, keyframes } from "@mui/material/styles";
// import { Noto_Sans_KR } from "@next/font/google";
// import localFont from "@next/font/local";

const BootstrapButton = {
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
};

// 프로젝트 테마
const palette = {
  // 빨,주,노,초,파,남,보
  black: "#000000",
  white: "#ffffff",
  red: "#f44336",
  orange: "#e65100",
  yellow: "#fdd835",
  green: "#1b5e20",
  pink: "#f96593",
  blue: "#0d47a1",
  indigo: "#092041",
  purple: "#9c27b0",
  grey: {
    default: "#cecece",
    deep: "#696969",
    dark: "#6a6a6a",
    light: "#f9f9f9",
  },
  pastel: {
    red: "#ff5252",
    salgu: "#FFAEA5",
    orange: "#ffd180",
    beige: "#fdf097",
    yellow: "#ffff8d",
    chartreuse: "#bbf3c0",
    green: "#69f0a2",
    bluegreen: "#aee8dc",
    cyan: "#ABBFFF",
    blue: "#4678d3",
    indigo: "#536dfe",
    purple: "#e040fb",
    grey: "#616161",
  },
};

// 개체 색상 정의
const elementColor = {
  main: "#3a4252",
  border: "#cbcbcb",
};

// spread operator 사용 객체 props
const themeColorProps = {
  ...BootstrapButton,
  ...palette,
  ...elementColor,
};

// const notoSansKr = localFont({
//   src: [
//     {
//       path: "../../public/font/NotoSansKR-Regular.woff",
//       weight: "400",
//       style: "normal",
//     },
//   ],
// });

// const notoSansKrSub = Noto_Sans_KR({
//   weight: ["300", "400", "500", "700"],
//   preload: false,
//   adjustFontFallback: false,
// });

// 공통 테마 생성
export const theme = createTheme({
  // dark or white
  ...BootstrapButton,
  ...themeColorProps,
  typography: {
    // fontFamily: `${notoSansKr.style.fontFamily}, ${notoSansKrSub.style.fontFamily}`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          // fontFamily: `${notoSansKr.style.fontFamily}, ${notoSansKrSub.style.fontFamily}`,
          "&:not(s)": { textDecoration: "none" },
        },
        body: {
          // 임시처리
          backgroundColor: "#ffffff",
          overflow: "overlay",
        },
        p: {
          margin: 0,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "td, th": {
            margin: 0,
            padding: 0,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // 기본 버튼
          // background: "#3a4252",
          // padding: 0,
          // color: "white",
          maxHeight: "28px",
        },
        outlined: {
          // 하얀 버튼
          // background: "white",
          fontSize: 12,
          maxHeight: "20px",
          paddingTop: "8px",
          // display: "inline-flex",
          // textAlign: "center",
          // alignItems: "center",
          // justifyContent: "center",
        },
      },
    },
  },
});

type CustomType = typeof themeColorProps;

declare module "@emotion/react" {
  interface Theme extends CustomType {}
}
declare module "@mui/material/styles" {
  interface Theme extends CustomType {}
  interface ThemeOptions extends CustomType {}
}
declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions extends CustomType {}
  interface Palette extends CustomType {}
}
export default theme;
