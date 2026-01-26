"use client";

import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { BannerFormValues } from "@/validations/banner";
import { FileUp } from "lucide-react";

interface ManualFileUploadFieldProps {
  control: Control<BannerFormValues>;
  name: "manualFile"; 
}

export const ManualFileUploadField = ({
  control,
  name,
}: ManualFileUploadFieldProps) => {
  return (
<FormField
  control={control}
  name={name}
  render={({ field }) => (
    <FormItem className="ml-[1px]">
      <FormControl>
        <label
          htmlFor="manualFileUpload"
          className="
            w-[272px]
            h-[84px]
            border
            border-dashed
            border-[#D6D6D6]
            rounded-xl
            flex
            items-center
            justify-center
            cursor-pointer
            hover:border-primary
            transition
          "
        >
          {/* Inner wrapper for icon + text */}
          <div className="flex flex-col items-center gap-[4.58px]">
            {/* Icon */}
            <FileUp className="size-[18px] text-black-500 group-hover:text-primary" />

            {/* Text */}
            <p className="text-[12px] leading-[11px] text-center w-[231px]">
              <span className="text-primary font-medium">
                Click to upload
              </span>
              <span className="text-black-500">
                {" "}or drag and drop
              </span>
            </p>
          </div>

          <input
            id="manualFileUpload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) field.onChange(file);
            }}
          />
        </label>
      </FormControl>
    </FormItem>
  )}
/>
  );
};