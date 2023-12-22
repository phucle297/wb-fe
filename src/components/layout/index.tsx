import { Outlet } from "react-router-dom";

import { cn } from "@/libs/utils";

import DotsGridBg from "../dots-grid-bg";
import Navbar from "../navbar";
import NavigationProgress from "../navigation-progress";

const Layout = () => {
  return (
    <div>
      <NavigationProgress className="absolute inset-x-0 bottom-0 translate-y-1" />

      <DotsGridBg />
      <header>
        <div
          className={cn(
            "fixed inset-y-0 z-50 h-[56px] w-full border-b bg-background shadow-sm transition-all duration-500"
          )}
        >
          <Navbar />
          <NavigationProgress className="absolute inset-x-0 bottom-0 translate-y-1" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <header>Footer</header>
    </div>
  );
};

export default Layout;
