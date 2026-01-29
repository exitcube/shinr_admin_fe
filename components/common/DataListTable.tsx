/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Spinner } from "../ui/spinner";

type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

type DataTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  pagination?: PaginationProps;
  onRowSelectionChange?: (selectedIds: (string | number)[]) => void;
  isLoding?: boolean;
};

export function DataListTable<T extends Record<string, any>>({
  columns,
  data,
  pagination,
  onRowSelectionChange,
  isLoding,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const toggleRow = (id: string | number) => {
    setSelectedRows((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      onRowSelectionChange?.(updated);
      return updated;
    });
  };

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onRowSelectionChange?.([]);
    } else {
      const allIds = data.map((row) => row.id);
      setSelectedRows(allIds);
      onRowSelectionChange?.(allIds);
    }
  };
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

    if(isLoding){
      return  <Spinner/>
    }
  return (
    <div className="space-y-4 bg-white px-4 py-2">
      {/* TABLE */}
      <Table className="">
        <TableHeader>
          <TableRow className="border-[#EDEDED]">
            <TableHead className="py-1 px-2">
              <Checkbox
                checked={
                  data.length > 0 &&
                  data.every((row) => selectedRows.includes(row.id))
                }
                onCheckedChange={toggleAll}
              />
            </TableHead>

            {columns.map((col) => (
              <TableHead
                key={String(col.accessor)}
                className={`py-1 px-2 ${col.className} font-semibold text-xs`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow className="border-[#EDEDED]">
              <TableCell
                colSpan={columns.length + 1}
                className="py-1 px-2 text-center font-normal text-xs"
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="py-1 px-2 border-[#EDEDED]">
                <TableCell className="py-1 px-2">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                  />
                </TableCell>

                {columns.map((col) => (
                  <TableCell
                    key={String(col.accessor)}
                    className={col.className}
                  >
                    {col.cell ? col.cell(row) : row[col.accessor as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === 1}
            onClick={() => pagination.onPageChange(pagination.page - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {pagination.page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === totalPages}
            onClick={() => pagination.onPageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export type TableColumn<T> = {
  header: string;
  accessor: keyof T | string;
  className?: string;
  cell?: (row: T) => React.ReactNode;
};
