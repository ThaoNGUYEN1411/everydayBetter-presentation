import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/globalStyle.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
