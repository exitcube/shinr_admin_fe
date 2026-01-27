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
import { SearchField } from "../common/SearchField";
import { SelectField } from "../common/SelectField";
import { FormDateTimePicker } from "../common/FormDatePicker";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { TargetAudienceSection } from "../common/targetAudience/TargetAudienceSection";
import { useRewardTargetAudience } from "@/hooks/useRewardQuery";
import { useMemo } from "react";
import { RewardsFormValues } from "@/types/reward";

export const RewardsForm: React.FC<IProps> = ({ onCancel }) => {
  const form = useForm<RewardsFormValues>({
    defaultValues: {
      authenticity: "SHINR",
      title: "",
      side_text: "",
      content: "",
      description: "",
      rewardCategory: "",
      serviceCategory: "",
      displayLocation: "",
      offer_type: "percentage",
      minimum_order_value: "",
      code_generation: "",
      priority: "",
      audience: "EVERYONE",
      startTime: null,
      endTime: null,
      total_grab_limit: "",
      contribution: "platform",
      maximum_usage_per_user: "",

      // TimeRangeSelector related fields (adjust names if yours differ)
      timeRangeType: "overall", // "hour" | "day" | "month" | "overall"
      timeRangeValue: null, // number (hour/day/month)
    },
  });

   const { data: targetAudienceData, isLoading: isTargetAudienceLoading } =
      useRewardTargetAudience();

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

  const onSubmit = (data: any) => {
    console.log("FORM DATA", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col h-full"
      >
        <div className="flex flex-col gap-10  pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="authenticity"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Reward authenticity
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
            <FormField
              control={form.control}
              name="rewardCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Reward Category</FormLabel>
                  <FormControl>
                    <SearchField
                      field={field}
                      placeholder="Select Reward Category"
                      data={[
                        "Electronics",
                        "Fashion",
                        "Food",
                        "Books",
                        "Gadgets",
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Service Category</FormLabel>
                  <FormControl>
                    <SearchField
                      field={field}
                      placeholder="Search Service Category"
                      data={[
                        "Cleaning",
                        "Delivery",
                        "Consulting",
                        "Fitness",
                        "Travel",
                      ]}
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
              name="displayLocation"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Display Location</FormLabel>
                  <FormControl>
                    <SelectField
                      field={field}
                      placeholder="Select Display Location"
                      data={["Homepage", "Sidebar", "Footer", "Category Page"]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer_type"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">
                    Offer type
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <LabelledRadioInput
                        label="Percentage"
                        value="percentage"
                        checked={field.value === "percentage"}
                        onChange={field.onChange}
                      />
                      <LabelledRadioInput
                        label="Amount"
                        value="amount"
                        checked={field.value === "amount"}
                        onChange={field.onChange}
                      />
                      <LabelledRadioInput
                        label="Cashback"
                        value="cashback"
                        checked={field.value === "cashback"}
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
                        value="platform"
                        checked={field.value === "platform"}
                        onChange={field.onChange}
                      />
                      <LabelledRadioInput
                        label="Vendor"
                        value="vendor"
                        checked={field.value === "vendor"}
                        onChange={field.onChange}
                      />
                      <LabelledRadioInput
                        label="Share"
                        value="share"
                        checked={field.value === "share"}
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
              type="button"
              className="px-4 py-3 border-[#D6D6D6] w-36! cursor-pointer "
              onClick={() => onCancel()}
            >
              Draft
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
