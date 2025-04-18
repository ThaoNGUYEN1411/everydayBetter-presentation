import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18next from "./locales/i18n.ts";
import { StoreProvider } from "easy-peasy";
import { store } from "./store/index.ts";
// rome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </StoreProvider>
  </StrictMode>
);
