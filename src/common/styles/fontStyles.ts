import { css } from "styled-components";
import barlow400 from "../../assets/fonts/barlow-400-latin.woff2";
import barlow500 from "../../assets/fonts/barlow-500-latin.woff2";
import barlow600 from "../../assets/fonts/barlow-600-latin.woff2";
import barlow700 from "../../assets/fonts/barlow-700-latin.woff2";
import barlow800 from "../../assets/fonts/barlow-800-latin.woff2";
import coiny400 from "../../assets/fonts/coiny-400-latin.woff2";

export const fontStyles = css`
  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${barlow400}) format("woff2");
  }

  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(${barlow500}) format("woff2");
  }

  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(${barlow600}) format("woff2");
  }

  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(${barlow700}) format("woff2");
  }

  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(${barlow800}) format("woff2");
  }

  @font-face {
    font-family: "Coiny";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${coiny400}) format("woff2");
  }
`;
