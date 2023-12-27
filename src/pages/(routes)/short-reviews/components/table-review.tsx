import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { default as PerMees } from "@/assets/permees.jpg";
import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table/data-table";
import { ShortReviewsMockData } from "@/mocks/short-reviews";
import { TShortReview } from "@/types/short-review";
import { TTypes, typesSchema } from "@/types/types";

import Categories from "./categories";
import Types from "./types";

export const TableReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [types, setTypes] = useState<TTypes[]>([]);
  const [data, setData] = useState<TShortReview[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<TShortReview>[] = [
    {
      accessorKey: "name",
      header: ({ header }) => {
        console.log(header);
        return (
          <p className="w-[200px]" onClick={() => {}}>
            Name
          </p>
        );
      },
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
      cell: ({ row }) => {
        const data = row.original;
        let imgSrc = "";
        switch (data.writer) {
          case "permees":
            imgSrc = PerMees;
            break;
          default:
            imgSrc = "https://picsum.photos/100/100";
            break;
        }
        return (
          <div className="flex-center-y flex w-[100px] gap-2">
            {imgSrc && <img alt="writer" className="h-8 w-8 rounded-full" src={imgSrc} />}
            <p>{data.writer}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => {
        const data = row.original;
        const score = Number(data.score);
        return (
          <div className="flex-center-y flex w-[100px] gap-2">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  className="stroke-current text-[hsl(var(--muted))]"
                  cx={50}
                  cy={50}
                  fill="transparent"
                  r={30}
                  strokeWidth={9.9}
                />
                {/* Progress circle */}
                <circle
                  className="progress-ring-circle stroke-current text-[hsl(var(--primary))]"
                  cx={50}
                  cy={50}
                  fill="transparent"
                  r={30}
                  //? If you want to change the size of the progress, you have to change the r, stroke-dasharray in css, and stroke-dashoffset (540 if 400 and 405 if 300 for 100%)
                  strokeDashoffset={`calc(300 - ((405 * ${score} / 10) * 45) / 100)`}
                  strokeWidth={10}
                />
                {/* Center text */}
                <text alignmentBaseline="middle" textAnchor="middle" x={50} y={50}>
                  {score}
                </text>
              </svg>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "synopsis",
      header: () => {
        return (
          <p className="w-[500px]" onClick={() => {}}>
            Synopsis
          </p>
        );
      },
    },
    {
      accessorKey: "review",
      header: () => {
        return (
          <p className="w-[400px]" onClick={() => {}}>
            Review
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "last_edited_time",
      header: () => {
        return (
          <p className="w-[100px]" onClick={() => {}}>
            Last Edited Time
          </p>
        );
      },
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
    state: { pagination, sorting },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: handlePaginationChange,
    manualPagination: true,
    pageCount,
    onSortingChange: setSorting,
  });
  useEffect(() => {
    const currentOffset = searchParams.get("offset") ?? 0;
    const currentLimit = searchParams.get("limit") ?? 10;
    const types = searchParams.get("types") ?? "";
    setTypes(formatParamsTypes(types));
    setData(
      ShortReviewsMockData.slice(
        Number(currentOffset) * Number(currentLimit),
        (Number(currentOffset) + 1) * Number(currentLimit)
      )
    );
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
    setData(
      newData.slice(Number(currentOffset) * Number(currentLimit), (Number(currentOffset) + 1) * Number(currentLimit))
    );
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
          setData(newData.slice(0, pagination.pageSize));
        }}
      />
      <DataTable table={table} />
    </div>
  );
};
