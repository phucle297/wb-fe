import { createBrowserRouter } from "react-router-dom";

import { GeneralErrorElement } from "@/components/general-error-fallback/general-error-fallback";
import Layout from "@/components/layout";
import { PATH } from "@/configs/path";

import AboutUs from "../(routes)/about-us";
import BlogDetail from "../(routes)/blog-detail";
import Blogs from "../(routes)/blogs";
import ContactUs from "../(routes)/contact-us";
import Donate from "../(routes)/donate";
import Home from "../(routes)/home";
import ShortReviews from "../(routes)/short-reviews";

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
      {
        path: PATH.BLOGS,
        element: <Blogs />,
      },
      {
        path: PATH.BLOGS_DETAIl,
        element: <BlogDetail />,
      },
      {
        path: PATH.DONATE,
        element: <Donate />,
      },
      {
        path: PATH.CONTACT_US,
        element: <ContactUs />,
      },
      {
        path: PATH.SHORT_REVIEWS,
        element: <ShortReviews />,
      },
    ],
  },
  {
    path: "*",
    element: <GeneralErrorElement isNotFound />,
  },
]);
