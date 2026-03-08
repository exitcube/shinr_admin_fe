"use client";
import { BannerTable } from "@/components/banner/BannerTable";
import { CreateBannerSheet } from "@/components/banner/CreateBannerSheet";
import { FilterDropdown, PageFilters } from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AuthenticityFilterDropdown } from "@/components/common/AuthenticityFilterDropdown";

export const BannerPageContent: React.FC = () => {
  const [reviewStatus, setReviewStatus] = useState<string[]>([]);
  const [authenticity, setAuthenticity] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const filters = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon size={16} />
      </button>,
      <FilterDropdown
        key="status"
        label="Review Status"
        options={reviewStatusOptions}
        selectedValues={reviewStatus}
        onChange={setReviewStatus}
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
    [authenticity, reviewStatus, selectedVendors],
  );

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filters} />
          <div className="flex gap-2">
            <button className="bg-white border border-[#D6D6D6] rounded-md px-2 py-1.5  whitespace-nowrap hover:cursor-pointer hover:bg-gray-100 text-sm">
              Update Category
            </button>
            <CreateBannerSheet />
          </div>
        </div>
        <BannerTable />
      </div>
    </div>
  );
};

const reviewStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Approve", value: "approve" },
  { label: "Reject", value: "reject" },
];
