"use client";
import {
  PageFilters,
  SearchableFilterDropdown,
} from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AddVehicleSheet } from "./AddVehicleSheet";
import { VehicleTable } from "./VehicleModelTable";
import {
  useVehicleBrandListing,
  useVehicleModelsListing,
  useVehicleTypeListing,
} from "@/hooks/useVehicleQuery";

export const VehicleModels: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [brandFilterPage, setBrandFilterPage] = useState(1);
  const [brandOptions, setBrandOptions] = useState<{ label: string; value: string }[]>([]);
  const [hasMoreBrandOptions, setHasMoreBrandOptions] = useState(false);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
  const [vehicleTypeSearch, setVehicleTypeSearch] = useState("");
  const [vehicleTypeFilterPage, setVehicleTypeFilterPage] = useState(1);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<{ label: string; value: string }[]>([]);
  const [hasMoreVehicleTypeOptions, setHasMoreVehicleTypeOptions] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const brandFilterQueryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(brandFilterPage));
    params.set("limit", "10");
    if (brandSearch.trim()) {
      params.set("searchBrandName", brandSearch.trim());
    }
    return params;
  }, [brandFilterPage, brandSearch]);

  const vehicleTypeFilterQueryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(vehicleTypeFilterPage));
    params.set("limit", "10");
    if (vehicleTypeSearch.trim()) {
      params.set("searchVehicleTypeName", vehicleTypeSearch.trim());
    }
    return params;
  }, [vehicleTypeFilterPage, vehicleTypeSearch]);

  const { data: vehicleBrandListing, isLoading: isVehicleBrandListingLoading } =
    useVehicleBrandListing(brandFilterQueryParams);
  const { data: vehicleTypeListing, isLoading: isVehicleTypeListingLoading } =
    useVehicleTypeListing(vehicleTypeFilterQueryParams);

  React.useEffect(() => {
    const nextOptions =
      vehicleBrandListing?.data?.[1]?.map((brand) => ({
        label: brand.name,
        value: String(brand.id),
      })) ?? [];

    setBrandOptions((prev) => {
      if (brandFilterPage === 1) {
        return nextOptions;
      }

      const existingValues = new Set(prev.map((option) => option.value));
      const merged = [...prev];

      nextOptions.forEach((option) => {
        if (!existingValues.has(option.value)) {
          merged.push(option);
        }
      });

      return merged;
    });

    setHasMoreBrandOptions(Boolean(vehicleBrandListing?.pagination?.hasNext));
  }, [vehicleBrandListing, brandFilterPage]);

  React.useEffect(() => {
    const nextOptions =
      vehicleTypeListing?.data?.[1]?.map((type) => ({
        label: type.name,
        value: String(type.id),
      })) ?? [];

    setVehicleTypeOptions((prev) => {
      if (vehicleTypeFilterPage === 1) {
        return nextOptions;
      }

      const existingValues = new Set(prev.map((option) => option.value));
      const merged = [...prev];

      nextOptions.forEach((option) => {
        if (!existingValues.has(option.value)) {
          merged.push(option);
        }
      });

      return merged;
    });

    setHasMoreVehicleTypeOptions(Boolean(vehicleTypeListing?.pagination?.hasNext));
  }, [vehicleTypeListing, vehicleTypeFilterPage]);

  const handleBrandFilterSearchChange = (value: string) => {
    setBrandFilterPage(1);
    setBrandSearch(value);
  };

  const handleLoadMoreBrandOptions = () => {
    if (hasMoreBrandOptions && !isVehicleBrandListingLoading) {
      setBrandFilterPage((prev) => prev + 1);
    }
  };

  const handleVehicleTypeFilterSearchChange = (value: string) => {
    setVehicleTypeFilterPage(1);
    setVehicleTypeSearch(value);
  };

  const handleLoadMoreVehicleTypeOptions = () => {
    if (hasMoreVehicleTypeOptions && !isVehicleTypeListingLoading) {
      setVehicleTypeFilterPage((prev) => prev + 1);
    }
  };

  const filterButtons = [
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
      onSearchChange={handleBrandFilterSearchChange}
      searchPlaceholder="Search brand"
      className="border-r-2 border-[#EDEDED] pr-2"
      hasMore={hasMoreBrandOptions}
      onLoadMore={handleLoadMoreBrandOptions}
      isLoading={isVehicleBrandListingLoading}
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
      onSearchChange={handleVehicleTypeFilterSearchChange}
      searchPlaceholder="Search type"
      hasMore={hasMoreVehicleTypeOptions}
      onLoadMore={handleLoadMoreVehicleTypeOptions}
      isLoading={isVehicleTypeListingLoading}
    />,
  ];

  const payload = useMemo(
    () => {
      const nextPayload: {
        page: number;
        limit: number;
        searchBrandId?: number[];
        searchVehicleTypeId?: number[];
      } = {
        page,
        limit,
      };

      if (selectedBrands.length > 0) {
        nextPayload.searchBrandId = selectedBrands.map((id) => Number(id));
      }

      if (selectedVehicleTypes.length > 0) {
        nextPayload.searchVehicleTypeId = selectedVehicleTypes.map((id) => Number(id));
      }

      return nextPayload;
    },
    [page, limit, selectedBrands, selectedVehicleTypes],
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
