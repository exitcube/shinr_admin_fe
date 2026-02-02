/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import {
  useDeleteVehicleMutation,
  useVehicleModelsListing,
} from "@/hooks/useVehicleQuery";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export const VehicleTable: React.FC = () => {
  const {
    data: vehicleModelsListing,
    isLoading: isVehicleModelsListingLoading,
  } = useVehicleModelsListing();
  const { mutate: deleteVehicleMutation } = useDeleteVehicleMutation();
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
    deleteVehicleMutation(selectedVehicleId, {
      onSuccess: () => {
        toast.success("Vehicle deleted successfully");
      },
      onError: () => {
        toast.error("Vehicle deleted failed");
      },
    });
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

  return (
    <div>
      <DataListTable
        columns={columns}
        data={vehicleModelsListing?.data ?? []}
        isLoding={isVehicleModelsListingLoading}
      />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle?"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
