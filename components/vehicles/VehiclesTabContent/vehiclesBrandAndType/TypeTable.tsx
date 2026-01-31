/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
import { useVehicleTypeListing } from "@/hooks/useVehicleQuery";
import { Button } from "@/components/ui/button";
import { AddTypeSheet } from "./AddTypeSheet";
// later you can replace with useVehicleList hook

export const TypeTable: React.FC = () => {

  const { data: vehicleTypeListing, isLoading: isVehicleTypeLoading } = useVehicleTypeListing();

  const columns: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Type",
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
    [],
  );
  const [search, setSearch] = useState("");

  const vehicleData = vehicleTypeListing?.data?.[1] ?? [];

  const filteredData = vehicleData.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">
        Vehicle Types
        <div className="text-sm font-normal mt-3">Listed Types : {vehicleTypeListing?.data?.[0]?.ListedVehicleTypes}</div>
      </div>

      <SearchAndAddSection search={search}
        onSearchChange={setSearch}
        data={vehicleTypeListing?.data?.[1] ?? []}
        action={
          <AddTypeSheet />
        }
      >
      </SearchAndAddSection>

      <DataListTable columns={columns} data={filteredData} isLoding={isVehicleTypeLoading} />
    </div>
  );
};

