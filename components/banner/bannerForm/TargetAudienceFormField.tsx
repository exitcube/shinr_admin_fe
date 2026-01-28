"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LabelledRadioInput } from "@/components/common/LabelledRadioInput";
import { Control } from "react-hook-form";
import { BannerFormValues } from "@/validations/banner";
import { TargetAudienceOption } from "@/types/banner";
import { FieldValues,Path } from "react-hook-form";

interface TargetAudienceFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name:Path<T>;
  options: TargetAudienceOption[];
}


export function TargetAudienceFormField<T extends FieldValues>({
  control,
  name,
  options,
}: TargetAudienceFormFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="font-medium text-sm">
              Target Audience
            </FormLabel>

            <FormControl>
              <div className="flex gap-3">
                {options.map((category) => (
                  <LabelledRadioInput
                    key={category.category}
                    label={category.displayText}
                    value={category.category}
                    checked={field.value === category.category}
                    onChange={field.onChange}
                  />
                ))}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};