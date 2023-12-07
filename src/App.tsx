import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import * as Sentry from "@sentry/react";

function App() {
  const [count, setCount] = useState(0);

  function captureExceptionOrMessage(errorOrTitle?: Error | string) {
    const message =
      errorOrTitle instanceof Error ? errorOrTitle.message : errorOrTitle || "";
    const captureContext = {
      extra: { foo: "bar" },
      level: "error",
      tags: {
        limit_once_per_page: true,
        // This could be different from the error title if `data.ex` was used
        message,
        sample_rate: 1,
      },
    };

    const sentryError = errorOrTitle instanceof Error ? errorOrTitle : message;

    if (sentryError === undefined) {
      // @ts-expect-error - captureContext
      Sentry.captureMessage(message, captureContext);
    } else {
      // @ts-expect-error - captureContext
      Sentry.captureException(sentryError, captureContext);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="card">
        <button onClick={() => captureExceptionOrMessage("Hi mom")}>
          Capture Message
        </button>
        <button onClick={() => captureExceptionOrMessage(new Error("oh no!"))}>
          Capture Error
        </button>
      </div>
    </>
  );
}

export default App;
