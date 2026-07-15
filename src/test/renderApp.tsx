import { MemoryRouter } from "react-router-dom";
import { render } from "vitest-browser-react";
import App from "../app/App";

export async function renderApp(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}
