import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App";
import {
  reportCaughtError,
  reportRecoverableError,
  reportUncaughtError,
} from "./app/reportError";
import "./i18n/config";

const container = document.getElementById("root");

if (!container) throw new Error("The React root element was not found.");

const root = createRoot(
  container,
  import.meta.env.PROD
    ? {
        onCaughtError: reportCaughtError,
        onUncaughtError: reportUncaughtError,
        onRecoverableError: reportRecoverableError,
      }
    : undefined,
);

root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
