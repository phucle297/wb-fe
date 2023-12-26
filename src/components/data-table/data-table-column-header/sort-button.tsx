import { ArrowDown, ArrowUpDown, ArrowUpIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { ButtonProps } from "../../ui/button";

interface SortButtonProps extends ButtonProps {
  direction: "asc" | "desc" | false;
  title: string;
}

function getIcon(direction: "asc" | "desc" | false) {
  if (!direction) {
    return ArrowUpDown;
  } else if (direction === "asc") {
    return ArrowUpIcon;
  } else {
    return ArrowDown;
  }
}

export function SortButton(props: SortButtonProps) {
  const { direction, title, ...otherProps } = props;

  const Icon = getIcon(direction);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger {...otherProps} asChild>
          <Icon
            className="cursor-pointer rounded-md border border-transparent text-muted-foreground/70 hover:border-muted-foreground/10 hover:bg-muted hover:text-muted-foreground"
            size={20}
          />
        </TooltipTrigger>
        <TooltipContent className="font-medium">
          Sorting {title} {direction === "desc" ? "descending" : "ascending"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
