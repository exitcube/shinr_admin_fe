"use client";
import { BannerTable } from "@/components/banner/BannerTable";
import { CreateBannerSheet } from "@/components/banner/CreateBannerSheet";
import { FilterDropdown, PageFilters } from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { AuthenticityFilterDropdown } from "@/components/common/AuthenticityFilterDropdown";
import { useBannerList, useVendorListQuery } from "@/hooks/useBannerQuery";
import { BannerListPayload } from "@/types/banner";

export const BannerPageContent: React.FC = () => {
  const [reviewStatus, setReviewStatus] = useState<string[]>([]);
  const [authenticity, setAuthenticity] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: vendorList } = useVendorListQuery();

  const filters = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon size={16} />
      </button>,
      <FilterDropdown
        key="status"
        label="Review Status"
        options={reviewStatusOptions}
        selectedValues={reviewStatus}
        onChange={(next) => {
          setReviewStatus(next);
          setPage(1);
        }}
        className="border-r-2 border-[#EDEDED] pr-2"
      />,
      <AuthenticityFilterDropdown
        key="authenticity"
        selectedAuthenticity={authenticity}
        onAuthenticityChange={(next) => {
          setAuthenticity(next);
          setPage(1);
        }}
        selectedVendors={selectedVendors}
        onVendorsChange={(next) => {
          setSelectedVendors(next);
          setPage(1);
        }}
        vendorOptions={
          vendorList?.data?.map((vendor) => ({
            label: vendor.name,
            value: String(vendor.id),
          })) ?? undefined
        }
      />,
    ],
    [authenticity, reviewStatus, selectedVendors, vendorList],
  );

  const payload: BannerListPayload = useMemo(() => {
    const vendorId = selectedVendors
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
    const owner =
      authenticity.length === 1 ? (authenticity[0] as "SHINR" | "VENDOR") : undefined;

    return {
      reviewStatus: reviewStatus.length
        ? (reviewStatus as BannerListPayload["reviewStatus"])
        : undefined,
      owner,
      vendorId: vendorId.length ? vendorId : undefined,
      page,
      limit,
    };
  }, [reviewStatus, authenticity, selectedVendors, page, limit]);

  const { data: bannerList, isLoading: bannersLoading } =
    useBannerList(payload);

  const pagination = bannerList?.pagination
    ? {
        page: bannerList.pagination.page,
        pageSize: bannerList.pagination.limit,
        total: bannerList.pagination.total,
        onPageChange: setPage,
      }
    : undefined;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filters} />
          <div className="flex gap-2">
            <button className="bg-white border border-[#D6D6D6] rounded-md px-2 py-1.5  whitespace-nowrap hover:cursor-pointer hover:bg-gray-100 text-sm">
              Update Category
            </button>
            <CreateBannerSheet />
          </div>
        </div>
        <BannerTable
          data={bannerList?.data}
          isLoading={bannersLoading}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

const reviewStatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Approve", value: "APPROVED" },
  { label: "Reject", value: "REJECTED" },
];
