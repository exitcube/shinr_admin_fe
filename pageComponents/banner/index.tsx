"use client";
import { BannerTable } from "@/components/banner/BannerTable";
import { CreateBannerSheet } from "@/components/banner/CreateBannerSheet";
import { PageFilters } from "@/components/common/PageFilter";
import { useBannerList } from "@/hooks/useBannerQuery";
import { FilterIcon, ChevronDown } from "lucide-react";
import React from "react";

export const BannerPageContent: React.FC = () => {
  const { data: banners, isLoading: bannersLoading } = useBannerList();
  console.log({ banners });

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filterButtons} />;
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

const filterButtons = [
  <button key="filter" className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium">
    <FilterIcon />
  </button>,
  <button key="status" className="flex gap-1 items-center border-r-2 border-[#EDEDED] pr-2 text-xs font-medium">
    Status <ChevronDown />
  </button>,
  <button key="authenticity" className="flex gap-1 items-center text-xs font-medium">
    Authenticity <ChevronDown />
  </button>,
];
