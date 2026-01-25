/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { STATUS_STYLES } from "../banner/BannerTable";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";

export const RewardsTable: React.FC = () => {
  const coloumn: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Title",
        accessor: "title",
        cell: (row) => {
          return (
            <div className="flex items-center gap-2">
              {/* Link */}
              <Link href={`/rewards/${row.id}`} className="text-xs underline">
                {row.title}
              </Link>
            </div>
          );
        },
      },
      {
        header: "Category",
        accessor: "category",
      },
      {
        header: "Authenticity",
        accessor: "vendor",
      },
      {
        header: "Service Category",
        accessor: "service_category",
      },
      {
        header: "Start Date & Time",
        accessor: "startTime",
      },
      {
        header: "End Date & Time",
        accessor: "endTime",
      },
      {
        header: "Status",
        accessor: "status",
        cell: (row) => {
          const status = row.status as keyof typeof STATUS_STYLES;

          const styles = STATUS_STYLES[status] ?? {
            bg: "bg-gray-100",
            text: "text-gray-600",
          };

          return (
            <span
              className={`inline-flex items-center px-4 py-1 rounded-sm text-xs font-medium ${styles.bg} ${styles.text}`}
            >
              {row.status}
            </span>
          );
        },
      },
    ],
    [],
  );
  return (
    <div>
      <DataListTable
        columns={coloumn}
        data={data}
        onRowSelectionChange={(selectedIds) =>
          console.log("Selected IDs:", selectedIds)
        }
      />
    </div>
  );
};

const data = [
  {
    id: 12,
    title: "New Year Offer",
    category: "Promotions",
    status: "ACTIVE",
    owner: "VENDOR",
    displaySequence: 1,
    startTime: "2025-12-04T00:00:00.000Z",
    endTime: "2025-12-10T23:59:59.000Z",
    vendor: "ABC Motors",
    service_category: "Maintenance",
  },
  {
    id: 13,
    title: "Onam Offer",
    category: "Promotions",
    status: "INACTIVE",
    owner: "VENDOR",
    displaySequence: 1,
    startTime: "2025-12-04T00:00:00.000Z",
    endTime: "2025-12-10T23:59:59.000Z",
    vendor: "ABC Motors",
    service_category: "Maintenance",
  },
  {
    id: 14,
    title: "Eid Offer",
    category: "Promotions",
    status: "ACTIVE",
    owner: "VENDOR",
    displaySequence: 1,
    startTime: "2025-12-04T00:00:00.000Z",
    endTime: "2025-12-10T23:59:59.000Z",
    vendor: "ABC Motors",
    service_category: "Maintenance",
  },
  {
    id: 15,
    title: "New Year Offer",
    category: "Promotions",
    status: "INACTIVE",
    owner: "VENDOR",
    displaySequence: 1,
    startTime: "2025-12-04T00:00:00.000Z",
    endTime: "2025-12-10T23:59:59.000Z",
    vendor: "ABC Motors",
    service_category: "Maintenance",
  },
  {
    id: 16,
    title: "Republic day Offer",
    category: "Promotions",
    status: "EXPIRED",
    owner: "VENDOR",
    displaySequence: 1,
    startTime: "2025-12-04T00:00:00.000Z",
    endTime: "2025-12-10T23:59:59.000Z",
    vendor: "ABC Motors",
    service_category: "Maintenance",
  },
];
