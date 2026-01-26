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

interface TargetAudienceFormFieldProps {
  control: Control<BannerFormValues>;
  options: TargetAudienceOption[];
}

export const TargetAudienceFormField = ({
  control,
  options,
}: TargetAudienceFormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={control}
        name="audience"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="font-medium text-sm">
              Target Audience
            </FormLabel>

            <FormControl>
              <div className="flex gap-4">
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