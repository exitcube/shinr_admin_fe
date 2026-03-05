import { Service } from "@/services/service";
import { ServiceFormValues } from "@/validations/service";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

interface ImageUploaderProps {
  setValue: UseFormSetValue<ServiceFormValues>;
  error?: string|undefined;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  setValue,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 font-poppins">
      <h4 className="font-medium text-sm">Attach files</h4>

      <label className="w-full h-36 border border-dashed border-[#C2C2C2] flex flex-col items-center justify-center cursor-pointer rounded-lg">
        <ArrowUpTrayIcon className="h-6 w-6 mb-2 text-primary" />
        <span className="text-sm font-medium text-primary">
          Upload Service Image here
        </span>

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("serviceImg", file, { shouldValidate: true });
            }
          }}
        />
      </label>

      <span className="text-[#878787] font-medium text-xs">
        Dimension: 193x239, File type: png, jpg, jpeg
      </span>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
