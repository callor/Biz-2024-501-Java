import { css } from '@emotion/react';

export const resetCss = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: 'Noto Sans KR', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', '맑은 고딕',
      helvetica, 'Apple SD Gothic Neo', sans-serif;
    color: inherit;
    vertical-align: baseline;
    letter-spacing: -0.04em;
    font-weight: 400;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    color: #252525;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a,
  a:hover,
  a:focus,
  a:active {
    color: inherit;
    text-decoration: none;
    outline: 0;
  }
  input,
  textarea,
  select {
    border: 1px solid #bbbbbb;
    padding: 0 10px;
    font-size: 14px;
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Malgun Gothic', '맑은 고딕', helvetica,
      'Apple SD Gothic Neo', sans-serif;
    color: inherit;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    box-sizing: border-box;
    border-radius: 5px;
    outline: 0;
  }
  input::placeholder {
    color: #bbbbbb;
    font-size: 14px;
    font-weight: 400;
  }
  input[readonly] {
    background-color: #fafafa;
  }
  input[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  input::-webkit-calendar-picker-indicator {
    display: none;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 20px;
    background: #fff url(/images/ico/ico_select.png) right 6px center no-repeat;
  }
  select::-ms-expand {
    display: none;
  }
  button {
    padding: 0;
    border: 0;
    background: none;
    border-radius: 0;
    font-size: inherit;
    font-family: inherit;
    outline: 0;
    cursor: pointer;
  }
  em {
    font-style: normal;
  }
  img {
    max-width: 100%;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 20px;
  }
  select::-ms-expand {
    display: none;
  }
  address {
    font-style: normal;
  }

  th,
  td {
    vertical-align: middle;
  }
  caption {
    font-size: 0;
    line-height: 0;
    text-indent: -9999em;
    clip: rect(0 0 0 0);
  }
`;
