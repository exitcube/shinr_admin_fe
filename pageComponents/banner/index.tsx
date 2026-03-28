"use client";
import { BannerTable } from "@/components/banner/BannerTable";
import { CreateBannerSheet } from "@/components/banner/CreateBannerSheet";
import {
  FilterDrawer,
  FilterDropdown,
  PageFilters,
} from "@/components/common/PageFilter";
import React, { useMemo, useState } from "react";
import { AuthenticityFilterDropdown } from "@/components/common/AuthenticityFilterDropdown";
import {
  useBannerCategoryQuery,
  useBannerList,
} from "@/hooks/useBannerQuery";
import { BannerListPayload } from "@/types/banner";
import { FilterIconDropdown } from "@/components/common/FilterIconDropdown";
import { DateRangeDropdown } from "@/components/common/DateRangeDropdown";
import { DateRange } from "react-day-picker";
import { endOfDay, startOfDay } from "date-fns";
import { UpdateCategory } from "@/components/banner/UpdateCategory";

export const BannerPageContent: React.FC = () => {
  const [reviewStatus, setReviewStatus] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [authenticity, setAuthenticity] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: bannerCategoryData } = useBannerCategoryQuery(categorySearch);

  const categoryOptions = useMemo(
    () =>
      bannerCategoryData?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? [],
    [bannerCategoryData?.data],
  );

  const filters = useMemo(
    () => [
      <FilterIconDropdown key="filter">
        <div className="flex w-[280px] flex-col gap-4">
          <FilterDrawer
            label="Category"
            options={categoryOptions}
            selectedValues={selectedCategories}
            onChange={(next) => {
              setSelectedCategories(next);
              setPage(1);
            }}
            defaultOpen
            searchValue={categorySearch}
            onSearchChange={setCategorySearch}
            searchPlaceholder="Search category..."
          />

          <FilterDrawer
            label="Status"
            options={statusOptions}
            selectedValues={status}
            onChange={(next) => {
              setStatus(next);
              setPage(1);
            }}
            defaultOpen
          />

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-[#878787]">Date</p>
            <DateRangeDropdown
              value={selectedDateRange}
              onChange={(next) => {
                setSelectedDateRange(next);
                setPage(1);
              }}
            />
          </div>
        </div>
      </FilterIconDropdown>,
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
      />,
    ],
    [
      authenticity,
      categoryOptions,
      categorySearch,
      reviewStatus,
      selectedCategories,
      selectedDateRange,
      selectedVendors,
      status,
    ],
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
      categoryId: selectedCategories.length
        ? selectedCategories
            .map((value) => Number(value))
            .filter((value) => Number.isFinite(value))
        : undefined,
      status: status.length ? (status as BannerListPayload["status"]) : undefined,
      startTime: selectedDateRange?.from
        ? startOfDay(selectedDateRange.from).toISOString()
        : undefined,
      endTime: selectedDateRange?.to
        ? endOfDay(selectedDateRange.to).toISOString()
        : selectedDateRange?.from
          ? endOfDay(selectedDateRange.from).toISOString()
          : undefined,
      page,
      limit,
    };
  }, [
    reviewStatus,
    authenticity,
    selectedVendors,
    selectedCategories,
    selectedDateRange,
    status,
    page,
    limit,
  ]);

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
            <UpdateCategory categories={categoryOptions} />
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

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "DRAFT" },
  { label: "Expired", value: "EXPIRED" },
];
