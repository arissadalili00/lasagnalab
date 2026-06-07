import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initEmailJs } from "./utils/email";
import App from "./App";
import "./index.css";

initEmailJs();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
