"use client";
import { CustomerTable } from "@/components/customer/CustomerTable";
import { FilterDropdown, PageFilters } from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useCustomerList } from "@/hooks/useCustomerQuery";
import { CustomerListPayload } from "@/types/customer";

export const CustomerPageContent: React.FC = () => {
  const [lastActive, setLastActive] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const filters = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon />
      </button>,
      <FilterDropdown
        key="lastActive"
        label="Last Active"
        options={[]}
        selectedValues={lastActive ? [lastActive] : []}
        onChange={() => null}
        childrenPlacement="top"
        className="border-r-2 border-[#EDEDED] pr-2"
      >
        <input
          type="date"
          value={lastActive}
          onChange={(e) => {
            setLastActive(e.target.value);
            setPage(1);
          }}
          className="w-full h-[30px] rounded-xl border border-[#BEBEBE] px-3 text-xs text-[#101010] outline-none transition-shadow focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E]/20"
        />
      </FilterDropdown>,
    ],
    [lastActive],
  );

  const payload: CustomerListPayload = useMemo(
    () => ({
      lastActive: lastActive || undefined,
      page,
      limit,
    }),
    [lastActive, page, limit],
  );

  const { data: customerList, isLoading: customerListLoading } =
    useCustomerList(payload);

  const pagination = customerList?.pagination
    ? {
        page: customerList.pagination.page,
        pageSize: customerList.pagination.limit,
        total: customerList.pagination.total,
        onPageChange: setPage,
      }
    : undefined;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filters} />
        </div>
        <CustomerTable
          data={customerList?.data}
          isLoading={customerListLoading}
          pagination={pagination}
        />
      </div>
    </div>
  );
};
