"use client";

import React from "react";
import { FormField } from "../../ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { Control, FieldValues, Path } from "react-hook-form";

interface SpecialRuleCheckboxesProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: { id: number; displayText: string }[];
}

export function SpecialRuleCheckboxes<T extends FieldValues>({
  control,
  name,
  options,
}: SpecialRuleCheckboxesProps<T>) {
  return (
    <div className="ml-6 mt-4">
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const value = (field.value ?? []) as number[];

          return (
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 items-center">
              {options.map((rule) => {
                const checked = value.includes(rule.id);

                return (
                  <label
                    key={rule.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        if (isChecked) {
                          field.onChange([...value, rule.id]);
                        } else {
                          field.onChange(value.filter((id) => id !== rule.id));
                        }
                      }}
                      className="
                        border-[#188a82]
                        data-[state=checked]:bg-[#188a82]
                        data-[state=checked]:border-[#188a82]
                        data-[state=checked]:text-white
                        rounded-[4px]
                        shrink-0
                      "
                    />

                    <span className="text-[12px] leading-[12px] font-normal text-gray-900 whitespace-nowrap">
                      {rule.displayText}
                    </span>
                  </label>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
}

