/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import { Ban } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useBlockCustomer, useCustomerList } from "@/hooks/useCustomerQuery";

const formatDateOnly = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().split("T")[0];
};

export const CustomerTable: React.FC = () => {
  const { data: customerList, isLoading: customerListLoading } = useCustomerList();
  const { mutate: blockCustomer, isPending: isBlockPending } = useBlockCustomer();

  const coloumn: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Name",
        accessor: "name",
        cell: (row) => {
          return (
            <div>
              <Link href={`/customer/${row.id}`} className="text-xs">
                {row.name}
              </Link>
            </div>
          );
        },
      },
      {
        header: "Email ID",
        accessor: "email",
      },
      {
        header: "Phone Number",
        accessor: "mobile",
      },
      {
        header: "Total Bookings",
        accessor: "totalBookings",
      },
      {
        header: "Last Booking",
        accessor: "lastBooking",
      },
      {
        header: "Registered On",
        accessor: "registeredOn",
        cell: (row) => formatDateOnly(row.registeredOn),
      },
      {
        header: "Last Active",
        accessor: "lastActive",
        cell: (row) => formatDateOnly(row.lastActive),
      },
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => {
          return (
            <div className="flex">
              <Button
                className="bg-red-50 text-red-500 px-3 py-2 rounded hover:bg-red-100 transition-colors"
                onClick={() => blockCustomer(String(row.id))}
                disabled={isBlockPending || row.isBlocked}
              >
                <div className="flex items-center gap-2">
                  <Ban size={16} />
                  <span>{row.isBlocked ? "Blocked" : "Block"}</span>
                </div>
              </Button>
            </div>
          );
        },
      },
    ],
    [blockCustomer, isBlockPending],
  );

  const customerRows = Array.isArray((customerList as any)?.data)
    ? (customerList as any).data
    : Array.isArray(customerList)
      ? customerList
      : [];

  return (
    <DataListTable
      columns={coloumn}
      data={customerRows}
      isLoding={customerListLoading}
    />
  );
};
