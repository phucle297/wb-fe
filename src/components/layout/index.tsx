import { Outlet } from "react-router-dom";

import DotsGridBg from "../dots-grid-bg";
import Footer from "../footer";
import Header from "../header";
import NavigationProgress from "../navigation-progress";

const Layout = () => {
  return (
    <div>
      <NavigationProgress className="absolute inset-x-0 bottom-0 translate-y-1" />
      <DotsGridBg />

      <Header />

      <main className="relative z-10 mt-[56px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
