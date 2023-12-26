import { Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { splitByCapitalCharacter } from "@/libs/split-by-capital";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: Readonly<DataTableViewOptionsProps<TData>>) {
  const hideAllColumns = () => {
    table
      .getAllLeafColumns()
      .filter((col) => col.columnDef.enableHiding !== false)
      .forEach((col) => col.toggleVisibility(false));
  };

  const showAllColumns = () => {
    table.toggleAllColumnsVisible();
  };

  const resetColumnVisibility = () => {
    table.resetColumnVisibility();
  };

  return (
    <DropdownMenu>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto hidden h-8 lg:flex" size="sm" variant="outline">
                <SlidersHorizontal size={16} />
                View
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Show / Hide Columns</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => showAllColumns()} onSelect={(e) => e.preventDefault()}>
          Show All
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => hideAllColumns()} onSelect={(e) => e.preventDefault()}>
          Hide All
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => resetColumnVisibility()} onSelect={(e) => e.preventDefault()}>
          Reset
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => {
            const header = splitByCapitalCharacter(column.id).join(" ");
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                className="cursor-pointer capitalize hover:bg-muted"
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(e) => e.preventDefault()}
              >
                {header.replaceAll("_", " ")}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
