import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/libs/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",

        yellow_pastel_1: "border-transparent bg-[#faf6e6] text-[#422006]",
        yellow_pastel_2: "border-transparent bg-[#faf4c6] text-[#422006]",
        yellow_pastel_3: "border-transparent bg-[#faf2b6] text-[#422006]",
        yellow_pastel_4: "border-transparent bg-[#faf0a6] text-[#422006]",
        yellow_pastel_5: "border-transparent bg-[#faeea6] text-[#422006]",
        yellow_pastel_6: "border-transparent bg-[#faeca6] text-[#422006]",
        yellow_pastel_7: "border-transparent bg-[#faeaa6] text-[#422006]",
        yellow_pastel_8: "border-transparent bg-[#fae8a6] text-[#422006]",
        yellow_pastel_9: "border-transparent bg-[#fae6a6] text-[#422006]",
        yellow_pastel_10: "border-transparent bg-[#fae0a6] text-[#422006]",
        yellow: "border-transparent bg-[#facc15] text-[#422006]",

        blue_pastel_1: "border-transparent bg-[#d1e8ff] text-[#1e3a8a]",
        blue_pastel_2: "border-transparent bg-[#c3dbfe] text-[#1e3a8a]",
        blue_pastel_3: "border-transparent bg-[#b5cefe] text-[#1e3a8a]",
        blue_pastel_4: "border-transparent bg-[#a7c1fe] text-[#1e3a8a]",
        blue_pastel_5: "border-transparent bg-[#99b4fe] text-[#1e3a8a]",
        blue_pastel_6: "border-transparent bg-[#8ba7fe] text-[#1e3a8a]",
        blue_pastel_7: "border-transparent bg-[#7d9afe] text-[#1e3a8a]",
        blue_pastel_8: "border-transparent bg-[#6f8dfe] text-[#f9fafb]",
        blue_pastel_9: "border-transparent bg-[#6180fe] text-[#f9fafb]",
        blue_pastel_10: "border-transparent bg-[#4a67f8] text-[#f9fafb]",
        blue: "border-transparent bg-[#3b82f6]  dark:text-[#013365] text-[#f9fafb]",

        green_pastel_1: "border-transparent bg-[#d1fae5] text-[#064e3b]",
        green_pastel_2: "border-transparent bg-[#c3f7db] text-[#064e3b]",
        green_pastel_3: "border-transparent bg-[#b5f4d1] text-[#064e3b]",
        green_pastel_4: "border-transparent bg-[#a7f1c7] text-[#064e3b]",
        green_pastel_5: "border-transparent bg-[#99eec0] text-[#064e3b]",
        green_pastel_6: "border-transparent bg-[#8bebb6] text-[#064e3b]",
        green_pastel_7: "border-transparent bg-[#7de8ac] text-[#064e3b]",
        green_pastel_8: "border-transparent bg-[#6fe5a2] text-[#064e3b]",
        green_pastel_9: "border-transparent bg-[#61e298]  dark:text-[#064e3b] text-[#f9fafb]",
        green_pastel_10: "border-transparent bg-[#4ad87f]  dark:text-[#064e3b] text-[#f9fafb]",
        green: "border-transparent bg-[#16a34a] dark:text-[#064e3b] text-[#f9fafb]",

        violet_pastel_1: "border-transparent bg-[#eae6ff] text-[#3b1e8a]",
        violet_pastel_2: "border-transparent bg-[#e2dfff] text-[#3b1e8a]",
        violet_pastel_3: "border-transparent bg-[#dad7ff] text-[#3b1e8a]",
        violet_pastel_4: "border-transparent bg-[#d2cfff] text-[#3b1e8a]",
        violet_pastel_5: "border-transparent bg-[#cacaff] text-[#3b1e8a]",
        violet_pastel_6: "border-transparent bg-[#c2c2ff] text-[#3b1e8a]",
        violet_pastel_7: "border-transparent bg-[#babaff] text-[#3b1e8a]",
        violet_pastel_8: "border-transparent bg-[#b2b2ff]  dark:text-[#3b1e8a]  text-[#f9fafb]",
        violet_pastel_9: "border-transparent bg-[#aaaafe]  dark:text-[#3b1e8a]  text-[#f9fafb]",
        violet_pastel_10: "border-transparent bg-[#a2a2fe]  dark:text-[#3b1e8a]  text-[#f9fafb]",
        violet: "border-transparent bg-[#9a9afe] dark:text-[#3b1e8a]  text-[#f9fafb]",

        red_pastel_1: "border-transparent bg-[#ffe3e3] text-[#610404]",
        red_pastel_2: "border-transparent bg-[#ffd7d7] text-[#610404]",
        red_pastel_3: "border-transparent bg-[#ffcaca] text-[#610404]",
        red_pastel_4: "border-transparent bg-[#ffbebe] text-[#610404]",
        red_pastel_5: "border-transparent bg-[#ffb2b2] text-[#610404]",
        red_pastel_6: "border-transparent bg-[#ffa6a6] text-[#610404]",
        red_pastel_7: "border-transparent bg-[#ff9a9a] text-[#610404]",
        red_pastel_8: "border-transparent bg-[#ff8e8e] text-[#610404]",
        red_pastel_9: "border-transparent bg-[#ff8282] text-[#f9fafb] dark:text-[#610404]",
        red_pastel_10: "border-transparent bg-[#ff7676] text-[#f9fafb] dark:text-[#610404]",
        red: "border-transparent bg-[#ef4444] text-[#f9fafb] dark:text-[#610404]",

        gray: "border-transparent bg-[#111827] dark:bg-[#f9fafb] text-[#f9fafb] dark:text-[#013365]",

        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
