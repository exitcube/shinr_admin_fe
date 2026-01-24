'use client';
import { LabelledRadioInput } from "@/components/common/LabelledRadioInput";
import { Input } from "@/components/ui/input";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const BannerDetailForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      authenticity: "SHINR",
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p>Attached files</p>
        <Image
          src={"/assets/illustrator/banner-image.png"}
          alt="banner-image"
          width={272}
          height={230}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Title</label>
          <Input
            {...register("title")}
            type="text"
            className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
            placeholder="Enter banner title"
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Authenticity */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Banner authenticity</label>
          <Controller
            name="authenticity"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                <LabelledRadioInput
                  label="Shinr"
                  value="SHINR"
                  checked={field.value === "SHINR"}
                  onChange={field.onChange}
                />
                <LabelledRadioInput
                  label="Vendor"
                  value="VENDOR"
                  checked={field.value === "VENDOR"}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          {errors.authenticity && (
            <span className="text-xs text-red-500">
              {errors.authenticity.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
