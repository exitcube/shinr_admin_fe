"use client";
import React, { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ImageUploader } from "../ImageUploader";
import { Input } from "../../ui/input";
import { LabelledRadioInput } from "../../common/LabelledRadioInput";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "../../common/FormSelect";
import { FormDateTimePicker } from "../../common/FormDatePicker";
import { PrimaryButton } from "../../common/PrimaryButton";
import { Button } from "../../ui/button";
import {
  useBannerCategoryQuery,
  useBannerTargetAudience,
  useVendorListQuery,
} from "@/hooks/useBannerQuery";
import { FormCombobox } from "../../common/FormCombobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { TargetAudienceFormField } from "./TargetAudienceFormField";
import { SpecialRuleCheckboxes } from "./SpecialRuleCheckboxes";
import { ManualFileUploadField } from "./ManualFileUploadField";
import { Checkbox } from "../../ui/checkbox";

export const BannerForm: React.FC<IProps> = ({ onCancel }) => {
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      authenticity: "SHINR",
      audience: "EVERYONE",
      specialRuleIds: [],
      homePageView: false,
    },
  });

  const { data: vendorData, isLoading: isVendorsLoading } =
    useVendorListQuery();
  const { data: bannerCategoryData, isLoading: isCategoryLoading } =
    useBannerCategoryQuery();
  const { data: targetAudienceData, isLoading: isTargetAudienceLoading } =
    useBannerTargetAudience();

  console.log({ bannerCategoryData });


  console.log({ targetAudienceData });

  const categoryOptions = useMemo(() => {
    return (
      bannerCategoryData?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? []
    );
  }, [bannerCategoryData?.data]);

  const targetAudienceOptions = useMemo(() => {
    return (
      targetAudienceData?.data?.map((item) => ({
        category: item.category,
        displayText: item.displayText,
      })) ?? []
    );
  }, [targetAudienceData]);

  const specialRuleOptions = useMemo(() => {
    return (
      targetAudienceData?.data?.find(
        (item) => item.category === "SPECIAL_RULE"
      )?.items ?? []
    );
  }, [targetAudienceData]);

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



            <div className="flex flex-col gap-2">
              {/* Target Audience */}
              <TargetAudienceFormField
                control={form.control}
                options={targetAudienceOptions}
              />


              {/*Manual sub-options  */}
              {form.watch("audience") === "MANUAL" && (
                <div className="ml-6 mt-3 flex flex-col gap-4">

                  {/* Selected customer */}
                  <LabelledRadioInput
                    label="Selected customer"
                    value="SELECTED_CUSTOMER"
                    checked={form.watch("manualType") === "SELECTED_CUSTOMER"}
                    onChange={() => form.setValue("manualType", "SELECTED_CUSTOMER")}
                  />

                  {/* Upload box ONLY under Selected customer */}
                  {form.watch("manualType") === "SELECTED_CUSTOMER" && (
                    <ManualFileUploadField
                      control={form.control}
                      name="manualFile"
                    />
                  )}

                  {/* Location Based  */}
                  <LabelledRadioInput
                    label="Location Based"
                    value="LOCATION_BASED"
                    checked={form.watch("manualType") === "LOCATION_BASED"}
                    onChange={() => form.setValue("manualType", "LOCATION_BASED")}
                  />
                  {/* Upload box ONLY under Location Based */}
                  {form.watch("manualType") === "LOCATION_BASED" && (
                    <ManualFileUploadField
                      control={form.control}
                      name="manualFile"
                    />
                  )}

                </div>

              )}
              {/* special Rule*/}
              {form.watch("audience") === "SPECIAL_RULE" && (
                <SpecialRuleCheckboxes
                  control={form.control}
                  name="specialRuleIds"
                  options={specialRuleOptions}
                />
              )}
            </div>
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
          {/* Home Page View */}
          <div className="mt-4 flex items-center gap-3">
            <Checkbox
              checked={form.watch("homePageView")}
              onCheckedChange={(checked) =>
                form.setValue("homePageView", checked === true)
              }
              className="
                          border-[#188a82]
                          data-[state=checked]:bg-[#188a82]
                          data-[state=checked]:border-[#188a82]
                          data-[state=checked]:text-white
                          rounded-[4px] shrink-0
                        "
            />
            <span className="text-[14px] font-normal leading-[14px] font-poppins text-gray-900">
              Show banner on home page
            </span>
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
