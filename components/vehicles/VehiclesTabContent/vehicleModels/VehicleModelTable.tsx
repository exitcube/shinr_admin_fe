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
import { Button } from "@/components/ui/button";
import { EditVehicleSheet } from "./EditVehicleModelsheet";

export const VehicleTable: React.FC = () => {
  const {
    data: vehicleModelsListing,
    isLoading: isVehicleModelsListingLoading,
  } = useVehicleModelsListing();
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
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
    deleteVehicleMutation(selectedVehicleId);
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

              <Button
                className="bg-green-50 text-green-500 p-2 rounded hover:bg-green-100 transition-colors"
                aria-label="Edit"
                onClick={() => {
                  setSelectedVehicle(row);   
                  setOpenEditSheet(true);   
                }}
              >
                <Pencil size={18} />
              </Button>

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
      {openEditSheet && selectedVehicle && (
      <EditVehicleSheet
        open={openEditSheet}
        setOpen={setOpenEditSheet}
        vehicleId={selectedVehicle.id}
        vehicleData={selectedVehicle}
        
      />
    )}
    </div>
  );
};
