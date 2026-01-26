"use client";

import { UseFormReturn,FieldValues,Path ,FieldPathValue} from "react-hook-form";
import { BannerFormValues } from "@/validations/banner";
import { LabelledRadioInput } from "@/components/common/LabelledRadioInput";
import { TargetAudienceFormField } from "@/components/banner/bannerForm/TargetAudienceFormField";
import { ManualFileUploadField } from "@/components/banner/bannerForm/ManualFileUploadField";
import { SpecialRuleCheckboxes } from "@/components/banner/bannerForm/SpecialRuleCheckboxes";
import { TargetAudienceOption } from "@/types/banner";

type TargetAudienceBaseFields = {
  audience: "MANUAL" | "EVERYONE" | "SPECIAL_RULE";
  manualType?: "SELECTED_CUSTOMER" | "LOCATION_BASED";
  manualFile?: File;
  specialRuleIds?: number[];
};

interface Props<T extends FieldValues & TargetAudienceBaseFields> {
  form: UseFormReturn<T>;
  name: Path<T>;
  targetAudienceOptions: TargetAudienceOption[];
  specialRuleOptions: {
    id: number;
    displayText: string;
    value: string;
    isFile: boolean;
    fileFieldName: string | null;
  }[];
}

 


export function TargetAudienceSection<
  T extends FieldValues & TargetAudienceBaseFields
>({
  form,
  name,
  targetAudienceOptions,
  specialRuleOptions,
}: Props<T>) {
  const audience = form.watch("audience" as Path<T>);
  const manualType = form.watch("manualType" as Path<T>);
  return (
    <div className="flex flex-col gap-2">
      {/* Target Audience */}
      <TargetAudienceFormField
        control={form.control}
        name={name}
        options={targetAudienceOptions}
      />

      {/* MANUAL */}
      {audience === "MANUAL" && (
        <div className="ml-6 mt-3 flex flex-col gap-4">
          <LabelledRadioInput
            label="Selected customer"
            value="SELECTED_CUSTOMER"
            checked={manualType === "SELECTED_CUSTOMER"}
            onChange={() =>
             form.setValue("manualType" as Path<T>, "SELECTED_CUSTOMER" as FieldPathValue<T, Path<T>>)
            }
          />

          {manualType === "SELECTED_CUSTOMER" && (
            <ManualFileUploadField
              control={form.control}
              name={"manualFile" as Path<T>}
            />
          )}

          <LabelledRadioInput
            label="Location Based"
            value="LOCATION_BASED"
            checked={manualType === "LOCATION_BASED"}
            onChange={() =>
              form.setValue("manualType" as Path<T>, "LOCATION_BASED" as FieldPathValue<T, Path<T>>)
            }
          />

          {manualType === "LOCATION_BASED" && (
            <ManualFileUploadField
              control={form.control}
              name={"manualFile" as Path<T>}
            />
          )}
        </div>
      )}

      {/* SPECIAL RULE */}
      {audience === "SPECIAL_RULE" && (
        <SpecialRuleCheckboxes
          control={form.control}
          name={"specialRuleIds" as Path<T>}
          options={specialRuleOptions}
        />
      )}
    </div>
  );
};