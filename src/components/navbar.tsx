import { useEffect } from "react";
import { Link } from "react-router-dom";

import ThemeColors from "./theme-colors";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  useEffect(() => {}, []);
  return (
    <div className="flex h-full flex-1 items-center justify-between gap-x-2 bg-background px-4">
      <Link className="flex h-5 cursor-pointer items-center space-x-4" to={"/"}>
        <h1 className="text-2xl font-semibold ">LOGO</h1>
      </Link>
      <div className="group flex items-center gap-2">
        <ThemeColors />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
