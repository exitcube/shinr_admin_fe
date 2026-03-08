"use client";

import React, { useMemo, useState } from "react";
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
  { label: "Shinr", value: "shinr" },
  { label: "Vendor", value: "vendor" },
];

const defaultVendorOptions: FilterOption[] = [
  { label: "Vendor Alpha", value: "vendor-alpha" },
  { label: "Vendor Beta", value: "vendor-beta" },
  { label: "Vendor Gamma", value: "vendor-gamma" },
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
  const showVendorOptions = selectedAuthenticity.includes("vendor");

  const filteredVendorOptions = useMemo(
    () =>
      defaultVendorOptions.filter((vendor) =>
        vendor.label.toLowerCase().includes(vendorSearch.toLowerCase()),
      ),
    [vendorSearch],
  );

  return (
    <FilterDropdown
      label="Authenticity"
      options={authenticityOptions}
      selectedValues={selectedAuthenticity}
      onChange={(next) => {
        onAuthenticityChange(next);
        if (!next.includes("vendor")) {
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
            className="w-[208px] h-[29px] pt-[4px] pr-[12px] pb-[4px] pl-[12px] rounded-[12px] border border-[#BEBEBE] text-xs text-[#101010] outline-none transition-shadow focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E]/20"
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
