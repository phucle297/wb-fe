import { nanoid } from "@reduxjs/toolkit";
import { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/libs/utils";

import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DataTablePaginationProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance to use for pagination.
   */
  table: Table<TData>;
  /**
   * View the page count. Defaults to `true`.
   */
  viewPageCount?: boolean;
  /**
   * View the page number pagination. Defaults to `false`.
   */
  viewPageNumberPagination?: boolean;
}

function DataTablePaginationBase<TData>(
  {
    table,
    viewPageCount = true,
    viewPageNumberPagination = false,
    className,
    ...props
  }: DataTablePaginationProps<TData>,
  ref: React.Ref<HTMLDivElement>
) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pages = table.getPageCount();

  const getVisiblePages = (
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number = 5
  ): (number | string)[] => {
    const visiblePages: (number | string)[] = [];

    // Always add the first page
    visiblePages.push(1);

    if (totalPages === 1) return visiblePages;

    // If the current page is more than 2 steps away from the first page, add an ellipsis
    if (currentPage > 4) {
      visiblePages.push("...");
    }

    // Calculate the start and end indices for the visible pages
    let start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages - 1, start + maxVisiblePages - 1);

    // Adjust the start index if we're at the end of the page range
    if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
      start = Math.max(2, totalPages - maxVisiblePages);
    }

    // Add the visible pages
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    // If the current page is more than 2 steps away from the last page, add an ellipsis
    if (currentPage < totalPages - 3) {
      visiblePages.push("...");
    }

    // Always add the last page
    visiblePages.push(totalPages);

    return visiblePages;
  };

  const changePage = (page: number) => () => {
    table.setPageIndex(page);
  };
  return (
    <div ref={ref} className={cn("mt-4 flex items-center justify-between px-2", className)} {...props}>
      <div className="ml-auto flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {viewPageCount && (
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {table.getPageCount()}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.setPageIndex(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft size={20} />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            variant="outline"
            onClick={() => table.previousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {viewPageNumberPagination &&
            getVisiblePages(currentPage, pages).map((page) => {
              const isActive = page === currentPage;
              const buttonVariant = isActive ? "default" : "outline";
              const buttonState = isActive ? "selected" : undefined;

              if (typeof page === "string")
                return (
                  <Button key={nanoid()} className="pointer-events-none h-8 w-8 p-0" variant="ghost">
                    ...
                  </Button>
                );

              return (
                <Button
                  key={nanoid()}
                  className="h-8 w-8 p-0"
                  data-state={buttonState}
                  variant={buttonVariant}
                  onClick={changePage(page - 1)}
                >
                  {page}
                </Button>
              );
            })}

          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.nextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * @requires `table` should use getPaginationRowModel() for the pagination to work.
 * @returns Pagination component for the table.
 */
export const DataTablePagination = forwardRef(DataTablePaginationBase) as <TData>(
  props: DataTablePaginationProps<TData> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
