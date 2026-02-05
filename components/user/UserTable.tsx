/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { EditAdminUserSheet } from "./EditUserSheet";
import { useAdminUserList, useDeleteAdminUserMutation } from "@/hooks/useUserQuery";
import { DeleteConfirmationDialog } from "../common/DeleteConfirmationDialog";

export const AdminUserTable: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: adminUserList, isLoading: adminUserListLoading } = useAdminUserList();
  const { mutate: deleteAdminUser } = useDeleteAdminUserMutation();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null,);
  const handleOpenDeleteDialog = (id: string) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (!selectedUserId) return;
    deleteAdminUser(new URLSearchParams({ adminId: selectedUserId }));
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const coloumn: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Employee Code",
        accessor: "empCode",
        cell: (row) => {
          return (
            <div>
              <Link href={`/adminuser/${row.id}`} className="text-xs">
                {row.empCode}
              </Link>
            </div>
          );
        },
      },
      {
        header: "Name",
        accessor: "userName",
      },
      {
        header: "email",
        accessor: "email",
      },
      {
        header: "Joining Date",
        accessor: "joiningDate",
      },
      {
        header: "Role",
        accessor: "role",
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
                  setIsEditOpen(true);
                  setSelectedUserId(row.id);
                }}
              >
                <Pencil size={18} />
              </Button>

              <Button
                className="bg-red-50 text-red-500 p-2 rounded hover:bg-red-100 transition-colors"
                onClick={() => handleOpenDeleteDialog(row.id)}
                aria-label="Delete"
              >
                <Trash size={18} />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );
  return (
    <div>
      <DataListTable columns={coloumn} data={adminUserList?.data ?? []} isLoding={adminUserListLoading} />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete User"
        description="Are you sure you want to delete this user?"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {isEditOpen && <EditAdminUserSheet open={isEditOpen} setOpen={setIsEditOpen} adminId={Number(selectedUserId)}  />}
    </div>
  );
};

