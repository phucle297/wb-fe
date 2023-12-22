import { Table } from "@tanstack/react-table";
import { Search, SearchX } from "lucide-react";
import React, { useState } from "react";

import { DataTableViewOptions } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarCustomActions?: ({ table }: { table: Table<TData> }) => React.ReactNode;
}

export function DataTableToolbar<TData>({ table, toolbarCustomActions }: Readonly<DataTableToolbarProps<TData>>) {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="flex-center-y mb-2 justify-between">
      {toolbarCustomActions ? toolbarCustomActions({ table }) : <div></div>}
      <div className="flex-center-y ml-auto gap-2">
        {!isSearch && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={() => setIsSearch(true)}>
                  <Search size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {isSearch && (
          <>
            <Input
              autoFocus
              className="h-8 w-[150px] lg:w-[250px]"
              placeholder="Search..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
            />
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" onClick={() => setIsSearch(false)}>
                    <SearchX size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hide Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
