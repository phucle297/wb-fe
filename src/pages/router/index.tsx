import { createBrowserRouter } from "react-router-dom";

import { GeneralErrorElement } from "@/components/general-error-fallback/general-error-fallback";
import Layout from "@/components/layout";
import { PATH } from "@/configs/path";

import AboutUs from "../(routes)/about-us";
import Home from "../(routes)/home";

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: <Home />,
      },
      {
        path: PATH.ABOUT_US,
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "*",
    element: <GeneralErrorElement isNotFound />,
  },
]);
