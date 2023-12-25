/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from "clsx";
import { Settings } from "lucide-react";
import { useState } from "react";

import { Color, useTheme } from "@/providers/theme-provider";
import { COLORS, colorsSchema } from "@/types/colors";

import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const ThemeColors = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { setColor, color: colorDefault } = useTheme();
  const getColorPrimary = (color: Color | string) => {
    switch (color) {
      case colorsSchema.enum.gray:
        return "hsl(220 8.9% 46.1%)";
      case colorsSchema.enum.red:
        return "hsl(0 72.2% 50.6%)";
      case colorsSchema.enum.rose:
        return "hsl(346.8 77.2% 49.8%)";
      case colorsSchema.enum.orange:
        return "hsl(20.5 90.2% 48.2%)";
      case colorsSchema.enum.green:
        return "hsl(142.1 70.6% 45.3%)";
      case colorsSchema.enum.blue:
        return "hsl(221.2 83.2% 53.3%)";
      case colorsSchema.enum.yellow:
        return "hsl(47.9 95.8% 53.1%)";
      case colorsSchema.enum.violet:
        return "hsl(262.1 83.3% 57.8%)";
      default:
        return "hsl(47.9 95.8% 53.1%)";
    }
  };
  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button className="transition-all" size="icon" variant="outline">
          <Settings className={clsx("transition-all duration-300", openMenu && "rotate-180")} size={"16"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <div className="flex-col items-center justify-center space-y-2">
          {COLORS.map((color) => (
            <DropdownMenuItem
              key={color}
              aria-checked={color === colorDefault}
              aria-hidden={true}
              className="flex-center-y flex min-w-[100px] cursor-pointer items-center gap-2 rounded-md border-2 border-input bg-background px-2 py-1.5 text-sm font-normal leading-none transition hover:brightness-95 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 aria-[checked=true]:border-primary"
              style={{
                // @ts-ignore
                "--theme-primary": getColorPrimary(color),
              }}
              onClick={() => setColor(color as Color)}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"></span>

              <span>
                {color[0].toUpperCase()}
                {color.slice(1)}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeColors;
