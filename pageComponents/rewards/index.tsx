"use client";
import { PageFilters } from "@/components/common/PageFilter";
import { CreateRewardSheet } from "@/components/rewards/CreateRewardSheet";
import { RewardsTable } from "@/components/rewards/RewardsTable";
import { ChevronDown, FilterIcon } from "lucide-react";
import React from "react";

export const RewardsPageContent: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filterButtons} />
          <div className="flex gap-2">
            <CreateRewardSheet />
          </div>
        </div>
        <RewardsTable />
      </div>
    </div>
  );
};

const filterButtons = [
  <button
    key="filter"
    className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
  >
    <FilterIcon />
  </button>,
  <button
    key="status"
    className="flex gap-1 items-center border-r-2 border-[#EDEDED] pr-2 text-xs font-medium"
  >
    Status <ChevronDown />
  </button>,
  <button
    key="authenticity"
    className="flex gap-1 items-center text-xs font-medium"
  >
    Authenticity <ChevronDown />
  </button>,
];
