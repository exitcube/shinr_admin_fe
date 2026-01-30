/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { useVehicleModelsListing } from "@/hooks/useVehicleQuery";

export const VehicleTable: React.FC = () => {
  const { data: vehicleModelsListing, isLoading: isVehicleModelsListingLoading } = useVehicleModelsListing();
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
      <DataListTable columns={columns} data={vehicleModelsListing?.data ?? []} isLoding={isVehicleModelsListingLoading} />
    </div>
  );
};

 