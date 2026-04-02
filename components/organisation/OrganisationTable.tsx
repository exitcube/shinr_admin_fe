"use client";

import { DataListTable, TableColumn } from "@/components/common/DataListTable";
import { OrganisationListItem } from "@/types/organisation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type OrganisationTableProps = {
  data: OrganisationListItem[];
};

const ACCOUNT_STATUS_STYLES: Record<
  OrganisationListItem["accountStatus"],
  string
> = {
  Pending: "bg-[#F2F2F7] text-[#8E8E93]",
  Active: "bg-[#E9FBF0] text-[#22C05D]",
  Blocked: "bg-[#FFF2F2] text-[#FF3B30]",
};

const STATUS_STYLES: Record<OrganisationListItem["status"], string> = {
  Active: "bg-[#E9FBF0] text-[#22C05D]",
  Inactive: "bg-[#FFF2F2] text-[#FF3B30]",
};

const getInitials = (value: string) => {
  return value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const OrganisationTable: React.FC<OrganisationTableProps> = ({
  data,
}) => {
  const router = useRouter();

  const columns: TableColumn<OrganisationListItem>[] = useMemo(
    () => [
      {
        header: "Organisation Code",
        accessor: "organisationCode",
        className: "text-xs text-[#4A4A4A]",
      },
      {
        header: "Profile",
        accessor: "profile",
        className: "text-xs",
        cell: (row) =>
          row.profileImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.profileImageUrl}
              alt={row.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#101010] text-[11px] font-medium text-white">
              {getInitials(row.name)}
            </div>
          ),
      },
      {
        header: "Name",
        accessor: "name",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Email ID",
        accessor: "email",
        className: "max-w-[150px] text-xs text-[#303030] break-words whitespace-normal",
      },
      {
        header: "Joining Date",
        accessor: "joiningDate",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Account Status",
        accessor: "accountStatus",
        className: "text-xs",
        cell: (row) => (
          <span
            className={`inline-flex min-w-[88px] items-center justify-center rounded-md px-4 py-1 text-xs font-medium ${ACCOUNT_STATUS_STYLES[row.accountStatus]}`}
          >
            {row.accountStatus}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        className: "text-xs",
        cell: (row) => (
          <span
            className={`inline-flex min-w-[88px] items-center justify-center rounded-md px-4 py-1 text-xs font-medium ${STATUS_STYLES[row.status]}`}
          >
            {row.status}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="rounded-2xl bg-white p-3 shadow-[0_0_0_1px_rgba(237,237,237,1)]">
      <DataListTable
        columns={columns}
        data={data}
        onRowClick={(row) => router.push(`/organisation/${row.id}`)}
      />
    </div>
  );
};
