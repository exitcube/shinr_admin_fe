"use client";

import React, { useMemo, useState } from "react";
import { useVendorListQuery } from "@/hooks/useBannerQuery";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterDropdown, FilterOption } from "./PageFilter";

interface AuthenticityFilterDropdownProps {
  selectedAuthenticity: string[];
  onAuthenticityChange: (next: string[]) => void;
  selectedVendors: string[];
  onVendorsChange: (next: string[]) => void;
  className?: string;
}

const authenticityOptions: FilterOption[] = [
  { label: "Shinr", value: "SHINR" },
  { label: "Vendor", value: "VENDOR" },
];

export const AuthenticityFilterDropdown: React.FC<
  AuthenticityFilterDropdownProps
> = ({
  selectedAuthenticity,
  onAuthenticityChange,
  selectedVendors,
  onVendorsChange,
  className,
}) => {
  const [vendorSearch, setVendorSearch] = useState("");
  const { data: vendorList } = useVendorListQuery(vendorSearch);
  const showVendorOptions = selectedAuthenticity.includes("VENDOR");

  const availableVendors = useMemo(
    () =>
      vendorList?.data?.map((vendor) => ({
        label: vendor.name,
        value: String(vendor.id),
      })) ?? [],
    [vendorList?.data],
  );

  const filteredVendorOptions = useMemo(
    () => availableVendors,
    [availableVendors],
  );

  return (
    <FilterDropdown
      label="Authenticity"
      options={authenticityOptions}
      selectedValues={selectedAuthenticity}
      onChange={(next) => {
        onAuthenticityChange(next);
        if (!next.includes("VENDOR")) {
          onVendorsChange([]);
          setVendorSearch("");
        }
      }}
      className={className}
    >
      {showVendorOptions ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-[#878787]">Vendors</p>
          <input
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
            placeholder="Search vendor"
            className="w-52 h-[29px] pt-1 pr-3 pb-1 pl-3 rounded-xl border border-[#BEBEBE] text-xs text-[#101010] outline-none transition-shadow focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E]/20"
          />
          {filteredVendorOptions.map((vendor) => {
            const id = `vendor-${vendor.value}`;
            return (
              <label
                key={vendor.value}
                htmlFor={id}
                className="flex items-center gap-2 cursor-pointer rounded-md px-1.5 py-1 transition-colors hover:bg-[#F7F7F7]"
              >
                <Checkbox
                  id={id}
                  checked={selectedVendors.includes(vendor.value)}
                  onCheckedChange={(checked) => {
                    const isChecked = checked === true;
                    onVendorsChange(
                      isChecked
                        ? [...selectedVendors, vendor.value]
                        : selectedVendors.filter((item) => item !== vendor.value),
                    );
                  }}
                />
                <span className="text-sm text-[#101010]">{vendor.label}</span>
              </label>
            );
          })}
        </div>
      ) : null}
    </FilterDropdown>
  );
};
