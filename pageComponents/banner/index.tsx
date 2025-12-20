import { BannerFilters } from "@/components/banner/BannerFilters";
import { CreateBannerSheet } from "@/components/banner/CreateBannerSheet";
import React from "react";

export const BannerPageContent: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <BannerFilters />
        <div className="flex gap-2">
          <button
            className="bg-white border border-[#D6D6D6] rounded-md px-2 py-1.5  whitespace-nowrap hover:cursor-pointer hover:bg-gray-100"
          >
            Update Category
          </button>
          <CreateBannerSheet />
        </div>
      </div>
    </div>
  );
};
