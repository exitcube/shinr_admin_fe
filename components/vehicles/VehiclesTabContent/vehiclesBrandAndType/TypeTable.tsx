/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
import {
  useDeleteVehicleTypeMutation,
  useVehicleTypeListing,
} from "@/hooks/useVehicleQuery";
import { Button } from "@/components/ui/button";
import { AddTypeSheet } from "./AddTypeSheet";
import { Pencil, Trash } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
// later you can replace with useVehicleList hook

export const TypeTable: React.FC = () => {
  const { data: vehicleTypeListing, isLoading: isVehicleTypeLoading } =
    useVehicleTypeListing();

  const { mutate: deleteVehicleTypeMutation } = useDeleteVehicleTypeMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedVehicleId(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (!selectedVehicleId) return;
    deleteVehicleTypeMutation(selectedVehicleId);
    setOpenDeleteDialog(false);
    setSelectedVehicleId(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedVehicleId(null);
  };
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
        cell: (row) => {
          return (
            <div className="flex gap-2">
              <button
                className="bg-green-50 text-green-500 p-2 rounded hover:bg-green-100 transition-colors"
                aria-label="Edit"
              >
                <Pencil size={18} />
              </button>

              <button
                className="bg-red-50 text-red-500 p-2 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleOpenDeleteDialog(row.id)}
                aria-label="Delete"
              >
                <Trash size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );
  const [search, setSearch] = useState("");

  const vehicleData = vehicleTypeListing?.data?.[1] ?? [];

  const filteredData = vehicleData.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">
        Vehicle Types
        <div className="text-sm font-normal mt-3">
          Listed Types : {vehicleTypeListing?.data?.[0]?.ListedVehicleTypes}
        </div>
      </div>

      <SearchAndAddSection
        search={search}
        onSearchChange={setSearch}
        data={vehicleTypeListing?.data?.[1] ?? []}
        action={<AddTypeSheet />}
      ></SearchAndAddSection>

      <DataListTable
        columns={columns}
        data={filteredData}
        isLoding={isVehicleTypeLoading}
      />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete Vehicle Brand"
        description="Are you sure you want to delete this vehicle brand?"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
