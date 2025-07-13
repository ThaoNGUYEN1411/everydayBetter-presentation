import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
//partage le store dans toute l’appli.Tous les composants enfants (comme <App />) peuvent accéder au store via Easy Peasy.
