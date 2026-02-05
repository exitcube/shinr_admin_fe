"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LabelledRadioInput } from "../common/LabelledRadioInput";
import { Button } from "../ui/button";
import { PrimaryButton } from "../common/PrimaryButton";
import { Input } from "../ui/input";
import RichTextEditorControlled from "../common/RichTextEditor/RichTextEditorControlled";
import { FormDateTimePicker } from "../common/FormDatePicker";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { TargetAudienceSection } from "../common/targetAudience/TargetAudienceSection";
import {
  useRewardTargetAudience,
  useRewardCategory,
  useServiceCategory,
  useCreateRewardMutation,
  useEditRewardMutation,
} from "@/hooks/useRewardQuery";
import { useMemo } from "react";
import { RewardsFormValues, SingleRewardResponse } from "@/types/reward";
import { AuthenticityField } from "../common/AuthenticitySection/AuthenticityField";
import { FormCombobox } from "../common/FormCombobox";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { toast } from "sonner";
import { buildRewardPayload } from "./BuildRewardPayload";

export const RewardsForm: React.FC<IProps> = ({ data, onCancel, rewardId }) => {

  const form = useForm<RewardsFormValues>({
    defaultValues: {
      authenticity: data?.owner || "SHINR",
      title: data?.title || "",
      side_text: data?.sideText || "",
      content: data?.summary || "",
      description: data?.description || "",
      rewardCategory: String(data?.category?.id || "") || "",
      serviceCategory: undefined,
      displayVendorPage: data?.dispVendorPage || false,
      displayWalletPage: data?.dispCouponPage || false,
      offer_type: data?.offerType.offerType || "PERCENTAGE",
      minimum_order_value: data?.minOrderValue.toString() || "",
      code_generation: data?.singleCode || "",
      priority: data?.priority.toString() || "",
      audience: data?.targetAudienceDetails[0]?.category ?? "EVERYONE",
      manualType: data?.targetAudienceDetails.find(
        (item: any) => item.category === "MANUAL" && !item.isFile
      )?.value as "SELECTED_CUSTOMER" | "LOCATION_BASED" | undefined,
      specialRuleIds: data?.targetAudienceDetails
        .filter((i: any) => i.category === "SPECIAL_RULE")
        .map((i: any) => i.id) || [],
      startTime: data?.startDate || undefined,
      endTime: data?.endDate || undefined,
      total_grab_limit: data?.grabLimit.toString() || "",
      contribution: data?.contributor.contributor || "PLATFORM",
      maximum_usage_per_user: data?.maxUsage.toString() || "",

      // TimeRangeSelector related fields (adjust names if yours differ)
      timeRangeType: data?.maxUsagePeriod || "OVERALL", // "hour" | "day" | "month" | "overall"
      timeRangeValue: data?.maxUsagePeriodValue || null, // number (hour/day/month)
    },
  });

  const { data: rewardCategoryData, isLoading: isRewardCategoryLoading } =
    useRewardCategory();

  const { data: serviceCategoryData, isLoading: isServiceCategoryLoading } =
    useServiceCategory();

  const { data: targetAudienceData, isLoading: isTargetAudienceLoading } =
    useRewardTargetAudience();

  const { mutate: createReward, isPending: isCreatingReward } =
    useCreateRewardMutation();

  const { mutate: editReward, isPending: isEditingReward } = useEditRewardMutation()

  const rewardCategoryOptions = useMemo(() => {
    return (
      rewardCategoryData?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? []
    );
  }, [rewardCategoryData?.data]);

  const rewardServiceCategoryOptions = useMemo(() => {
    return (
      serviceCategoryData?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? []
    );
  }, [serviceCategoryData?.data]);

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

  const onSubmit = (data: RewardsFormValues) => {


    const payload = buildRewardPayload(data, targetAudienceData);

    if (data && rewardId) {
      payload.rewardId = rewardId
      editReward(payload, {
        onSuccess: () => {
          form.reset();
          close();
          toast.success("Reward edited successfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
      return;
    }


    createReward(payload, {
      onSuccess: () => {
        form.reset();
        toast.success("Reward created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const offerType = form.watch("offer_type");
  const contribution = form.watch("contribution");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col h-full"
      >
        <div className="flex flex-col gap-10  pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <AuthenticityField
              control={form.control}
              name="authenticity"
              label="Reward authenticity"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
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
                      placeholder="Enter Reward Title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="side_text"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Side Text
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Side Text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <RichTextEditorControlled
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Summery"
                    maxLength={25}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <RichTextEditorControlled
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Description"
                    maxLength={25}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Reward Category</FormLabel>

              <FormCombobox
                name="rewardCategory"
                control={form.control}
                options={rewardCategoryOptions}
                placeholder="Select Reward Category"
                searchPlaceholder="Search reward category..."
              />

              <FormMessage />
            </FormItem>

            <FormItem className="flex flex-col gap-2">
              <FormLabel>Service Category</FormLabel>
              <FormCombobox
                name="serviceCategory"
                control={form.control}
                options={rewardServiceCategoryOptions}
                placeholder="Select Service Category"
                searchPlaceholder="Search service category..."
              />

              <FormMessage />
            </FormItem>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Display Location</FormLabel>

              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className=" w-full h-10 px-3 flex items-center justify-between border border-[#C2C2C2] rounded-lg text-sm bg-white"
                    >
                      {(() => {
                        const vendor = form.watch("displayVendorPage");
                        const wallet = form.watch("displayWalletPage");

                        if (vendor && wallet) return "Vendor Page, Wallet Page";
                        if (vendor) return "Vendor Page";
                        if (wallet) return "Wallet Page";
                        return "Select Display Location";
                      })()}
                      <span className="ml-2">▾</span>
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-56 p-3">
                    <div className="flex flex-col gap-3">
                      {/* Vendor Page */}
                      <FormField
                        control={form.control}
                        name="displayVendorPage"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                            />
                            <span className="text-sm">Vendor Page</span>
                          </FormItem>
                        )}
                      />

                      {/* Wallet Page */}
                      <FormField
                        control={form.control}
                        name="displayWalletPage"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                            />
                            <span className="text-sm">Wallet Page</span>
                          </FormItem>
                        )}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormMessage />
            </FormItem>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="offer_type"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                      Offer type
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-4 ">
                        <LabelledRadioInput
                          label="Percentage"
                          value="PERCENTAGE"
                          checked={field.value === "PERCENTAGE"}
                          onChange={field.onChange}
                        />
                        <LabelledRadioInput
                          label="Amount"
                          value="AMOUNT"
                          checked={field.value === "AMOUNT"}
                          onChange={field.onChange}
                        />
                        <LabelledRadioInput
                          label="Cashback"
                          value="CASHBACK"
                          checked={field.value === "CASHBACK"}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {offerType === "PERCENTAGE" && (
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter Percentage %"
                            className=" w-[272px] h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxDiscountAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Maximum discount amount ₹"
                            className=" w-[272px] h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {offerType === "AMOUNT" && (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-[272px]  h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                          {...field}
                          type="number"
                          placeholder="Amount to Reduce ₹"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {offerType === "CASHBACK" && (
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter Percentage %"
                            className=" w-[272px] h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxCashbackAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Maximum cashback amount ₹"
                            className="  w-[272px] h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="minimum_order_value"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Minimum order value
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Minimum order value ₹"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code_generation"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Code generation
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Your Code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
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
                      placeholder="Enter Priority Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Target Audience */}
            <TargetAudienceSection
              form={form}
              name="audience"
              targetAudienceOptions={targetAudienceOptions}
              specialRuleOptions={specialRuleOptions}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="total_grab_limit"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Total grab limit
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Total grab limit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="contribution"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                      Contribution
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <LabelledRadioInput
                          label="Platform"
                          value="PLATFORM"
                          checked={field.value === "PLATFORM"}
                          onChange={field.onChange}
                        />
                        <LabelledRadioInput
                          label="Vendors"
                          value="VENDOR"
                          checked={field.value === "VENDOR"}
                          onChange={field.onChange}
                        />
                        <LabelledRadioInput
                          label="Share"
                          value="SHARE"
                          checked={field.value === "SHARE"}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {contribution === "SHARE" && (
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="shinrPercentage"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormControl>
                          <Input
                            className=" w-[272px] h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                            {...field}
                            type="number"
                            placeholder="shinr percentage %"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vendorPercentage"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormControl>
                          <Input
                            className=" w-[272px] h-[40px] px-[11px] py-[8px] border rounded-[8px] text-sm focus:ring-0 focus:border-[#807d7d]"
                            {...field}
                            type="number"
                            placeholder="Vendor percentage%"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="maximum_usage_per_user"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Maximum usage per user
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Number of usage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormItem className="flex flex-col gap-2">
              <TimeRangeSelector setValue={form.setValue} watch={form.watch} />
            </FormItem>
          </div>
        </div>
        <div className="flex justify-end pb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              type="button"
              className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer "
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="px-4 py-3 border-[#D6D6D6] w-36! cursor-pointer "
              onClick={() => form.setValue("status", "DRAFT")}
            >
              Draft
            </Button>
            <PrimaryButton
              type="submit"
              className="bg-primary text-white py-2 rounded-md w-36!"
              title={rewardId ? "save" : "Create"}
              onClick={() => form.setValue("status", "ACTIVE")}
              isLoading={rewardId ? isEditingReward : isCreatingReward}
              disabled={rewardId ? isEditingReward : isCreatingReward}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

interface IProps {
  onCancel: () => void;
  data?: SingleRewardResponse["data"];
  rewardId: number;
}
