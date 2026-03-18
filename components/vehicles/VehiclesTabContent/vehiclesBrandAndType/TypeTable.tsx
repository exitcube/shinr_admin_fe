/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
import {
  useDeleteVehicleTypeMutation,
  useVehicleTypeListing,
} from "@/hooks/useVehicleQuery";
import { AddTypeSheet } from "./AddTypeSheet";
import { Pencil, Trash } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { EditTypeSheet } from "./EditVehiclesTypesSheet";

export const TypeTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const queryParams = React.useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (search.trim()) {
      params.set("searchVehicleTypeName", search.trim());
    }
    return params;
  }, [page, limit, search]);

  const { data: vehicleTypeListing, isLoading: isVehicleTypeLoading } =
    useVehicleTypeListing(queryParams);

  const { mutate: deleteVehicleTypeMutation } = useDeleteVehicleTypeMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [selectedType, setSelectedType] = useState<any>(null);

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
                onClick={() => {
                  setSelectedType(row);
                  setOpenEditSheet(true);
                }}
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
  const vehicleData = vehicleTypeListing?.data?.[1] ?? [];
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const pagination = vehicleTypeListing
    ? {
        page,
        pageSize: limit,
        total: vehicleTypeListing.pagination?.total ?? vehicleData.length,
        onPageChange: setPage,
      }
    : undefined;

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
        onSearchChange={handleSearchChange}
        data={vehicleTypeListing?.data?.[1] ?? []}
        action={<AddTypeSheet />}
      ></SearchAndAddSection>

      <DataListTable
        columns={columns}
        data={vehicleData}
        isLoding={isVehicleTypeLoading}
        pagination={pagination}
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
      {openEditSheet && selectedType && (
        <EditTypeSheet
          open={openEditSheet}
          setOpen={setOpenEditSheet}
          typeId={selectedType.id}
          typeData={selectedType}
        />)}
    </div>
  );
};
