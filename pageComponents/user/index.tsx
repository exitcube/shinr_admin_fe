"use client";
import { AdminUserTable } from "@/components/user/UserTable";
import { CreateAdminUserSheet } from "@/components/user/CreateUser";
import { FilterDropdown, PageFilters } from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";

export const AdminUserPageContent: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const filterButtons = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon />
      </button>,
      <FilterDropdown
        key="role"
        label="Role"
        options={roleOptions}
        selectedValues={selectedRoles}
        onChange={setSelectedRoles}
      />,
    ],
    [selectedRoles],
  );

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

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "super_admin" },
  { label: "Employee", value: "employee" },
];
