import { RouteObject } from "react-router-dom";

import Layout from "@/components/layout";

import HomePage from ".";

export const homeRoutes: RouteObject = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
};
