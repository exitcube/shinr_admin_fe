/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import { Ban } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useBlockCustomer, useCustomerList, useUnblockCustomer } from "@/hooks/useCustomerQuery";
import { DeleteConfirmationDialog } from "../common/DeleteConfirmationDialog";

const formatDateOnly = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().split("T")[0];
};

export const CustomerTable: React.FC = () => {
  const { data: customerList, isLoading: customerListLoading } = useCustomerList();
  const { mutate: blockCustomer, isPending: isBlockPending } = useBlockCustomer();
  const { mutate: unblockCustomer, isPending: isUnblockPending } = useUnblockCustomer();

  const [confirmAction, setConfirmAction] = useState<"block" | "unblock" | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleOpenConfirmDialog = (id: string, action: "block" | "unblock") => {
    setSelectedCustomerId(id);
    setConfirmAction(action);
  };
  const handleConfirmAction = () => {
    if (!selectedCustomerId || !confirmAction) return;
    if (confirmAction === "block") {
      blockCustomer(selectedCustomerId);
    } else {
      unblockCustomer(selectedCustomerId);
    }
    setConfirmAction(null);
    setSelectedCustomerId(null);
  };
  const handleCancelAction = () => {
    setConfirmAction(null);
    setSelectedCustomerId(null);
  };

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
                className={
                  row.isBlocked
                    ? "bg-green-50 text-green-600 px-3 py-2 rounded hover:bg-green-100 transition-colors"
                    : "bg-red-50 text-red-500 px-3 py-2 rounded hover:bg-red-100 transition-colors"
                }
                onClick={() => handleOpenConfirmDialog(String(row.id), row.isBlocked ? "unblock" : "block")}
                disabled={isBlockPending || isUnblockPending}
              >
                <div className="flex items-center gap-2">
                  {!row.isBlocked && <Ban size={16} />}
                  <span>{row.isBlocked ? "Unblock" : "Block"}</span>
                </div>
              </Button>
            </div>
          );
        },
      },
    ],
    [handleOpenConfirmDialog, isBlockPending, isUnblockPending],
  );

  const customerRows = Array.isArray((customerList as any)?.data)
    ? (customerList as any).data
    : Array.isArray(customerList)
      ? customerList
      : [];

  return (
    <div>
      <DataListTable
        columns={coloumn}
        data={customerRows}
        isLoding={customerListLoading}
      />
      <DeleteConfirmationDialog
        open={!!confirmAction}
        title={confirmAction === "unblock" ? "Unblock Customer" : "Block Customer"}
        description={
          confirmAction === "unblock"
            ? "Are you sure you want to unblock this customer?"
            : "Are you sure you want to block this customer?"
        }
        confirmButtonLabel={confirmAction === "unblock" ? "Unblock" : "Block"}
        confirmButtonClassName={
          confirmAction === "unblock" ? "text-green-600 border-green-600" : "text-red-500 border-red-500"
        }
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  );
};
