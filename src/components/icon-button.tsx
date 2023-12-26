import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/libs/utils";

const iconButtonVariants = cva(
  "inline-flex-center aspect-square rounded-md ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        destructiveOutline:
          "border border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outlineActive: "border bg-accent text-accent-foreground hover:border-input hover:bg-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
        xs: "h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={cn(iconButtonVariants({ variant, size, className }))} {...props} />;
  }
);
IconButton.displayName = "IconButton";

// eslint-disable-next-line react-refresh/only-export-components
export { IconButton, iconButtonVariants };
