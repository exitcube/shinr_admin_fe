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
};

export function DataListTable<T extends Record<string, any>>({
  columns,
  data,
  pagination,
}: DataTableProps<T>) {
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

  return (
    <div className="space-y-4 bg-white px-4 py-2">
      {/* TABLE */}
      <Table className="">
        <TableHeader>
          <TableRow className="border-[#EDEDED]">
            {columns.map((col) => (
              <TableHead key={String(col.accessor)} className={`py-1 px-2 ${col.className} font-semibold text-xs`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow className="border-[#EDEDED]">
              <TableCell colSpan={columns.length} className="py-1 px-2 text-center font-normal text-xs">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="py-1 px-2 border-[#EDEDED]">
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
