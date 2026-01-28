/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";
import { useBannerList } from "@/hooks/useBannerQuery";

export const BannerTable: React.FC = () => {

  const { data: bannerList, isLoading: bannersLoading } = useBannerList();
  // console.log({ bannerList });
  const coloumn: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Title",
        accessor: "title",
        cell: (row) => {
          return (
            <div>
              <Link href={`/banner/${row.id}`} className="text-xs underline">{row.title}</Link>
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
        accessor: "owner",
        cell: (row) => {
          if (row.owner === "VENDOR") {
            return row.vendor ?? "-";
          }
          return "SHINR";
        },
      },
      {
        header: "Start Date & Time",
        accessor: "startTime",
        cell: (row) => {
          if (!row.startTime) return "-";
          return new Date(row.startTime).toISOString().split("T")[0]; 
        }
      },
      {
        header: "End Date & Time",
        accessor: "endTime",
        cell: (row) => {
          if (!row.endTime) return "-";
          return new Date(row.endTime).toISOString().split("T")[0];
        }
      },
      {
        header: "Review Status",
        accessor: "reviewStatus",
        cell: (row) => {
          const reviewStatus = row.reviewStatus as keyof typeof REVIEW_STYLES;

          const styles = REVIEW_STYLES[reviewStatus] ?? {
            bg: "bg-gray-100",
            text: "text-gray-600",
          };

          return (
            <span
              className={`inline-flex items-center px-4 py-1 rounded-sm text-xs font-medium ${styles.bg} ${styles.text}`}
            >
              {row.reviewStatus}
            </span>
          );
        },
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
    []
  );
  return (
    <div>
      <DataListTable
        columns={coloumn}
        data={bannerList?.data ?? []}
      />
    </div>
    
  );
};

export const STATUS_STYLES: Record<
  "ACTIVE" | "DRAFT" | "EXPIRED",
  { bg: string; text: string }
> = {
  ACTIVE: {
    bg: "bg-[#E9FBF0]",
    text: "text-[#22C05D]",
  },
  DRAFT: {
    bg: "bg-[#F2F2F7]",
    text: "text-[#8E8E93]",
  },
  EXPIRED: {
    bg: "bg-[#FFF2F2]",
    text: "text-[#FF3B30]",
  },
};

export const REVIEW_STYLES: Record<
  "APPROVED" | "PENDING" | "REJECTED",
  { bg: string; text: string }
> = {
  APPROVED: {
    bg: "bg-[#EFE9FB]",
    text: "text-[#7C22C0]",
  },
  PENDING: {
    bg: "bg-[#F2F2F7]",
    text: "text-[#8E8E93]",
  },
  REJECTED: {
    bg: "bg-[#FFF2F2]",
    text: "text-[#FF3B30]",
  },
};

// const data = [
//   {
//     id: 12,
//     title: "New Year Offer",
//     category: "Promotions",
//     reviewStatus: "REJECT",
//     status: "ACTIVE",
//     owner: "VENDOR",
//     displaySequence: 1,
//     startTime: "2025-12-04T00:00:00.000Z",
//     endTime: "2025-12-10T23:59:59.000Z",
//     vendor: "ABC Motors",
//   },
//   {
//     id: 13,
//     title: "Onam Offer",
//     category: "Promotions",
//     reviewStatus: "PENDING",
//     status: "INACTIVE",
//     owner: "VENDOR",
//     displaySequence: 1,
//     startTime: "2025-12-04T00:00:00.000Z",
//     endTime: "2025-12-10T23:59:59.000Z",
//     vendor: "ABC Motors",
//   },
//   {
//     id: 14,
//     title: "Eid Offer",
//     category: "Promotions",
//     reviewStatus: "APPROVED",
//     status: "ACTIVE",
//     owner: "VENDOR",
//     displaySequence: 1,
//     startTime: "2025-12-04T00:00:00.000Z",
//     endTime: "2025-12-10T23:59:59.000Z",
//     vendor: "ABC Motors",
//   },
//   {
//     id: 15,
//     title: "New Year Offer",
//     category: "Promotions",
//     reviewStatus: "PENDING",
//     status: "INACTIVE",
//     owner: "VENDOR",
//     displaySequence: 1,
//     startTime: "2025-12-04T00:00:00.000Z",
//     endTime: "2025-12-10T23:59:59.000Z",
//     vendor: "ABC Motors",
//   },
//   {
//     id: 16,
//     title: "Republic day Offer",
//     category: "Promotions",
//     reviewStatus: "APPROVED",
//     status: "EXPIRED",
//     owner: "VENDOR",
//     displaySequence: 1,
//     startTime: "2025-12-04T00:00:00.000Z",
//     endTime: "2025-12-10T23:59:59.000Z",
//     vendor: "ABC Motors",
//   },
// ];
