"use client";
import React, { useMemo } from "react";
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
import {
  useBannerCategoryQuery,
  useBannerTargetAudience,
  useVendorListQuery,
} from "@/hooks/useBannerQuery";
import { FormCombobox } from "../common/FormCombobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const BannerForm: React.FC<IProps> = ({ onCancel }) => {
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      authenticity: "shinr",
    },
  });

  // const { data: vendorData, isLoading: isVendorsLoading } =
  //   useVendorListQuery();
  const { data: bannerCategoryData, isLoading: isCategoryLoading } =
    useBannerCategoryQuery();
  const { data: targetAudience, isLoading: isTargetAudienceLoading } =
    useBannerTargetAudience();

  console.log({ targetAudience });

  const categoryOptions = useMemo(() => {
    return (
      bannerCategoryData?.data?.map((option) => ({
        label: option.displayName,
        value: option.value,
      })) ?? []
    );
  }, [bannerCategoryData?.data]);

  const onSubmit = (data: BannerFormValues) => {
    console.log("FORM DATA", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-10 ">
          <ImageUploader
            setValue={form.setValue}
            error={form.formState.errors.bannerImage?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter banner title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Authenticity */}
            <FormField
              control={form.control}
              name="authenticity"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Banner authenticity
                  </FormLabel>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Banner Category</label>
              <FormCombobox
                name="category"
                control={form.control}
                options={categoryOptions}
                placeholder="Select a category"
                searchPlaceholder="Search category..."
              />
              <FormMessage />
            </div>

            {/* Target Audience */}
            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Target Audience
                  </FormLabel>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            {/* Target value */}
            <FormField
              control={form.control}
              name="target_value"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Target value
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter target value"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Priority
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter priority"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            {/* Start Date & Time */}
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Event Date & Time
                  </FormLabel>
                  <FormControl>
                    <FormDateTimePicker
                      {...field}
                      control={form.control}
                      name="startTime"
                      placeholder="Select event date and time"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* End Date & Time */}
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    End Date & Time
                  </FormLabel>
                  <FormControl>
                    <FormDateTimePicker
                      {...field}
                      control={form.control}
                      name="endTime"
                      placeholder="Select end date and time"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer "
              onClick={() => onCancel()}
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
    </Form>
  );
};

interface IProps {
  onCancel: () => void;
}
