import React from "react";
import { FilterIcon } from "../assets/Icons/FilterIcon";
import { ChevronDown } from "lucide-react";

export const BannerFilters: React.FC = () => {
  return (
    <div className="bg-white flex items-center px-4 py-2.5 gap-3 border border-[#D6D6D6] rounded-md">
      <button className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E]">
        <FilterIcon />
      </button>
      <button className="flex gap-1 items-center border-r-2 border-[#EDEDED] pr-2">Status <ChevronDown /></button>
      <button className="flex gap-1 items-center">Authenticity <ChevronDown /></button>
    </div>
  );
};
