/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";
import { useDeleteRewardMutation, useRewardList } from "@/hooks/useRewardQuery";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "../common/DeleteConfirmationDialog";
import { Button } from "../ui/button";
import { EditRewardSheet } from "./EditRewardSheet";

export const RewardsTable: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: rewardList, isLoading: rewardListLoading } = useRewardList();
  const { mutate: deleteRewardMutation } = useDeleteRewardMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(
    null,
  );

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedRewardId(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (!selectedRewardId) return;
    deleteRewardMutation(selectedRewardId);
    setOpenDeleteDialog(false);
    setSelectedRewardId(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedRewardId(null);
  };
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
        cell: (row) => row.category?.displayText ?? "-",
      },

      {
        header: "Authenticity",
        accessor: "owner",
        cell: (row) =>
          typeof row.owner === "string"
            ? row.owner
            : (row.owner?.displayText ?? "-"),
      },

      // {
      //   header: "Service Category",
      //   accessor: "service_category",
      //   cell: (row) => row.service_category?.displayText ?? "-",
      // },

      {
        header: "Start Date & Time",
        accessor: "startDate",
        cell: (row) => {
          if (!row.startDate) return "-";
          return new Date(row.startDate).toISOString().split("T")[0];
        },
      },
      {
        header: "End Date & Time",
        accessor: "endDate",
        cell: (row) => {
          if (!row.endDate) return "-";
          return new Date(row.endDate).toISOString().split("T")[0];
        },
      },
      {
        header: "Status",
        accessor: "status",
        cell: (row) => {
          const status = row.status as keyof typeof REWARD_STATUS_STYLES;

          const styles = REWARD_STATUS_STYLES[status] ?? {
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
                  setSelectedRewardId(row.id);
                }}
              >
                <Pencil size={18} />
              </Button>

              <Button
                className="bg-red-50 text-red-500 p-2 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleOpenDeleteDialog(row.id)}
                aria-label="Delete"
              >
                <Trash size={18} />
              </Button>
            </div>
          );
        },
      },
    ],
    [rewardList],
  );
  return (
    <div>
      <DataListTable
        columns={coloumn}
        data={rewardList?.data ?? []}
        onRowSelectionChange={(selectedIds) =>
          console.log("Selected IDs:", selectedIds)
        }
        isLoding={rewardListLoading}
      />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete Reward"
        description="Are you sure you want to delete this reward?"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {selectedRewardId && isEditOpen && (
        <EditRewardSheet
          rewardId={Number(selectedRewardId)}
          open={isEditOpen}
          setOpen={setIsEditOpen}
        />
      )}
    </div>
  );
};

export const REWARD_STATUS_STYLES: Record<
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
