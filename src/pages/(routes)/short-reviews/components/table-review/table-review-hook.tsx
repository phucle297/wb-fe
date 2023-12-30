import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowDown01, ArrowDownAZ, ArrowDownUp, ArrowUp01, ArrowUpAZ } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { default as PerMees } from "@/assets/permees.jpg";
import { ShortReviewsMockData } from "@/mocks/short-reviews";
import { TCategories } from "@/types/categories";
import { TShortReview } from "@/types/short-review";
import { TTypes } from "@/types/types";

import Categories from "../categories";
import Types from "../types";
import {
  formatParamsTypes,
  generateDataAfterSort,
  getNewDataFilterCategories,
  getNewDataFilterSearchAndType,
} from "./table-review.helper";

export const useTableReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [types, setTypes] = useState<TTypes[]>([]);
  const [data, setData] = useState<TShortReview[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<TCategories[]>([]);
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLocaleLowerCase();
    const dataAfterSearchAndFilterType = getNewDataFilterSearchAndType(ShortReviewsMockData, searchValue, types);
    const dataAfterFilterCategories = getNewDataFilterCategories(dataAfterSearchAndFilterType, categories);
    const finalData = dataAfterFilterCategories;
    setSearch(searchValue);
    setPageCount(Math.ceil(finalData.length / pagination.pageSize));
  };
  const handleChangeTypesAndCategories = (key: "types" | "categories", value: string[]) => {
    let typesTemp: TTypes[] = [];
    let categoriesTemp: TCategories[] = [];

    if (key === "types") {
      typesTemp = value as TTypes[];
    }
    if (key === "categories") {
      categoriesTemp = value as TCategories[];
    }
    const dataAfterSearchAndFilterType = getNewDataFilterSearchAndType(
      ShortReviewsMockData,
      search,
      typesTemp.length > 0 ? typesTemp : types
    );
    const dataAfterFilterCategories = getNewDataFilterCategories(
      dataAfterSearchAndFilterType,
      categoriesTemp.length > 0 ? categoriesTemp : categories
    );
    const finalData = [...dataAfterFilterCategories];

    setSearchParams((prev) => {
      prev.set(key, value.join(","));
      prev.set("offset", "0");
      return prev;
    });
    setPageCount(Math.ceil(finalData.length / pagination.pageSize));
  };

  const handleSortChange = (updater: Updater<SortingState>) => {
    setSorting((prev) => {
      if (updater instanceof Function) {
        const newSorting = updater(prev);

        setSearchParams((prev) => {
          prev.set("sort", newSorting.map((item) => `${item.id},${item.desc ? "desc" : "asc"}`).join(";"));
          return prev;
        });
        return newSorting;
      }
      return updater;
    });
  };

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

  const columns: ColumnDef<TShortReview>[] = [
    {
      accessorKey: "name",

      header: ({ header }) => {
        const itemInSorting = sorting.find((item) => item.id === "name");
        return (
          <button
            className="flex-center-y w-[200px] cursor-pointer select-none gap-2 border-r-2"
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <p>Name</p>
            {itemInSorting && !itemInSorting?.desc && <ArrowDownAZ className={clsx("h-4 w-4")} />}
            {itemInSorting && itemInSorting?.desc && <ArrowUpAZ className={clsx("h-4 w-4")} />}
            {!itemInSorting && <ArrowDownUp className={clsx("h-4 w-4")} />}
          </button>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => {
        return (
          <div className="flex-center-y w-[200px] border-r-2">
            <p>Types</p>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row.original;
        const types = data.type.split(",");
        return <Types types={types} />;
      },
    },
    {
      accessorKey: "categories",
      header: () => {
        return <p className="border-r-2">Categories</p>;
      },
      cell: ({ row }) => {
        const data = row.original;
        const categories = data.categories.split(",");
        return <Categories categories={categories} />;
      },
    },
    {
      accessorKey: "writer",
      header: () => {
        return <p className="w-[100px]  border-r-2">Writer</p>;
      },
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
          <div className="flex-center-y flex gap-2">
            {imgSrc && <img alt="writer" className="h-8 w-8 rounded-full" src={imgSrc} />}
            <p>{data.writer}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "score",
      header: ({ header }) => {
        const itemInSorting = sorting.find((item) => item.id === "score");
        return (
          <button
            className="flex-center-y w-[100px] cursor-pointer select-none gap-2 border-r-2"
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <p>Score</p>
            {itemInSorting && !itemInSorting?.desc && <ArrowUp01 className={clsx("h-4 w-4")} />}
            {itemInSorting && itemInSorting?.desc && <ArrowDown01 className={clsx("h-4 w-4")} />}
            {!itemInSorting && <ArrowDownUp className={clsx("h-4 w-4")} />}
          </button>
        );
      },
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
                  //? https://stackoverflow.com/questions/77095324/create-a-circular-progress-bar-using-tailwind-css-in-react
                  //? strokeDashOffset={400 - (400 * 45) / 100} + stroke-dasharray: 410, 400; will make a full circle
                  //! why 410 and 400? i dunno :), but it works. The link above will explain why
                  strokeDashoffset={`calc(400 - (400 * ${score} / 10 * 45) / 100)`}
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
        return <p className="w-[500px] border-r-2">Synopsis</p>;
      },
    },
    {
      accessorKey: "review",
      header: () => {
        return <p className="w-[400px] border-r-2">Review</p>;
      },
    },
    {
      accessorKey: "status",
      header: () => {
        return <p className="border-r-2">Status</p>;
      },
    },
    {
      accessorKey: "last_edited_time",
      header: ({ header }) => {
        const itemInSorting = sorting.find((item) => item.id === "last_edited_time");
        return (
          <button
            className="flex-center-y w-[120px] cursor-pointer select-none gap-2"
            onClick={() => {
              header.column.toggleSorting();
            }}
          >
            <p>Last Edited Time</p>
            {itemInSorting && !itemInSorting?.desc && <ArrowDown01 className={clsx("h-4 w-4")} />}
            {itemInSorting && itemInSorting?.desc && <ArrowUp01 className={clsx("h-4 w-4")} />}
            {!itemInSorting && <ArrowDownUp className={clsx("h-4 w-4")} />}
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        left: ["name"],
      },
    },
    state: { pagination, sorting },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: handlePaginationChange,
    manualPagination: true,
    pageCount,
    enableSorting: true,
    enablePinning: true,
    onSortingChange: handleSortChange,
  });

  useEffect(() => {
    const currentOffset = searchParams.get("offset") ?? 0;
    const currentLimit = searchParams.get("limit") ?? 10;
    const types = searchParams.get("types") ?? "";
    const sort = searchParams.get("sort") ?? "";
    const categories = searchParams.get("categories") ?? "";

    setCategories(categories.split(",") as TCategories[]);
    setTypes(formatParamsTypes(types));

    setPageCount(Math.ceil([...ShortReviewsMockData].length / Number(currentLimit)));
    setPagination({
      pageIndex: Number(currentOffset),
      pageSize: Number(currentLimit),
    });
    setSorting(
      sort
        .split(";")
        .map((item) => item.split(","))
        .map((item) => {
          return {
            id: item[0],
            desc: item[1] === "desc",
          };
        })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentOffset = searchParams.get("offset") ?? 0;
    const currentLimit = searchParams.get("limit") ?? 10;
    const search = searchParams.get("search") ?? "";
    const type = searchParams.get("types") ?? "";
    const tempType = formatParamsTypes(type);
    const sort = searchParams.get("sort") ?? "";
    const categories = searchParams.get("categories") ?? "";
    let finalData = [...ShortReviewsMockData];
    const dataAfterSearchAndType = getNewDataFilterSearchAndType(finalData, search, tempType);
    const dataAfterFilterCategories = getNewDataFilterCategories(
      dataAfterSearchAndType,
      categories.split(",") as TCategories[]
    );

    finalData = dataAfterFilterCategories;

    if (sort) {
      const sortObj = {
        id: sort.split(",")[0],
        desc: sort.split(",")[1] === "desc",
      };
      finalData = generateDataAfterSort(finalData, sortObj);
    }

    setTypes(tempType);
    setData(
      finalData.slice(Number(currentOffset) * Number(currentLimit), (Number(currentOffset) + 1) * Number(currentLimit))
    );
    setPageCount(Math.ceil(finalData.length / Number(currentLimit)));
    setPagination({
      pageIndex: Number(currentOffset),
      pageSize: Number(currentLimit),
    });
  }, [searchParams]);

  return {
    table,
    pagination,
    pageCount,
    sorting,
    types,
    data,
    handlePaginationChange,
    handleSortChange,
    handleChangeSearch,
    handleChangeTypesAndCategories,
  };
};
