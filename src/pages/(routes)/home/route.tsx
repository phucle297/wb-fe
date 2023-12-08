import { RouteObject } from "react-router-dom";

import HomePage from ".";

export const homeRoutes: RouteObject = {
  path: "*",
  element: <HomePage />,
};
