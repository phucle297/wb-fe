import "@mantine/core/styles.css";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "./styles/globals.css";

import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { router } from "./pages/router/index.tsx";
import { ToastProvider } from "./providers/toast-provider.tsx";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <ToastProvider />
      </ReduxProvider>
    </MantineProvider>
  </React.StrictMode>
);
