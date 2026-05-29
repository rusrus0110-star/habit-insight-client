import React from "react";
import ReactDOM from "react-dom/client";

import { AppProviders } from "./app/providers";

import "./styles/variables.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>,
);
