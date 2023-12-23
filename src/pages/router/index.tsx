import { createBrowserRouter } from "react-router-dom";

import { GeneralErrorElement } from "@/components/general-error-fallback/general-error-fallback";

import { homeRoutes } from "../(routes)/home/route";

export const router = createBrowserRouter([
  homeRoutes,
  {
    path: "*",
    element: <GeneralErrorElement isNotFound />,
  },
]);
