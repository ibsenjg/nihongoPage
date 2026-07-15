import styled, { ThemeProvider } from "styled-components";
import { AppErrorBoundary } from "../common/components/app-error-boundary/AppErrorBoundary";
import { GlobalStyle } from "../common/styles/GlobalStyle";
import { theme } from "../common/styles/theme";
import { AppRoutes } from "../routes/AppRoutes";
import { AppMetadata } from "./AppMetadata";

const AppRoot = styled.div``;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppMetadata />
      <AppRoot data-testid="app-root">
        <AppErrorBoundary>
          <AppRoutes />
        </AppErrorBoundary>
      </AppRoot>
    </ThemeProvider>
  );
}
