"use client";

import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";

export type VendorRow = {
  id: number;
  vendorCode: string;
  userName: string;
  joiningDate: string;
  organisation: string;
  mobileNumber: string;
  accountStatus: "ACTIVE" | "PENDING" | "BLOCKED";
  status: "ACTIVE" | "DRAFT" | "EXPIRED";
  serviceCategory: "Car Wash" | "Service" | "Detailing" | "Tyre Care";
};

type VendorTableProps = {
  data: VendorRow[];
};

export const VendorTable: React.FC<VendorTableProps> = ({ data }) => {
  const coloumn: TableColumn<VendorRow>[] = useMemo(
    () => [
      {
        header: "Vendor Code",
        accessor: "vendorCode",
        cell: (row) => {
          return (
            <div>
              <Link
                href={`/vendors/${row.id}`}
                className="underline hover:text-blue-600"
              >
                {row.vendorCode}
              </Link>
            </div>
          );
        },
      },
      {
        header: "Name",
        accessor: "userName",
      },
      {
        header: "Joining Date",
        accessor: "joiningDate",
      },
      {
        header: "Organisation",
        accessor: "organisation",
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
      },
      {
        header: "Account Status",
        accessor: "accountStatus",
        cell: (row) => {
          const accountStatus = row.accountStatus as keyof typeof REVIEW_STYLES;

          const styles = REVIEW_STYLES[accountStatus] ?? {
            bg: "bg-gray-100",
            text: "text-gray-600",
          };

          return (
            <span
              className={`inline-flex items-center px-4 py-1 rounded-sm text-xs font-medium ${styles.bg} ${styles.text}`}
            >
              {toLabel(row.accountStatus)}
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
              {toLabel(row.status)}
            </span>
          );
        },
      },
    ],
    [],
  );

  return <DataListTable columns={coloumn} data={data} rowClassName="h-[52px]" />;
};

const toLabel = (value: string) => {
  return value.charAt(0) + value.slice(1).toLowerCase();
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
    bg: "bg-[#FFF2F2]",
    text: "text-[#FF3B30]",
  },
  EXPIRED: {
    bg: "bg-[#F2F2F7]",
    text: "text-[#8E8E93]",
  },
};

export const REVIEW_STYLES: Record<
  "ACTIVE" | "PENDING" | "BLOCKED",
  { bg: string; text: string }
> = {
  ACTIVE: {
    bg: "bg-[#E9FBF0]",
    text: "text-[#22C05D]",
  },
  PENDING: {
    bg: "bg-[#F2F2F7]",
    text: "text-[#8E8E93]",
  },
  BLOCKED: {
    bg: "bg-[#FFF2F2]",
    text: "text-[#FF3B30]",
  },
};
