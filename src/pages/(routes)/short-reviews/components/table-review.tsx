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
import { TTypes, typesSchema } from "@/types/types";

import Categories from "./categories";
import Types from "./types";

export const TableReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [types, setTypes] = React.useState<TTypes[]>([]);
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
  const getNewDataFilterSearchAndType = (search: string, types: TTypes[]) => {
    const newData = ShortReviewsMockData.filter(
      (shortReview) =>
        shortReview.name.toLowerCase().includes(search) ||
        shortReview.categories.toLowerCase().includes(search) ||
        shortReview.review.toLowerCase().includes(search) ||
        shortReview.status.toLowerCase().includes(search) ||
        shortReview.synopsis.toLowerCase().includes(search) ||
        shortReview.type.toLowerCase().includes(search) ||
        shortReview.writer.toLowerCase().includes(search)
    );
    const dataFilterType = newData.filter((shortReview) => {
      let typeInReview = shortReview.type.split(",");
      typeInReview = typeInReview.map((item) => item.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"));
      return types.some((item) => typeInReview.includes(item));
    });

    return dataFilterType;
  };
  const formatParamsTypes: (type: string) => TTypes[] = (type: string) => {
    let tempType = type
      .split(",")
      .filter((item) => item.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"));
    if (tempType.includes(typesSchema.enum.anime)) {
      tempType.push(typesSchema.enum.anime_movie);
      tempType.push(typesSchema.enum.anime_tv_series);
    }
    if (
      tempType.includes("web_novel light_novel") ||
      tempType.includes(typesSchema.enum.light_novel) ||
      tempType.includes(typesSchema.enum.web_novel) ||
      tempType.includes(typesSchema.enum["web_novel/light_novel"]) ||
      tempType.includes(typesSchema.enum["light_novel/web_novel"])
    ) {
      tempType.push(typesSchema.enum.light_novel);
      tempType.push(typesSchema.enum.web_novel);
      tempType.push(typesSchema.enum["web_novel/light_novel"]);
      tempType.push(typesSchema.enum["light_novel/web_novel"]);
      tempType = tempType.filter((item) => item !== "web_novel light_novel");
    }
    return tempType as TTypes[];
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
    const types = searchParams.get("types") ?? "";
    setTypes(formatParamsTypes(types));
    setData(ShortReviewsMockData.slice(Number(currentOffset), Number(currentOffset) + Number(currentLimit)));
    setPageCount(Math.ceil(ShortReviewsMockData.length / Number(currentLimit)));
    setPagination({
      pageIndex: Number(currentOffset),
      pageSize: Number(currentLimit),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentOffset = searchParams.get("offset") ?? 0;
    const currentLimit = searchParams.get("limit") ?? 10;
    const search = searchParams.get("search") ?? "";
    const type = searchParams.get("types") ?? "";
    const tempType = formatParamsTypes(type);
    const newData = getNewDataFilterSearchAndType(search, tempType);
    setTypes(tempType);
    setData(newData.slice(Number(currentOffset), Number(currentOffset) + Number(currentLimit)));
    setPageCount(Math.ceil(newData.length / Number(currentLimit)));
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
          const newData = getNewDataFilterSearchAndType(searchValue, types);
          setPageCount(Math.ceil(newData.length / pagination.pageSize));
          setData(newData.slice(0, 0 + pagination.pageSize));
        }}
      />
      <DataTable table={table} />
    </div>
  );
};
