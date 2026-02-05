"use client";
import { AdminUserTable } from "@/components/user/UserTable";
import { CreateAdminUserSheet } from "@/components/user/CreateUser";
import { PageFilters } from "@/components/common/PageFilter";
import { ChevronDown, FilterIcon } from "lucide-react";
import React from "react";

export const AdminUserPageContent: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filterButtons} />
          <div className="flex gap-2">
            <CreateAdminUserSheet />
          </div>
        </div>
        <AdminUserTable />
      </div>
    </div>
  );
};

const filterButtons = [
  <button
    key="filter"
    className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
  >
    <FilterIcon />
  </button>,
  <button
    key="role"
    className="flex gap-1 items-center border-r-2 border-[#EDEDED] pr-2 text-xs font-medium"
  >
    Role <ChevronDown />
  </button>,
];
