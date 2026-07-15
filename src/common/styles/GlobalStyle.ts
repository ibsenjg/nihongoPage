import { createGlobalStyle } from "styled-components";
import { appStyles } from "./appStyles";
import { baseStyles } from "./baseStyles";
import { fontStyles } from "./fontStyles";

export const GlobalStyle = createGlobalStyle`
  ${fontStyles}
  ${baseStyles}
  ${appStyles}
`;
