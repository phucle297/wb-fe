import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table/data-table";
import { ShortReviewsMockData } from "@/mocks/short-reviews";
import { TShortReview } from "@/types/short-review";

import Categories from "./categories";
import Types from "./types";

export const TableReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const [data, setData] = React.useState<TShortReview[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const columns: ColumnDef<TShortReview>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Types",

      cell: ({ row }) => {
        const data = row.original;
        const types = data.type.split(",");
        return <Types types={types} />;
      },
    },
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }) => {
        const data = row.original;
        const categories = data.categories.split(",");
        return <Categories categories={categories} />;
      },
    },
    {
      accessorKey: "writer",
      header: "Writer",
    },
    {
      accessorKey: "score",
      header: "Score",
    },
    {
      accessorKey: "synopsis",
      header: "Synopsis",
    },
    {
      accessorKey: "review",
      header: "Review",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "last_edited_time",
      header: "Last Edited Time",
    },
  ];

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    setPagination((prev) => {
      if (updater instanceof Function) {
        const newPagination = updater(prev);
        setSearchParams((prev) => {
          prev.set("offset", String(newPagination.pageIndex));
          prev.set("limit", String(newPagination.pageSize));
          return prev;
        });
        return newPagination;
      }
      return updater;
    });
  };

  const table = useReactTable({
    columns,
    data,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: handlePaginationChange,
    manualPagination: true,
    pageCount,
  });
  useEffect(() => {
    const currentOffset = searchParams.get("offset") ?? 0;
    const currentLimit = searchParams.get("limit") ?? 10;

    setData(ShortReviewsMockData.slice(Number(currentOffset), Number(currentOffset) + Number(currentLimit)));
    setPageCount(Math.ceil(ShortReviewsMockData.length / Number(currentLimit)) + 1);
    setPagination({
      pageIndex: Number(currentOffset),
      pageSize: Number(currentLimit),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getNewDataFilterSearch = (search: string) => {
    return ShortReviewsMockData.filter(
      (shortReview) =>
        shortReview.name.toLowerCase().includes(search) ||
        shortReview.categories.toLowerCase().includes(search) ||
        shortReview.review.toLowerCase().includes(search) ||
        shortReview.status.toLowerCase().includes(search) ||
        shortReview.synopsis.toLowerCase().includes(search) ||
        shortReview.type.toLowerCase().includes(search) ||
        shortReview.writer.toLowerCase().includes(search)
    );
  };
  useEffect(() => {
    const currentOffset = searchParams.get("offset") ?? 0;
    const currentLimit = searchParams.get("limit") ?? 10;
    const search = searchParams.get("search") ?? "";
    const newData = getNewDataFilterSearch(search);
    setData(newData.slice(Number(currentOffset), Number(currentOffset) + Number(currentLimit)));
    setPageCount(Math.ceil(newData.length / Number(currentLimit)) + 1);
    setPagination({
      pageIndex: Number(currentOffset),
      pageSize: Number(currentLimit),
    });
  }, [searchParams]);
  return (
    <div className="container my-10">
      <DataTableToolbar
        table={table}
        onChangeSearch={(event) => {
          const searchValue = event.target.value.toLocaleLowerCase();
          const newData = getNewDataFilterSearch(searchValue);
          setPageCount(Math.ceil(newData.length / pagination.pageSize) + 1);
          setData(newData.slice(0, 0 + pagination.pageSize));
        }}
      />
      <DataTable table={table} />
    </div>
  );
};
