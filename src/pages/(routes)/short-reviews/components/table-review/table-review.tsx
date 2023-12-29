import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table/data-table";
import MultiSelect from "@/components/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { optionsCategories, optionsTypes } from "@/constant/multi-select";

import Categories from "../categories";
import Types from "../types";
import { useTableReview } from "./table-review-hook";

export interface IOptionTypes {
  label: string;
  value: string;
}

export const TableReview = () => {
  const { table, handleChangeSearch } = useTableReview();
  return (
    <div className="container my-10">
      <div className="flex flex-wrap justify-end gap-2">
        <MultiSelect
          options={optionsCategories}
          placeholder="Categories"
          valueRenderer={(selected, _options) => {
            return (
              <ScrollArea orientation="horizontal">
                <Categories noWrap categories={selected.map((item) => item.label)} />
              </ScrollArea>
            );
          }}
          onChange={(selected) => console.log(selected)}
        />
        <MultiSelect
          options={optionsTypes}
          placeholder="Types"
          valueRenderer={(selected, _options) => {
            return (
              <ScrollArea orientation="horizontal">
                <Types types={selected.map((item) => item.label)} />
              </ScrollArea>
            );
          }}
          onChange={(selected) => console.log(selected)}
        />
        <DataTableToolbar table={table} onChangeSearch={handleChangeSearch} />
      </div>
      <DataTable table={table} />
    </div>
  );
};
