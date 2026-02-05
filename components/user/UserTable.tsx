/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { DataListTable, TableColumn } from "../common/DataListTable";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { EditAdminUserSheet } from "./EditUserSheet";

export const AdminUserTable: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const coloumn: TableColumn<any>[] = useMemo(
    () => [
      {
        header: "Employee Code",
        accessor: "employeeCode",
        cell: (row) => {
          return (
            <div>
              <Link href={`/adminuser/${row.id}`} className="text-xs">
                {row.employeeCode}
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
                className="bg-green-50 text-green-500 p-2 rounded-sm hover:bg-green-100 transition-colors "
                aria-label="Edit"
                onClick={() => {
                  setIsEditOpen(true);
                }}
              >
                <Pencil size={18} />
              </Button>

              <Button
                className="bg-red-50 text-red-500 p-2 rounded-sm hover:bg-red-100 transition-colors"
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
      <DataListTable columns={coloumn} data={data} isLoding={false} />
      <EditAdminUserSheet open={isEditOpen} setOpen={setIsEditOpen} />
    </div>
  );
};

const data = [
  {
    id: 12,
    employeeCode: "SHINR011002",
    userName: "John Doe",
    email: "john123@gmail.com",
    joiningDate: "2022-01-01",
    role: "SUPER_ADMIN",
  },
  {
    id: 13,
    employeeCode: "SHINR021002",
    userName: "Jane Smith",
    email: "jane123@gmail.com",
    joiningDate: "2022-01-01",
    role: "ADMIN",
  },
  {
    id: 14,
    employeeCode: "SHINR031002",
    userName: "Bob Johnson",
    email: "bob123@gmail.com",
    joiningDate: "2022-01-01",
    role: "ADMIN",
  },
  {
    id: 15,
    employeeCode: "SHINR041002",
    userName: "Alice Williams",
    email: "alice123@gmail.com",
    joiningDate: "2022-01-01",
    role: "EMPLOYEE",
  },
  {
    id: 16,
    employeeCode: "SHINR051002",
    userName: "Charlie Brown",
    email: "charlie123@gmail.com",
    joiningDate: "2022-01-01",
    role: "EMPLOYEE",
  },
];
