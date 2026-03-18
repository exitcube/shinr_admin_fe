"use client";
import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../ui/input";
import { BannerFormValues, bannerSchema } from "@/validations/banner";
import { useForm, useWatch } from "react-hook-form";
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
  if (manualValue === "SELECTED_CUSTOMER" || manualDisplayText === "SELECTED_CUSTOMER") {
    return "SELECTED_CUSTOMER";
  }
  if (manualValue === "LOCATION_BASED" || manualDisplayText === "LOCATION_BASED") {
    return "LOCATION_BASED";
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
  const manualFileLabel = useMemo(() => {
    if (!bannerData?.targetAudienceDetails?.length) return undefined;
    const manualFileItem = bannerData.targetAudienceDetails.find(
      (item) => item.category === "MANUAL" && item.isFile,
    );
    if (!manualFileItem) return undefined;
    return (
      manualFileItem.value ||
      manualFileItem.displayText ||
      manualFileItem.fileFieldName ||
      undefined
    );
  }, [bannerData]);
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema(isEditMode)),
    defaultValues: {
      title: bannerData?.title || "",
      bannerImage: undefined,
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
  const bannerImage = useWatch({
    control: form.control,
    name: "bannerImage",
  });
  const audience = useWatch({
    control: form.control,
    name: "audience",
  });
  const manualType = useWatch({
    control: form.control,
    name: "manualType",
  });
  const manualFile = useWatch({
    control: form.control,
    name: "manualFile",
  });
  const specialRuleIds = useWatch({
    control: form.control,
    name: "specialRuleIds",
  });
  const homePageView = useWatch({
    control: form.control,
    name: "homePageView",
  });
  const hasBannerImage = Boolean(bannerImage || bannerData?.bannerImageUrl);

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

    const initialAudience =
      bannerData?.targetAudienceDetails?.[0]?.category ?? undefined;
    const initialSpecialRuleIds =
      bannerData?.targetAudienceDetails
        ?.filter((item) => item.category === "SPECIAL_RULE")
        .map((item) => Number(item.id))
        .filter((id) => Number.isFinite(id)) ?? [];
    const initialManualItems =
      bannerData?.targetAudienceDetails?.filter(
        (item) => item.category === "MANUAL",
      ) ?? [];
    const initialManualAudience =
      initialManualItems.find((item) => !item.isFile) || initialManualItems[0];
    const initialManualFile = initialManualItems.find((item) => item.isFile);
    const initialManualType = resolveManualType(
      initialManualAudience?.value ||
        initialManualFile?.fileFieldName ||
        undefined,
      initialManualAudience?.displayText ||
        initialManualFile?.displayText ||
        undefined,
    );

    const skipManualTargeting =
      Boolean(bannerId) &&
      initialAudience === "MANUAL" &&
      audience === "MANUAL" &&
      manualType === initialManualType &&
      !(manualFile instanceof File);

    const normalizedInitialSpecialRuleIds = Array.from(
      new Set(initialSpecialRuleIds),
    ).sort((a, b) => a - b);
    const normalizedCurrentSpecialRuleIds = Array.from(
      new Set((specialRuleIds ?? []).map(Number).filter(Number.isFinite)),
    ).sort((a, b) => a - b);
    const isSpecialRuleUnchanged =
      normalizedInitialSpecialRuleIds.length ===
        normalizedCurrentSpecialRuleIds.length &&
      normalizedInitialSpecialRuleIds.every(
        (id, index) => id === normalizedCurrentSpecialRuleIds[index],
      );

    const isTargetAudienceUnchanged =
      initialAudience === audience &&
      (audience !== "SPECIAL_RULE" || isSpecialRuleUnchanged) &&
      (audience !== "MANUAL" || skipManualTargeting);

    const formData = buildBannerFormData(data, targetAudienceData, {
      includeTargetAudience: !bannerId || !isTargetAudienceUnchanged,
      skipManualTargeting,
    });

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

    const manualItems = bannerData.targetAudienceDetails.filter(
      (item) => item.category === "MANUAL",
    );
    if (!manualItems.length) return;

    const manualAudience =
      manualItems.find((item) => !item.isFile) || manualItems[0];
    const manualFileItem = manualItems.find((item) => item.isFile);

    const manualCategory = targetAudienceData?.data?.find(
      (item) => item.category === "MANUAL",
    );
    const matchedManualOption = manualCategory?.items?.find(
      (item) => item.id === manualAudience.id,
    );

    const manualType = resolveManualType(
      manualAudience.value ||
        matchedManualOption?.value ||
        manualFileItem?.fileFieldName ||
        undefined,
      manualAudience.displayText ||
        matchedManualOption?.displayText ||
        manualFileItem?.displayText ||
        undefined,
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
          {hasBannerImage ? (
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
                  bannerImage
                    ? URL.createObjectURL(bannerImage)
                    : (bannerData?.bannerImageUrl as string)
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
              manualFileLabel={manualFileLabel}
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
              checked={Boolean(homePageView)}
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
            className="!w-[780px] !max-w-[780px] max-sm:!max-w-[calc(100vw-24px)] !h-[195px] !rounded-[8px] !p-0 !gap-0 box-border overflow-hidden"
            showCloseButton={false}
          >
            <div className="grid h-full grid-rows-[20px_1fr_36px] gap-[12px] pt-[8px] pr-[12px] pb-[8px] pl-[12px]">
              <DialogHeader className="space-y-0 p-0">
                <DialogTitle className="w-[756px] max-w-full h-[20px] font-poppins text-[14px] font-bold leading-[140%] tracking-[0px] text-[#0B0D0E] m-0">
                  Reason for Rejection
                </DialogTitle>
              </DialogHeader>
              <textarea
                value={rejectReason}
                onChange={(event) => setRejectReason(event.target.value)}
                placeholder="Enter the Reason for Rejection."
                className="h-[99px] min-h-[99px] w-full rounded-[8px] border border-[#C2C2C2] px-[12px] py-[8px] text-[16px] font-normal leading-[1.2] text-[#0B0D0E] placeholder:text-[#7F7F7F] resize-none focus:outline-none"
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="w-[81px] h-[36px] rounded-[8px] px-[10px] py-[8px] text-[14px] leading-[1] font-semibold bg-[#4F8ED8] text-white hover:bg-[#4F8ED8]/90"
                  onClick={handleRejectSubmit}
                  disabled={isReviewActionPending}
                >
                  Submit
                </Button>
              </div>
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
