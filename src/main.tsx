import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://092f43a2a3be487ebb1c52dc13fb4cb2@o447951.ingest.sentry.io/4504956706619392",
  tracesSampleRate: 1.0,
  integrations: [new Sentry.BrowserTracing()],
  debug: true,
  attachStacktrace: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
