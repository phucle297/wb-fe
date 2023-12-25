import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { default as Logo } from "@/assets/logo.png";
import { PATH } from "@/configs/path";
import { useViewPortSize } from "@/hooks/useViewPortSize";
import { useTheme } from "@/providers/theme-provider";

import ThemeColors from "./theme-colors";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { theme } = useTheme();
  const { width } = useViewPortSize();
  const [openMenu, setOpenMenu] = useState(false);
  const checkDarkMode = () => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return systemTheme === "dark";
    }
    return theme === "dark";
  };
  return (
    <div className="container mx-auto flex h-full flex-1 items-center justify-between gap-x-2 px-4">
      <Link className="flex h-1/2 cursor-pointer items-center space-x-4" to={PATH.HOME}>
        <h1 className={clsx("h-full text-2xl font-semibold", { invert: checkDarkMode() })}>
          <img alt="logo" className="h-full" src={Logo} />
        </h1>
      </Link>
      {width >= 768 && (
        <div className="group flex items-center gap-6">
          <Link className="flex items-center gap-2" to={PATH.HOME}>
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
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link to={PATH.SEARCH + "?type=anime"}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    Anime
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link to={PATH.SEARCH + "?type=manga"}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    Manga
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link to={PATH.SEARCH + "?type=wn-ln"}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    Web Novel/Light Novel
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link className="flex items-center gap-2" to={PATH.ABOUT_US}>
            <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
              About us
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
      )}

      <div className="group flex items-center gap-2">
        <ThemeColors />
        <ThemeToggle />

        {width < 768 && (
          <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <X
                  className={clsx(
                    "h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all duration-300",
                    openMenu && "rotate-90 scale-100"
                  )}
                />
                <Menu
                  className={clsx(
                    "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
                    openMenu && "rotate-90 scale-0"
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-screen">
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link className="flex items-center gap-2" to={PATH.HOME}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    Home
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link className="flex items-center gap-2" to={PATH.ABOUT_US}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    About us
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link className="flex items-center gap-2" to={PATH.DONATE}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    Donate
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <Link className="flex items-center gap-2" to={PATH.CONTACT_US}>
                  <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                    Contacts us
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
