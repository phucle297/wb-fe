import { flexRender, Table as TableProps } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DataTableGroupedCell, DataTablePagination } from ".";

interface DataTableProps<TData> {
  table: TableProps<TData>;
}

export function DataTable<TData>({ table }: Readonly<DataTableProps<TData>>) {
  const { grouping } = table.getState();

  return (
    <div className="bg-background">
      {grouping.length > 0 && (
        <div className="flex items-center gap-2 rounded-md border px-4 py-2 ">
          <p className="text-sm">Grouped by </p>
          <div className="flex items-center gap-2">
            {grouping.map((column, index) => {
              return (
                <div key={column} className="flex gap-2">
                  {!!index && <p>, then by</p>}
                  <Badge className="capitalize">
                    {column}
                    <X
                      className="ml-2 h-4 w-4 cursor-pointer rounded-sm hover:bg-primary-foreground hover:text-primary"
                      onClick={() => {
                        const temp = grouping.filter((element) => element !== column);
                        table.setGrouping(temp);
                      }}
                    />
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <DataTableGroupedCell key={cell.id} cell={cell} row={row} />
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={table.getVisibleFlatColumns().length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
