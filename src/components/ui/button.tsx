import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        defaultActive: "bg-primary/90 text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outlineActive: "bg-accent text-accent-foreground hover:border hover:border-input hover:bg-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        ghostActive: "bg-accent text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        warning: "bg-yellow-500 text-primary-foreground hover:bg-yellow-500/90",
        info: "bg-sky-500 text-primary-foreground hover:bg-sky-500/90",
        blood: "bg-rose-600 text-primary-foreground hover:bg-rose-600/90",
      },
      size: {
        default: "h-10 gap-2 px-4 py-2 text-sm",
        sm: "h-9 gap-1 px-3 text-xs",
        lg: "h-11 gap-3 px-8 text-base",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  uppercase?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      startIcon,
      endIcon,
      disabled,
      loading,
      fullWidth,
      uppercase,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const disabledProps = disabled || loading ? { disabled: true } : {};

    const renderIcon = (Icon?: React.ReactNode) => {
      if (Icon && loading) {
        return <Loader2 className="animate-spin" size={16} />;
      }
      return Icon;
    };

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full", uppercase && "uppercase")}
        {...props}
        {...disabledProps}
      >
        {!startIcon && !endIcon && loading && <Loader2 className="animate-spin" size={16} />}
        {renderIcon(startIcon)}
        {children}
        {renderIcon(endIcon)}
      </Comp>
    );
  }
);
Button.displayName = "Button";
// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
