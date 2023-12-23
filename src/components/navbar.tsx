import clsx from "clsx";
import { Link } from "react-router-dom";

import { default as Logo } from "@/assets/logo.png";
import { PATH } from "@/configs/path";
import { useTheme } from "@/providers/theme-provider";

import ThemeColors from "./theme-colors";
import { ThemeToggle } from "./theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { theme } = useTheme();

  const checkDarkMode = () => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return systemTheme === "dark";
    }
    return theme === "dark";
  };
  return (
    <div className="flex h-full flex-1 items-center justify-between gap-x-2 bg-background px-4">
      <Link className="flex h-1/2 cursor-pointer items-center space-x-4" to={"/"}>
        <h1 className={clsx("h-full text-2xl font-semibold", { invert: checkDarkMode() })}>
          <img className="h-full" src={Logo} />
        </h1>
      </Link>
      <div className="group flex items-center gap-6">
        <Link className="flex items-center gap-2" to={"/"}>
          <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
            Home
          </span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
              Types
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={PATH.SEARCH + "?type=anime"}>
                <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                  Anime
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={PATH.SEARCH + "?type=manga"}>
                <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                  Manga
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={PATH.SEARCH + "?type=wn-ln"}>
                <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                  Web Novel/Light Novel
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link className="flex items-center gap-2" to={PATH.BLOGS}>
          <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
            Blogs
          </span>
        </Link>
        <Link className="flex items-center gap-2" to={PATH.DONATE}>
          <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
            Donate
          </span>
        </Link>
        <Link className="flex items-center gap-2" to={PATH.CONTACT_US}>
          <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
            Contacts us
          </span>
        </Link>
      </div>
      <div className="group flex items-center gap-2">
        <ThemeColors />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
