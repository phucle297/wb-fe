import { Cell, flexRender, Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { cn } from "@/libs/utils";

import { Button } from "../ui/button";
import { TableCell } from "../ui/table";

interface DataTableGroupedCellProps<TData, TValues> {
  cell: Cell<TData, TValues>;
  row: Row<TData>;
}

export const DataTableGroupedCell = <TData, TValue>({ cell, row }: DataTableGroupedCellProps<TData, TValue>) => {
  if (cell.getIsGrouped()) {
    return (
      <TableCell className="flex items-center gap-2">
        {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
        <Button
          className={cn(row.getCanExpand() ? "cursor-pointer" : "cursor-auto")}
          size={"icon"}
          variant={"ghost"}
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: {
              cursor: row.getCanExpand() ? "pointer" : "normal",
            },
          }}
        >
          <ChevronDown className={cn("text-primary transition duration-200", row.getIsExpanded() && "-rotate-180 ")} />
        </Button>
      </TableCell>
    );
  }

  if (cell.getIsAggregated()) {
    return (
      <TableCell>
        {flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  }

  if (cell.getIsPlaceholder()) {
    return <TableCell></TableCell>;
  }

  return <TableCell>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
};
