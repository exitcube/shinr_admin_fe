/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
// later you can replace with useVehicleList hook

export const VehicleTable: React.FC = () => {
  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Model",
        accessor: "model",
      },
      {
        header: "Brand",
        accessor: "make",
      },
      {
        header: "Vehicle Type",
        accessor: "category",
      },
      {
        header: "Actions",
        accessor: "actions",
      },
    ],
    [],
  );

  return (
    <div>
      <DataListTable columns={columns} data={vehicleData} />
    </div>
  );
};

const vehicleData = [
  {
    id: 1,
    model: "Corolla",
    make: "Toyota",
    category: "Sedan",
  },
  {
    id: 2,
    model: "F-150",
    make: "Ford",
    category: "Pickup Truck",
  },
  {
    id: 3,
    model: "Wrangler",
    make: "Jeep",
    category: "SUV",
  },
  {
    id: 4,
    model: "Civic",
    make: "Honda",
    category: "Hatchback",
  },
  {
    id: 5,
    model: "XC90",
    make: "Volvo",
    category: "SUV",
  },
];
