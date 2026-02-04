"use client";
import React, { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../ui/input";
import { LabelledRadioInput } from "../../common/LabelledRadioInput";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { FormDateTimePicker } from "../../common/FormDatePicker";
import { PrimaryButton } from "../../common/PrimaryButton";
import { Button } from "../../ui/button";
import {
  useBannerCategoryQuery,
  useBannerTargetAudience,
  useCreateBannerMutation,
  useEditBannerMutation,
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
import { Checkbox } from "../../ui/checkbox";
import { TargetAudienceSection } from "../../common/targetAudience/TargetAudienceSection";

import { BannerService } from "@/services/banner";
import { ImageUploader } from "../ImageUploader";
import { X } from "lucide-react";
import { toast } from "sonner";
import { boolean } from "zod";
import { buildBannerFormData } from "./buildBannerFormData";
import { AuthenticityField } from "@/components/common/AuthenticitySection/AuthenticityField";
import Image from "next/image";
import { SingleBannerResponse } from "@/types/banner";

export const BannerForm: React.FC<IProps> = ({ bannerData, close, bannerId }) => {
  const isEditMode = Boolean(bannerId);
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema(isEditMode)),
    defaultValues: {
      title: bannerData?.title || "",
      bannerImage: bannerData?.bannerImageUrl ? new File([], bannerData.bannerImageUrl) : undefined,
      authenticity: bannerData?.owner || "SHINR",
      priority: String(bannerData?.priority || 0),
      homePageView: bannerData?.homePageView || false,
      target_value: bannerData?.targetValue || "",
      startTime: bannerData?.startTime
        ? new Date(bannerData.startTime)
        : undefined,
      endTime: bannerData?.endTime
        ? new Date(bannerData.endTime)
        : undefined,
      categoryId: String(bannerData?.category?.id || ""),
      audience: bannerData?.targetAudienceDetails[0]?.category ?? "EVERYONE",
      manualType: bannerData?.targetAudienceDetails.find(
        (item) => item.category === "MANUAL" && !item.isFile
      )?.value as "SELECTED_CUSTOMER" | "LOCATION_BASED" | undefined,
      specialRuleIds: bannerData?.targetAudienceDetails
        .filter((i) => i.category === "SPECIAL_RULE")
        .map((i) => i.id) || [],
    },
  });
  useEffect(() => {
    const bannerImage = form.watch("bannerImage");
  }, [form.watch("bannerImage")])
  const bannerImage = form.watch("bannerImage");




  const { data: vendorData, isLoading: isVendorsLoading } =
    useVendorListQuery();
  const { data: bannerCategoryData, isLoading: isCategoryLoading } =
    useBannerCategoryQuery();
  const { data: targetAudienceData, isLoading: isTargetAudienceLoading } =
    useBannerTargetAudience();

  const { mutate: createBanner, isPending: isCreatingBanner } =
    useCreateBannerMutation();

  const { mutate: editBanner, isPending: isEditingBanner } =
    useEditBannerMutation();

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

  const onSubmit = async (data: BannerFormValues) => {
    const formData = buildBannerFormData(data, targetAudienceData);

    if (data && bannerId) {

      formData.append("bannerId", bannerId.toString());

      editBanner(formData, {
        onSuccess: () => {
          form.reset();
          close();
          toast.success("Banner updated successfully")
        },
        onError: (error) => {
          toast.error(`Banner update failed: ${error.message}`);
        },
      });

      return;
    }
    createBanner(formData, {
      onSuccess: () => {
        form.reset()
        close()
        toast.success("Banner created successfully")
      },
      onError: (error) => {
        toast.error(`Banner creation failed: ${error.message}`);
      },
    });
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-10 ">
          {bannerImage ? (
            <div
              className="relative overflow-hidden"
              style={{
                width: "350px",
                height: "296px",
                borderRadius: "20.59px",
                opacity: 1,
              }}
            >
              <Image
                src={URL.createObjectURL(bannerImage)}
                alt="Banner preview"
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => form.setValue("bannerImage", undefined as unknown as File)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X size={16} className="text-gray-700" />
              </button>
            </div>
          ) : (
            <ImageUploader
              setValue={form.setValue}
              error={form.formState.errors.bannerImage?.message as string | undefined}
            />
          )}

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
            <AuthenticityField
              control={form.control}
              name="authenticity"
              label="Banner authenticity"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Banner Category</label>
              <FormCombobox
                name="categoryId"
                control={form.control}
                options={categoryOptions}
                placeholder="Select a category"
                searchPlaceholder="Search category..."
              />
              <FormMessage />
            </div>
            {/* Target Audience */}
            <TargetAudienceSection
              form={form}
              name="audience"
              targetAudienceOptions={targetAudienceOptions}
              specialRuleOptions={specialRuleOptions}
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
              onClick={() => close()}
            >
              Cancel
            </Button>
            <PrimaryButton
              type="submit"
              className="bg-primary text-white py-2 rounded-md w-36!"
              title={isEditMode ? "Save" : "Create"}
              isLoading={isEditMode ? isEditingBanner : isCreatingBanner}
              disabled={isEditMode ? isEditingBanner : isCreatingBanner}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

interface IProps {
  bannerData?: SingleBannerResponse["data"];
  close: () => void;
  bannerId?: number;
}
