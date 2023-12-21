import { Outlet } from "react-router-dom";

import Dots from "../dots";

const Layout = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Dots />
      <header>Header</header>
      <Outlet />
      <header>Footer</header>
    </div>
  );
};

export default Layout;
