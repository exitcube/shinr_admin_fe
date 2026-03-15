"use client";
import {
  FilterDropdown,
  PageFilters,
} from "@/components/common/PageFilter";
import { AuthenticityFilterDropdown } from "@/components/common/AuthenticityFilterDropdown";
import { CreateRewardSheet } from "@/components/rewards/CreateRewardSheet";
import { RewardsTable } from "@/components/rewards/RewardsTable";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useRewardList, useVendorListQuery } from "@/hooks/useRewardQuery";
import { RewardListPayload } from "@/types/reward";

export const RewardsPageContent: React.FC = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [authenticity, setAuthenticity] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: vendorList } = useVendorListQuery();

  const filters = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon />
      </button>,
      <FilterDropdown
        key="status"
        label="Status"
        options={statusOptions}
        selectedValues={status}
        onChange={(next) => {
          setStatus(next);
          setPage(1);
        }}
        className="border-r-2 border-[#EDEDED] pr-2"
      />,
      <AuthenticityFilterDropdown
        key="authenticity"
        selectedAuthenticity={authenticity}
        onAuthenticityChange={(next) => {
          setAuthenticity(next);
          setPage(1);
        }}
        selectedVendors={selectedVendors}
        onVendorsChange={(next) => {
          setSelectedVendors(next);
          setPage(1);
        }}
        vendorOptions={
          vendorList?.data?.map((vendor) => ({
            label: vendor.name,
            value: String(vendor.id),
          })) ?? undefined
        }
      />,
    ],
    [authenticity, selectedVendors, status, vendorList],
  );

  const payload: RewardListPayload = useMemo(() => {
    const vendorId = selectedVendors
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
    const owner =
      authenticity.length === 1 ? (authenticity[0] as "SHINR" | "VENDOR") : undefined;

    return {
      status: status.length ? (status as RewardListPayload["status"]) : undefined,
      owner,
      vendorId: vendorId.length ? vendorId : undefined,
      page,
      limit,
    };
  }, [status, authenticity, selectedVendors, page, limit]);

  const { data: rewardList, isLoading: rewardListLoading } =
    useRewardList(payload);

  const pagination = rewardList?.pagination
    ? {
        page: rewardList.pagination.page,
        pageSize: rewardList.pagination.limit,
        total: rewardList.pagination.total,
        onPageChange: setPage,
      }
    : undefined;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filters} />
          <div className="flex gap-2">
            <CreateRewardSheet />
          </div>
        </div>
        <RewardsTable
          data={rewardList?.data}
          isLoading={rewardListLoading}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Draft", value: "DRAFT" },
  { label: "Expired", value: "EXPIRED" },
];
