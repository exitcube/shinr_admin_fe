/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
// later you can replace with useVehicleList hook

export const BrandTable: React.FC = () => {

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Brand",
        accessor: "name",
      },
      {
        header: "Number of Vehicles",
        accessor: "numberOfVehicles",
      },
      {
        header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">
        Vehicle Brands
        <div className="text-sm font-normal mt-3">
          Listed Brands : 5
        </div>
      </div>
      <SearchAndAddSection data={vehicleData}>
        + Add Brand
      </SearchAndAddSection>
      <DataListTable
        columns={columns}
        data={vehicleData}
      />
    </div>
  );
};

const vehicleData = [
  {
    name: "Toyota",
    numberOfVehicles: 10,
  },
  {
    name: "Ford",
    numberOfVehicles: 20,
  },
  {
    name: "Jeep",
    numberOfVehicles: 30,
  },
  {
    name: "Honda",
    numberOfVehicles: 40,
  },
  {
    name: "Volvo",
    numberOfVehicles: 50,
  },
];