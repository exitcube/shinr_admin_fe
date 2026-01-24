"use client";
import React from "react";
import { FormField } from "../ui/form";
import type { Control } from "react-hook-form";
import type { BannerFormValues } from "@/validations/banner";

interface SpecialRuleCheckboxesProps {
  control: Control<BannerFormValues>;
  name: "specialRuleIds";
  options: { id: number; displayText: string }[];
}

export const SpecialRuleCheckboxes: React.FC<SpecialRuleCheckboxesProps> = ({
  control,
  name,
  options,
}) => {
  return (
    <div className="ml-6 mt-4">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {options.map((rule) => (
              <label
                key={rule.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="
                            w-5 h-5
                            rounded-[4px]
                            border border-gray-400
                            accent-primary
                            cursor-pointer
                            shrink-0
                            "
                  checked={(field.value ?? []).includes(rule.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      field.onChange([...(field.value ?? []), rule.id]);
                    } else {
                      field.onChange(
                        (field.value ?? []).filter((id) => id !== rule.id)
                      );
                    }
                  }}
                />

                <span className="text-[12px] leading-[12px] font-normal text-gray-900 whitespace-nowrap">
                  {rule.displayText}
                </span>
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};