/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
import { useVehicleBrandListing } from "@/hooks/useVehicleQuery";
import { Button } from "@/components/ui/button";
import { AddBrandSheet } from "./AddBrandsheet";
// later you can replace with useVehicleList hook

export const BrandTable: React.FC = () => {

  const { data: vehicleBrandListing, isLoading: isVehicleBrandListingLoading } = useVehicleBrandListing();

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Brand",
        accessor: "name",
      },
      {
        header: "Number of Vehicles",
        accessor: "numberOfVehicle",
      },
      {
        header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );
  const [search, setSearch] = useState("");
  const vehicleData = vehicleBrandListing?.data?.[1] ?? [];

  const filteredData = vehicleData.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">
        Vehicle Brands
        <div className="text-sm font-normal mt-3">
          Listed Brands : {vehicleBrandListing?.data?.[0]?.ListedBrands}
        </div>
      </div>
      <SearchAndAddSection search={search}
        onSearchChange={setSearch}
        data={vehicleBrandListing?.data?.[1] ?? []}
        action={
           <AddBrandSheet/>
        }
      >
      </SearchAndAddSection>
      <DataListTable
        columns={columns}
        data={filteredData}
        isLoding={isVehicleBrandListingLoading}
      />
    </div>
  );
};

