import { css } from "styled-components";

export const baseStyles = css`
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    color: #020a14;
    background: #ffffff;
    font-family: "Barlow", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  a,
  button {
    -webkit-tap-highlight-color: transparent;
  }

  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 3px;
    box-shadow: 0 0 0 6px #043d86;
  }

  ::selection {
    color: #ffffff;
    background: #116ee5;
  }
`;
