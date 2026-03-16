"use client";
import { ServiceTable } from "@/components/service/ServiceTable";
import { FilterDropdown, PageFilters } from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useServiceList } from "@/hooks/useServiceQuery";
import { ServiceListPayload } from "@/types/service";

export const ServicePageContent: React.FC = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const filterButtons = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon />
      </button>,
      <FilterDropdown
        key="status"
        label="Status"
        options={statusOptions}
        selectedValues={status}
        onChange={(next) => {
          setStatus(next);
          setPage(1);
        }}
      />,
    ],
    [status],
  );

  const payload: ServiceListPayload = useMemo(
    () => ({
      status: status.length ? (status as ServiceListPayload["status"]) : undefined,
      page,
      limit,
    }),
    [status, page, limit],
  );

  const { data: serviceList, isLoading: serviceListLoading } =
    useServiceList(payload);

  const pagination = serviceList?.pagination
    ? {
        page: serviceList.pagination.page,
        pageSize: serviceList.pagination.limit,
        total: serviceList.pagination.total,
        onPageChange: setPage,
      }
    : undefined;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filterButtons} />
          <div className="flex gap-2">
          </div>
        </div>
        <ServiceTable
          data={serviceList?.data}
          isLoading={serviceListLoading}
          pagination={pagination}
        />
      </div>
    </div>
  );
};
const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Draft", value: "DRAFT" },
  { label: "Expired", value: "EXPIRED" },
];
