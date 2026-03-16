"use client";
import {
  PageFilters,
  SearchableFilterDropdown,
} from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AddVehicleSheet } from "./AddVehicleSheet";
import { VehicleTable } from "./VehicleModelTable";
import { useVehicleModelsListing } from "@/hooks/useVehicleQuery";

export const VehicleModels: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
  const [vehicleTypeSearch, setVehicleTypeSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const filterButtons = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon />
      </button>,
      <SearchableFilterDropdown
        key="brand"
        label="Brand"
        options={brandOptions}
        selectedValues={selectedBrands}
        onChange={(next) => {
          setSelectedBrands(next);
          setPage(1);
        }}
        searchValue={brandSearch}
        onSearchChange={setBrandSearch}
        searchPlaceholder="Search brand"
        className="border-r-2 border-[#EDEDED] pr-2"
      />,
      <SearchableFilterDropdown
        key="vehicle-type"
        label="Vehicle Type"
        options={vehicleTypeOptions}
        selectedValues={selectedVehicleTypes}
        onChange={(next) => {
          setSelectedVehicleTypes(next);
          setPage(1);
        }}
        searchValue={vehicleTypeSearch}
        onSearchChange={setVehicleTypeSearch}
        searchPlaceholder="Search type"
      />,
    ],
    [
      brandSearch,
      selectedBrands,
      selectedVehicleTypes,
      vehicleTypeSearch,
    ],
  );

  const payload = useMemo(
    () => ({
      page,
      limit,
    }),
    [page, limit],
  );

  const { data: vehicleModelsListing, isLoading: isVehicleModelsListingLoading } =
    useVehicleModelsListing(payload);

  const pagination = vehicleModelsListing?.pagination
    ? {
        page,
        pageSize: limit,
        total: vehicleModelsListing.pagination.total,
        onPageChange: setPage,
      }
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PageFilters filters={filterButtons} />
        <AddVehicleSheet />
      </div>
      <VehicleTable
        data={vehicleModelsListing?.data}
        isLoading={isVehicleModelsListingLoading}
        pagination={pagination}
      />
    </div>
  );
};

const brandOptions = [
  { label: "Toyota", value: "toyota" },
  { label: "Nissan", value: "nissan" },
  { label: "Honda", value: "honda" },
  { label: "BMW", value: "bmw" },
  { label: "Mercedes", value: "mercedes" },
];

const vehicleTypeOptions = [
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Hatchback", value: "hatchback" },
  { label: "Coupe", value: "coupe" },
  { label: "Pickup", value: "pickup" },
];
