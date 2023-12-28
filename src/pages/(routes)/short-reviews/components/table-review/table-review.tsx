import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table/data-table";

import { useTableReview } from "./table-review-hook";

export const TableReview = () => {
  const { table, handleChangeSearch } = useTableReview();
  return (
    <div className="container my-10">
      <DataTableToolbar table={table} onChangeSearch={handleChangeSearch} />
      <DataTable table={table} />
    </div>
  );
};
