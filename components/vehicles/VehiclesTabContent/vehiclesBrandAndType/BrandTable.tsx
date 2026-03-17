/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../../../common/DataListTable";
import { SearchAndAddSection } from "../SearchAndAddSection";
import {
  useDeleteVehicleBrandMutation,
  useVehicleBrandListing,
} from "@/hooks/useVehicleQuery";
import { AddBrandSheet } from "./AddBrandsheet";
import { BadgeCheck, Crown, Pencil, Trash } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { EditBrandSheet } from "./EditBrandSheet";
// later you can replace with useVehicleList hook

export const BrandTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const queryParams = React.useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (search.trim()) {
      params.set("searchBrandName", search.trim());
    }
    return params;
  }, [page, limit, search]);
  const { data: vehicleBrandListing, isLoading: isVehicleBrandListingLoading } =
    useVehicleBrandListing(queryParams);
  const { mutate: deleteVehicleBrandMutation } = useDeleteVehicleBrandMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedVehicleId(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (!selectedVehicleId) return;
    deleteVehicleBrandMutation(selectedVehicleId);
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
        header: "Brand",
        accessor: "name",
      },
      {
        header: "Number of Vehicles",
        accessor: "numberOfVehicle",
      },
      {
        header: "Tier",
        accessor: "tier",
        cell: (row) => {
          const tier = String(row.tier ?? "").toLowerCase();
          if (tier === "premium") {
            return (
              <span className="inline-flex items-center gap-1 text-[#C08A00]">
                <Crown size={14} />
                <span className="text-xs">Premium</span>
              </span>
            );
          }
          if (tier === "standard") {
            return (
              <span className="inline-flex items-center gap-1 text-[#6B7280]">
                <BadgeCheck size={14} />
                <span className="text-xs">Standard</span>
              </span>
            );
          }
          return <span className="text-xs">{row.tier ?? "-"}</span>;
        },
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
                  setSelectedBrand(row);
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
  const vehicleData = vehicleBrandListing?.data?.[1] ?? [];
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const pagination = vehicleBrandListing?.pagination
    ? {
        page,
        pageSize: limit,
        total: vehicleBrandListing.pagination.total,
        onPageChange: setPage,
      }
    : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold">
        Vehicle Brands
        <div className="text-sm font-normal mt-3">
          Listed Brands : {vehicleBrandListing?.data?.[0]?.ListedBrands}
        </div>
      </div>
      <SearchAndAddSection
        search={search}
        onSearchChange={handleSearchChange}
        data={vehicleBrandListing?.data?.[1] ?? []}
        action={<AddBrandSheet />}
      ></SearchAndAddSection>
      <DataListTable
        columns={columns}
        data={vehicleData}
        isLoding={isVehicleBrandListingLoading}
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
      {openEditSheet && selectedBrand && (
        <EditBrandSheet
          open={openEditSheet}
          setOpen={setOpenEditSheet}
          brandId={selectedBrand.id}
          brandData={selectedBrand}
        />)}
    </div>
  );
};
