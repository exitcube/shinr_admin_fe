/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";
import { useRewardList } from "@/hooks/useRewardQuery";



export const RewardsTable: React.FC = () => {
  const { data: rewardList, isLoading: rewardListLoading } = useRewardList();
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
            : row.owner?.displayText ?? "-",
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
        }
      },
      {
        header: "End Date & Time",
        accessor: "endDate",
        cell: (row) => {
          if (!row.endDate) return "-";
          return new Date(row.endDate).toISOString().split("T")[0];
        }
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

 