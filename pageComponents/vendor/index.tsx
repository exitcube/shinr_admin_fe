"use client";
import { CreateVendorSheet } from "@/components/vendor/CreateVendorSheet";
import { VendorRow, VendorTable } from "@/components/vendor/VendorTable";
import { FilterDropdown, PageFilters } from "@/components/common/PageFilter";
import { FilterIcon } from "lucide-react";
import React, { useMemo, useState } from "react";

export const VendorPageContent: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const filters = useMemo(
    () => [
      <button
        key="filter"
        className="text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium"
      >
        <FilterIcon size={16} />
      </button>,
      <FilterDropdown
        key="service"
        label="Service"
        options={serviceOptions}
        selectedValues={selectedServices}
        onChange={setSelectedServices}
      />,
    ],
    [selectedServices],
  );

  const filteredVendors = useMemo(() => {
    if (!selectedServices.length) return VENDOR_TABLE_DATA;

    return VENDOR_TABLE_DATA.filter((vendor) =>
      selectedServices.includes(vendor.serviceCategory),
    );
  }, [selectedServices]);

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <PageFilters filters={filters} />
          <div className="flex gap-2">
            <CreateVendorSheet />
          </div>
        </div>
        <VendorTable data={filteredVendors} />
      </div>
    </div>
  );
};

const serviceOptions = [
  { label: "Service", value: "Service" },
  { label: "Car Wash", value: "Car Wash" },
  { label: "Detailing", value: "Detailing" },
  { label: "Tyre Care", value: "Tyre Care" },
];

const VENDOR_TABLE_DATA: VendorRow[] = [
  {
    id: 101,
    vendorCode: "VEND101",
    userName: "Auto Care",
    joiningDate: "04 Aug, 2025",
    organisation: "Pranav",
    mobileNumber: "7998564321",
    accountStatus: "PENDING",
    status: "DRAFT",
    serviceCategory: "Service",
  },
  {
    id: 102,
    vendorCode: "VEND101",
    userName: "Car care",
    joiningDate: "04 Aug, 2025",
    organisation: "Rakesh",
    mobileNumber: "7998564321",
    accountStatus: "ACTIVE",
    status: "ACTIVE",
    serviceCategory: "Car Wash",
  },
  {
    id: 103,
    vendorCode: "VEND102",
    userName: "5k Car wash",
    joiningDate: "04 Aug, 2025",
    organisation: "Pranav",
    mobileNumber: "9856843276",
    accountStatus: "ACTIVE",
    status: "ACTIVE",
    serviceCategory: "Car Wash",
  },
  {
    id: 104,
    vendorCode: "VEND103",
    userName: "Prime wash",
    joiningDate: "04 Aug, 2025",
    organisation: "Arjun",
    mobileNumber: "9856556477",
    accountStatus: "PENDING",
    status: "DRAFT",
    serviceCategory: "Detailing",
  },
  {
    id: 105,
    vendorCode: "VEND104",
    userName: "Luxury care",
    joiningDate: "04 Aug, 2025",
    organisation: "Gokul",
    mobileNumber: "7845673421",
    accountStatus: "BLOCKED",
    status: "DRAFT",
    serviceCategory: "Tyre Care",
  },
  {
    id: 106,
    vendorCode: "VEND105",
    userName: "Auto Boss",
    joiningDate: "04 Aug, 2025",
    organisation: "Ramesh",
    mobileNumber: "8457556477",
    accountStatus: "PENDING",
    status: "DRAFT",
    serviceCategory: "Service",
  },
];
