import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
