import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DataTableViewOptions } from "@/components/data-table";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onChangeSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toolbarCustomActions?: ({ table }: { table: Table<TData> }) => React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  toolbarCustomActions,
  onChangeSearch,
}: Readonly<DataTableToolbarProps<TData>>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setSearchValue(searchParams.get("search") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex-center-y mb-2 flex justify-between">
      {toolbarCustomActions ? toolbarCustomActions({ table }) : <div></div>}
      <div className="flex-center-y  ml-auto flex gap-2">
        <div className="relative w-fit">
          <Input
            autoFocus
            className="h-8 w-[150px] lg:w-[250px]"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onChangeSearch?.(e);
              setSearchParams((prev) => {
                prev.set("search", e.target.value);
                prev.set("offset", String(0));
                return prev;
              });
            }}
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2" size={14} />
        </div>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
