"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ImageUploader } from "./ImageUploader";
import { Input } from "../ui/input";
import { LabelledRadioInput } from "../common/LabelledRadioInput";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "../common/FormSelect";
import { FormDateTimePicker } from "../common/FormDatePicker";
import { PrimaryButton } from "../common/PrimaryButton";
import { Button } from "../ui/button";

export const BannerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      authenticity: "shinr",
    },
  });

  const onSubmit = (data: BannerFormValues) => {
    console.log("FORM DATA", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 font-poppins"
    >
      <ImageUploader setValue={setValue} error={errors.bannerImage?.message} />

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
                  value="shinr"
                  checked={field.value === "shinr"}
                  onChange={field.onChange}
                />
                <LabelledRadioInput
                  label="Vendor"
                  value="vendor"
                  checked={field.value === "vendor"}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Banner Category</label>
          <FormSelect
            name="category"
            control={control}
            placeholder="Select a category"
            options={[
              { label: "Technology", value: "tech" },
              { label: "Health", value: "health" },
              { label: "Finance", value: "finance" },
            ]}
            className="w-full"
          />
          {errors.category && (
            <span className="text-xs text-red-500">
              {errors.category.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Target Audience</label>
          <Controller
            name="audience"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                <LabelledRadioInput
                  label="Everyone"
                  value="everyone"
                  checked={field.value === "everyone"}
                  onChange={field.onChange}
                />
                <LabelledRadioInput
                  label="Manual"
                  value="manual"
                  checked={field.value === "manual"}
                  onChange={field.onChange}
                />
                <LabelledRadioInput
                  label="Special Rule"
                  value="special_rule"
                  checked={field.value === "special_rule"}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          {errors.audience && (
            <span className="text-xs text-red-500">
              {errors.audience.message}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Target value</label>
          <Input
            {...register("target_value")}
            type="text"
            className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
            placeholder="Enter target value"
          />
          {errors.target_value && (
            <span className="text-xs text-red-500">
              {errors.target_value.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm">Priority</label>
          <Input
            {...register("priority")}
            type="text"
            className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
            placeholder="Enter priority"
          />
          {errors.priority && (
            <span className="text-xs text-red-500">
              {errors.priority.message}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
        <div className="flex flex-col gap-2">
          <FormDateTimePicker
            name="startTime"
            control={control}
            label="Event Date & Time"
            placeholder="Select event date and time"
          />
          {errors.startTime && (
            <span className="text-xs text-red-500">
              {errors.startTime.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <FormDateTimePicker
            name="endTime"
            control={control}
            label="End Date & Time"
            placeholder="Select end date and time"
          />
          {errors.endTime && (
            <span className="text-xs text-red-500">
              {errors.endTime.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36!"
          >
            Cancel
          </Button>
          <PrimaryButton
            type="submit"
            className="bg-primary text-white py-2 rounded-md w-36!"
            title="Create"
          />
        </div>
      </div>
    </form>
  );
};
