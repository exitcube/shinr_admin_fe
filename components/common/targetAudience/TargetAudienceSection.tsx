"use client";

import { UseFormReturn } from "react-hook-form";
import { BannerFormValues } from "@/validations/banner";
import { LabelledRadioInput } from "@/components/common/LabelledRadioInput";
import { TargetAudienceFormField } from "@/components/banner/bannerForm/TargetAudienceFormField";
import { ManualFileUploadField } from "@/components/banner/bannerForm/ManualFileUploadField";
import { SpecialRuleCheckboxes } from "@/components/banner/bannerForm/SpecialRuleCheckboxes";
import { TargetAudienceOption } from "@/types/banner";

interface Props {
  form: UseFormReturn<BannerFormValues>;
  targetAudienceOptions: TargetAudienceOption[];
  specialRuleOptions: {
    id: number;
    displayText: string;
    value: string;
    isFile: boolean;
    fileFieldName: string | null;
  }[];
}

export const TargetAudienceSection = ({
  form,
  targetAudienceOptions,
  specialRuleOptions,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Target Audience */}
      <TargetAudienceFormField
        control={form.control}
        options={targetAudienceOptions}
      />

      {/* MANUAL */}
      {form.watch("audience") === "MANUAL" && (
        <div className="ml-6 mt-3 flex flex-col gap-4">
          <LabelledRadioInput
            label="Selected customer"
            value="SELECTED_CUSTOMER"
            checked={form.watch("manualType") === "SELECTED_CUSTOMER"}
            onChange={() =>
              form.setValue("manualType", "SELECTED_CUSTOMER")
            }
          />

          {form.watch("manualType") === "SELECTED_CUSTOMER" && (
            <ManualFileUploadField
              control={form.control}
              name="manualFile"
            />
          )}

          <LabelledRadioInput
            label="Location Based"
            value="LOCATION_BASED"
            checked={form.watch("manualType") === "LOCATION_BASED"}
            onChange={() =>
              form.setValue("manualType", "LOCATION_BASED")
            }
          />

          {form.watch("manualType") === "LOCATION_BASED" && (
            <ManualFileUploadField
              control={form.control}
              name="manualFile"
            />
          )}
        </div>
      )}

      {/* SPECIAL RULE */}
      {form.watch("audience") === "SPECIAL_RULE" && (
        <SpecialRuleCheckboxes
          control={form.control}
          name="specialRuleIds"
          options={specialRuleOptions}
        />
      )}
    </div>
  );
};