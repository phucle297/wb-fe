import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  label: React.ReactNode;
}

export const ButtonWithTooltip = React.forwardRef(
  ({ label, ...props }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button {...props} ref={ref} />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

ButtonWithTooltip.displayName = "ButtonWithTooltip";
