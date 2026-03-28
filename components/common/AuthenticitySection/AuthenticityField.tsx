"use client";

import React, { useDeferredValue, useMemo, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { LabelledRadioInput } from "@/components/common/LabelledRadioInput";
import { useVendorListQuery } from "@/hooks/useBannerQuery";
import { FormCombobox } from "@/components/common/FormCombobox";

interface AuthenticityFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  vendorFieldName?: Path<T>;
  initialVendorLabel?: string;
}

export function AuthenticityField<T extends FieldValues>({
  control,
  name,
  label = "Authenticity",
  vendorFieldName = "vendorId" as Path<T>,
  initialVendorLabel,
}: AuthenticityFieldProps<T>) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { data: vendorList, isLoading: isVendorListLoading } =
    useVendorListQuery(deferredSearch);

  const vendorOptions = useMemo(
    () =>
      vendorList?.data?.map((vendor) => ({
        label: vendor.name,
        value: String(vendor.id),
      })) ?? [],
    [vendorList?.data],
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormField
          control={control}
          name={vendorFieldName}
          render={({ field: vendorField }) => {
            return (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-medium text-sm">{label}</FormLabel>

                <FormControl>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <LabelledRadioInput
                        label="Shinr"
                        value="SHINR"
                        checked={field.value === "SHINR"}
                        onChange={() => {
                          field.onChange("SHINR");
                          vendorField.onChange("");
                        }}
                      />
                      <LabelledRadioInput
                        label="Vendor"
                        value="VENDOR"
                        checked={field.value === "VENDOR"}
                        onChange={() => field.onChange("VENDOR")}
                      />
                    </div>
                    {field.value === "VENDOR" && (
                      <FormCombobox
                        name={vendorFieldName}
                        control={control}
                        options={vendorOptions}
                        placeholder="Search Vendor"
                        searchPlaceholder="Search vendor..."
                        className="rounded-xl"
                        onSearchChange={setSearch}
                        emptyMessage="No vendor found."
                        selectedLabel={initialVendorLabel}
                        isLoading={isVendorListLoading}
                        shouldFilter={false}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      )}
    />
  );
}
