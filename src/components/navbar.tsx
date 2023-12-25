import { nanoid } from "@reduxjs/toolkit";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { default as Logo } from "@/assets/logo.png";
import { NavBarLinks } from "@/configs/nav-bar";
import { PATH } from "@/configs/path";
import { useViewPortSize } from "@/hooks/useViewPortSize";
import { useTheme } from "@/providers/theme-provider";
import { nestedLinkSchema, TLink } from "@/types/links";

import ThemeColors from "./theme-colors";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
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
          {NavBarLinks.map((link: TLink) => {
            // check if link has children
            const { success } = nestedLinkSchema.safeParse(link);

            if (success) {
              const linkNested = nestedLinkSchema.parse(link);
              return (
                <DropdownMenu key={nanoid()}>
                  <DropdownMenuTrigger>
                    <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                      {link.title}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {linkNested.children.map((child) => {
                      return (
                        <DropdownMenuItem
                          key={nanoid()}
                          onClick={() => {
                            setOpenMenu(false);
                            navigate(child.link);
                          }}
                        >
                          <p className="w-full cursor-pointer text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                            {child.title}
                          </p>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link key={nanoid()} className="flex items-center gap-2" to={link.link}>
                <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                  {link.title}
                </span>
              </Link>
            );
          })}
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
              {NavBarLinks.map((link: TLink) => {
                const { success } = nestedLinkSchema.safeParse(link);
                if (success) {
                  const linkNested = nestedLinkSchema.parse(link);
                  return (
                    <DropdownMenuItem
                      key={nanoid()}
                      onClick={() => {
                        setOpenMenu(false);
                      }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                            {link.title}
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-screen">
                          {linkNested.children.map((child) => (
                            <DropdownMenuItem
                              key={nanoid()}
                              onClick={() => {
                                setOpenMenu(false);
                                navigate(child.link);
                              }}
                            >
                              <p className="w-full cursor-pointer text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                                {child.title}
                              </p>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </DropdownMenuItem>
                  );
                }
                return (
                  <DropdownMenuItem
                    key={nanoid()}
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                  >
                    <Link className="flex items-center gap-2" to={link.link}>
                      <span className="text-lg font-semibold transition-all duration-300 hover:text-[hsl(var(--primary))]">
                        {link.title}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
