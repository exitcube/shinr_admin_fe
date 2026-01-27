"use client";

import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { FileUp } from "lucide-react";

interface ManualFileUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function ManualFileUploadField<T extends FieldValues>({
  control,
  name,
}: ManualFileUploadFieldProps<T>) {
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
              <div className="flex flex-col items-center gap-[4.58px]">
                <FileUp className="size-[18px]" />

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
}
