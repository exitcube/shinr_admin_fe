/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";
import { useBannerList, useDeleteBannerMutation } from "@/hooks/useBannerQuery";
import { Pencil, Trash } from "lucide-react";
import { DeleteConfirmationDialog } from "../common/DeleteConfirmationDialog";
import { toast } from "sonner";

export const BannerTable: React.FC = () => {
  const { data: bannerList, isLoading: bannersLoading } = useBannerList();
  const { mutate: deleteBannerMutation } = useDeleteBannerMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(
    null,
  );

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedBannerId(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (!selectedBannerId) return;
    deleteBannerMutation(selectedBannerId, {
      onSuccess: () => {
        toast.success("Banner deleted successfully");
      },
      onError: () => {
        toast.error("Banner deleted failed");
      },
    });
    setOpenDeleteDialog(false);
    setSelectedBannerId(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedBannerId(null);
  };

  const coloumn: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Title",
        accessor: "title",
        cell: (row) => {
          return (
            <div>
              <Link href={`/banner/${row.id}`} className="text-xs underline">
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
        },
      },
      {
        header: "End Date & Time",
        accessor: "endTime",
        cell: (row) => {
          if (!row.endTime) return "-";
          return new Date(row.endTime).toISOString().split("T")[0];
        },
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
      {
        header: "Actions",
        accessor: "actions",
        cell: (row) => {
          return (
            <div className="flex gap-2">
              <button
                className="bg-green-50 text-green-500 p-2 rounded hover:bg-green-100 transition-colors"
                aria-label="Edit"
              >
                <Pencil size={18} />
              </button>

              <button
                className="bg-red-50 text-red-500 p-2 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleOpenDeleteDialog(row.id)}
                aria-label="Delete"
              >
                <Trash size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [bannerList],
  );
  return (
    <div>
      <DataListTable
        columns={coloumn}
        data={bannerList?.data ?? []}
        isLoding={bannersLoading}
      />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete Banner"
        description="Are you sure you want to delete this banner?"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
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
