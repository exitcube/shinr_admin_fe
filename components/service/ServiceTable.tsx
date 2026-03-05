/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteConfirmationDialog } from "../common/DeleteConfirmationDialog";
import { useDeleteServiceMutation, useServiceList } from "@/hooks/useServiceQuery";
import { EditServiceSheet } from "./EditServiceSheet";
import Link from "next/link";

export const ServiceTable: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: serviceList, isLoading: serviceListLoading } = useServiceList();
  const { mutate: deleteService } = useDeleteServiceMutation();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);


  const handleOpenDeleteDialog = (id: number) => {
    setSelectedServiceId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedServiceId) return;
    deleteService(String(selectedServiceId));
    setOpenDeleteDialog(false);
    setSelectedServiceId(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedServiceId(null);
  };

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "DisplayName",
        accessor: "displayName",
        cell: (row) => {
          return (
            <div>
              <Link href={`/service/${row.id}`} className="text-xs underline">
                {row.displayName}
              </Link>
            </div>
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
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => {
          return (
            <div className="flex gap-2">
              <Button
                className="bg-green-50 text-green-500 p-2 rounded hover:bg-green-100 transition-colors"
                aria-label="Edit"
                onClick={() => {
                  setIsEditOpen(true);
                  setSelectedServiceId(row.id);
                }}
              >
                <Pencil size={18} />
              </Button>

              <Button
                className="bg-red-50 text-red-500 p-2 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleOpenDeleteDialog(Number(row.id))}
                aria-label="Delete"
              >
                <Trash size={18} />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );
  return (
    <div>
      <DataListTable columns={columns} data={serviceList?.data ?? []} isLoding={serviceListLoading} />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete Service"
        description="Are you sure you want to delete this service?"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {selectedServiceId && isEditOpen && (
        <EditServiceSheet
          open={isEditOpen}
          setOpen={setIsEditOpen}
          serviceId={selectedServiceId}
        />
      )}
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

