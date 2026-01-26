"use client";

import React from "react";
import { FormField, } from "../../ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { Control, FieldValues } from "react-hook-form";
import type { BannerFormValues } from "@/validations/banner";
import { Path } from "react-hook-form";

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
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {options.map((rule) => {
                const checked = value.includes(rule.id);

                return (
                  <label key={rule.id} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        if (isChecked) {
                          field.onChange([...value, rule.id]);
                        } else {
                          field.onChange(value.filter((id) => id !== rule.id));
                        }
                      }}
                    />
                    <span>{rule.displayText}</span>
                  </label>
                );
              })}
            </div>
          );
        }}

      />
    </div>
  );
};
