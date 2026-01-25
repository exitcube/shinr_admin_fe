'use client';
import { PageFilters } from "@/components/common/PageFilter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FilterIcon } from "lucide-react";
import React from "react";
import { AddVehicleSheet } from "./AddVehicleSheet";

export const VehicleModels: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageFilters filters={filterButtons} />
        <AddVehicleSheet />
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
    className="flex gap-2 items-center border-r-2 border-[#EDEDED] pr-2 text-xs font-medium"
  >
    Brand <MagnifyingGlassIcon height={18} width={18}/>
  </button>,
  <button
    key="authenticity"
    className="flex gap-2 items-center text-xs font-medium"
  >
    Vehicle Type <MagnifyingGlassIcon height={18} width={18}/>
  </button>,
];