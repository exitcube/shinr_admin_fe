"use client";
import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../ui/input";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { useForm } from "react-hook-form";
import { FormDateTimePicker } from "../../common/FormDateTimePicker";
import { PrimaryButton } from "../../common/PrimaryButton";
import { Button } from "../../ui/button";
import {
  useBannerCategoryQuery,
  useBannerTargetAudience,
  useApproveOrRejectBannerMutation,
  useCreateBannerMutation,
  useEditBannerMutation,
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
import { TargetAudienceSection } from "../../common/targetAudience/TargetAudienceSection";
import { ImageUploader } from "../ImageUploader";
import { X } from "lucide-react";
import { toast } from "sonner";
import { buildBannerFormData } from "./buildBannerFormData";
import { AuthenticityField } from "@/components/common/AuthenticitySection/AuthenticityField";
import Image from "next/image";
import { SingleBannerResponse } from "@/types/banner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const resolveManualType = (
  manualValue?: string,
  manualDisplayText?: string,
): "SELECTED_CUSTOMER" | "LOCATION_BASED" | undefined => {
  const normalize = (value?: string) =>
    value
      ?.trim()
      .toUpperCase()
      .replace(/[\s-]+/g, "_");

  const normalizedValue = normalize(manualValue);
  const normalizedDisplay = normalize(manualDisplayText);

  if (
    normalizedValue === "SELECTED_CUSTOMER" ||
    normalizedDisplay === "SELECTED_CUSTOMER"
  ) {
    return "SELECTED_CUSTOMER";
  }

  if (
    normalizedValue === "LOCATION_BASED" ||
    normalizedDisplay === "LOCATION_BASED"
  ) {
    return "LOCATION_BASED";
  }

  if (
    normalizedValue?.includes("LOCATION") ||
    normalizedDisplay?.includes("LOCATION")
  ) {
    return "LOCATION_BASED";
  }

  if (
    normalizedValue?.includes("SELECTED") ||
    normalizedDisplay?.includes("SELECTED")
  ) {
    return "SELECTED_CUSTOMER";
  }

  return undefined;
};

export const BannerForm: React.FC<IProps> = ({
  bannerData,
  close,
  bannerId,
  isDetailView = false,
}) => {
  const isEditMode = Boolean(bannerId);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema(isEditMode)),
    defaultValues: {
      title: bannerData?.title || "",
      bannerImage: bannerData?.bannerImageUrl
        ? new File([], bannerData.bannerImageUrl)
        : undefined,
      authenticity: bannerData?.owner || "SHINR",
      priority: String(bannerData?.priority || 0),
      homePageView: bannerData?.homePageView || false,
      target_value: bannerData?.targetValue || "",
      startTime: bannerData?.startTime
        ? new Date(bannerData.startTime)
        : undefined,
      endTime: bannerData?.endTime ? new Date(bannerData.endTime) : undefined,
      categoryId: String(bannerData?.category?.id || ""),
      audience: bannerData?.targetAudienceDetails[0]?.category ?? "EVERYONE",
      manualType: bannerData?.targetAudienceDetails.find(
        (item) => item.category === "MANUAL" && !item.isFile,
      )?.value as "SELECTED_CUSTOMER" | "LOCATION_BASED" | undefined,
      specialRuleIds:
        bannerData?.targetAudienceDetails
          .filter((i) => i.category === "SPECIAL_RULE")
          .map((i) => i.id) || [],
    },
  });
  const bannerImage = form.watch("bannerImage");

  const { data: bannerCategoryData } = useBannerCategoryQuery();
  const { data: targetAudienceData } = useBannerTargetAudience();

  const { mutate: createBanner, isPending: isCreatingBanner } =
    useCreateBannerMutation();

  const { mutate: editBanner, isPending: isEditingBanner } =
    useEditBannerMutation();
  const { mutate: approveOrRejectBanner, isPending: isReviewActionPending } =
    useApproveOrRejectBannerMutation();

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
      targetAudienceData?.data?.find((item) => item.category === "SPECIAL_RULE")
        ?.items ?? []
    );
  }, [targetAudienceData]);

  const onSubmit = async (data: BannerFormValues) => {
    if (isDetailView) return;

    const formData = buildBannerFormData(data, targetAudienceData);

    if (data && bannerId) {
      formData.append("bannerId", bannerId.toString());

      editBanner(formData, {
        onSuccess: () => {
          form.reset();
          close();
          toast.success("Banner updated successfully");
        },
        onError: (error) => {
          toast.error(`Banner update failed: ${error.message}`);
        },
      });

      return;
    }
    createBanner(formData, {
      onSuccess: () => {
        form.reset();
        close();
        toast.success("Banner created successfully");
      },
      onError: (error) => {
        toast.error(`Banner creation failed: ${error.message}`);
      },
    });
  };

  const resolvedBannerId = bannerData?.id ?? bannerId;

  const handleApprove = () => {
    if (!resolvedBannerId) {
      toast.error("Banner id is missing");
      return;
    }

    approveOrRejectBanner(
      {
        bannerId: resolvedBannerId,
        action: "approve",
      },
      {
        onSuccess: () => close(),
      },
    );
  };

  const handleReject = () => {
    setRejectReason("");
    setIsRejectDialogOpen(true);
  };

  const handleRejectSubmit = () => {
    if (!resolvedBannerId) {
      toast.error("Banner id is missing");
      return;
    }

    const trimmedReason = rejectReason.trim();
    if (!trimmedReason) {
      toast.error("Reject reason is required");
      return;
    }

    approveOrRejectBanner(
      {
        bannerId: resolvedBannerId,
        action: "reject",
        rejectReason: trimmedReason,
      },
      {
        onSuccess: () => {
          setIsRejectDialogOpen(false);
          close();
        },
      },
    );
  };

  useEffect(() => {
    if (!bannerData?.targetAudienceDetails?.length) return;

    const manualAudience = bannerData.targetAudienceDetails.find(
      (item) => item.category === "MANUAL" && !item.isFile,
    );
    if (!manualAudience) return;

    const manualCategory = targetAudienceData?.data?.find(
      (item) => item.category === "MANUAL",
    );
    const matchedManualOption = manualCategory?.items?.find(
      (item) => item.id === manualAudience.id,
    );

    const manualType = resolveManualType(
      manualAudience.value || matchedManualOption?.value,
      manualAudience.displayText || matchedManualOption?.displayText,
    );

    if (manualType) {
      form.setValue("manualType", manualType);
    }
  }, [bannerData, targetAudienceData, form]);

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
                src={
                  bannerData?.bannerImageUrl
                    ? bannerData?.bannerImageUrl
                    : URL.createObjectURL(bannerImage)
                }
                alt="Banner preview"
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  form.setValue("bannerImage", undefined as unknown as File)
                }
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X size={16} className="text-gray-700" />
              </button>
            </div>
          ) : (
            <ImageUploader
              setValue={form.setValue}
              error={
                form.formState.errors.bannerImage?.message as string | undefined
              }
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
            <input
              id="homePageView"
              type="checkbox"
              checked={Boolean(form.watch("homePageView"))}
              onChange={(event) =>
                form.setValue("homePageView", event.target.checked)
              }
              className="size-4 rounded-[4px] shrink-0 accent-[#188a82]"
            />
            <label
              htmlFor="homePageView"
              className="text-[14px] font-normal leading-[14px] font-poppins text-gray-900 cursor-pointer"
            >
              Show banner on home page
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="px-4 py-3 border-[#D6D6D6] text-[#0B0D0E] w-36! cursor-pointer"
              onClick={() => close()}
            >
              Cancel
            </Button>
            {isDetailView ? (
              <>
                <Button
                  variant="outline"
                  type="button"
                  className="px-4 py-3 border-[#D9534F] text-[#D9534F] w-36! cursor-pointer"
                  onClick={handleReject}
                  disabled={isReviewActionPending}
                >
                  Reject
                </Button>
                <PrimaryButton
                  type="button"
                  className="bg-[#188A82] text-white py-2 rounded-md w-36!"
                  title="Approve"
                  isLoading={isReviewActionPending}
                  disabled={isReviewActionPending}
                  onClick={handleApprove}
                />
              </>
            ) : (
              <PrimaryButton
                type="submit"
                className="bg-primary text-white py-2 rounded-md w-36!"
                title={isEditMode ? "Save" : "Create"}
                isLoading={isEditMode ? isEditingBanner : isCreatingBanner}
                disabled={isEditMode ? isEditingBanner : isCreatingBanner}
              />
            )}
          </div>
        </div>

        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent
            className="sm:max-w-[980px] rounded-[16px] p-6"
            showCloseButton={false}
          >
            <DialogHeader>
              <DialogTitle className="text-[34px] font-semibold leading-[100%] text-[#0B0D0E]">
                Reason for Rejection
              </DialogTitle>
            </DialogHeader>
            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="Enter the Reason for Rejection."
              className="w-full min-h-[126px] rounded-xl border border-[#C2C2C2] px-4 py-3 text-[28px] font-normal leading-[100%] text-[#0B0D0E] placeholder:text-[#7F7F7F] resize-none focus:outline-none"
            />
            <div className="flex justify-end">
              <PrimaryButton
                type="button"
                className="w-[128px]! rounded-[14px] px-7 py-3.5 text-[36px] leading-[100%] font-semibold bg-[#4F8ED8]"
                title="Submit"
                onClick={handleRejectSubmit}
                isLoading={isReviewActionPending}
                disabled={isReviewActionPending}
              />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

interface IProps {
  bannerData?: SingleBannerResponse["data"];
  close: () => void;
  bannerId?: number;
  isDetailView?: boolean;
}
