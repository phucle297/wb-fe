import { createBrowserRouter } from "react-router-dom";

import { homeRoutes } from "../(routes)/home/route";

export const router = createBrowserRouter([
  homeRoutes,
  {
    path: "*",
    element: <div>404</div>,
  },
]);
