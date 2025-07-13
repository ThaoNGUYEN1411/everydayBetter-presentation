import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/globalStyle.css";
import { StoreProvider } from "easy-peasy";
import i18next from "./locales/i18n.ts";
import store from "./store";
import { I18nextProvider } from "react-i18next";
import RouterApp from "./routers/RouterApp";

function App() {
  return (
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18next}>
        <RouterApp />
      </I18nextProvider>
    </StoreProvider>
  );
}

export default App;
