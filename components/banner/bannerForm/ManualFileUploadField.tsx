"use client";

import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { FileUp } from "lucide-react";
import { useId } from "react";

interface ManualFileUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function ManualFileUploadField<T extends FieldValues>({
  control,
  name,
}: ManualFileUploadFieldProps<T>) {
  const inputId = useId();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedFile =
          typeof File !== "undefined" &&
          (field.value as unknown) instanceof File
            ? (field.value as File)
            : undefined;

        return (
          <FormItem className="ml-[1px]">
            <FormControl>
            <label
              htmlFor={inputId}
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
                  {selectedFile ? (
                    <span className="text-primary font-medium">
                      1 file uploaded
                    </span>
                  ) : (
                    <>
                      <span className="text-primary font-medium">
                        Click to upload
                      </span>
                      <span className="text-black-500">
                        {" "}or drag and drop
                      </span>
                    </>
                  )}
                </p>
                {selectedFile && (
                  <p className="text-[11px] leading-[11px] text-gray-600 text-center w-[231px] truncate">
                    {selectedFile.name}
                  </p>
                )}
              </div>

              <input
                id={inputId}
                name={field.name}
                type="file"
                accept=".csv,.xls,.xlsx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.onChange(file);
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </label>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
