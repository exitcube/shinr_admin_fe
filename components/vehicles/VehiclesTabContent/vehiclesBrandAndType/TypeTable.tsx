/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
// later you can replace with useVehicleList hook

export const TypeTable: React.FC = () => {
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Type",
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
    [],
  );

  return (
  <div className="flex flex-col gap-2">
    <div className="text-lg font-semibold">
      Vehicle Types
      <div className="text-sm font-normal mt-3">Listed Types : 4</div>
    </div>

    <SearchAndAddSection data={vehicleData}>
      + Add Type
    </SearchAndAddSection>

    <DataListTable columns={columns} data={vehicleData} />
  </div>
  );
};

const vehicleData = [
  {
    name: "Sedan",
    numberOfVehicles: 10,
  },
  {
    name: "Pickup Truck",
    numberOfVehicles: 20,
  },
  {
    name: "SUV",
    numberOfVehicles: 30,
  },
  {
    name: "Hatchback",
    numberOfVehicles: 40,
  },
];
