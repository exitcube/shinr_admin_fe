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

export const RewardsPageContent: React.FC = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [authenticity, setAuthenticity] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

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
        onChange={setStatus}
        className="border-r-2 border-[#EDEDED] pr-2"
      />,
      <AuthenticityFilterDropdown
        key="authenticity"
        selectedAuthenticity={authenticity}
        onAuthenticityChange={setAuthenticity}
        selectedVendors={selectedVendors}
        onVendorsChange={setSelectedVendors}
      />,
    ],
    [authenticity, selectedVendors, status],
  );

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filters} />
          <div className="flex gap-2">
            <CreateRewardSheet />
          </div>
        </div>
        <RewardsTable />
      </div>
    </div>
  );
};

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Expired", value: "expired" },
];
