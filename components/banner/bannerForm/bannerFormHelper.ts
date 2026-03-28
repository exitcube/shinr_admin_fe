import { formatLocalDateTime } from "@/lib/utils";
import { SingleBannerResponse, TargetAudienceResponse } from "@/types/banner";
import { BannerFormValues } from "@/validations/banner";

type ManualType = "SELECTED_CUSTOMER" | "LOCATION_BASED" | undefined;

export const resolveManualType = (
  manualValue?: string,
  manualDisplayText?: string,
): ManualType => {
  if (
    manualValue === "SELECTED_CUSTOMER" ||
    manualDisplayText === "SELECTED_CUSTOMER"
  ) {
    return "SELECTED_CUSTOMER";
  }
  if (
    manualValue === "LOCATION_BASED" ||
    manualDisplayText === "LOCATION_BASED"
  ) {
    return "LOCATION_BASED";
  }
  return undefined;
};



export const normalizeIds = (values?: Array<number | string>) =>
  Array.from(
    new Set((values ?? []).map(Number).filter((value) => Number.isFinite(value))),
  ).sort((a, b) => a - b);

export const areEqualIds = (left: number[], right: number[]) =>
  left.length === right.length &&
  left.every((value, index) => value === right[index]);

export const getInitialTargetAudienceState = (
  bannerData?: SingleBannerResponse["data"],
) => {
  const initialAudience = bannerData?.targetAudienceDetails?.[0]?.category;
  const initialSpecialRuleIds = normalizeIds(
    bannerData?.targetAudienceDetails
      ?.filter((item) => item.category === "SPECIAL_RULE")
      .map((item) => item.id),
  );

  const initialManualItems =
    bannerData?.targetAudienceDetails?.filter(
      (item) => item.category === "MANUAL",
    ) ?? [];
  const initialManualAudience =
    initialManualItems.find((item) => !item.isFile) || initialManualItems[0];
  const initialManualFile = initialManualItems.find((item) => item.isFile);
  const initialManualType = resolveManualType(
    initialManualAudience?.value ?? initialManualFile?.fileFieldName ?? undefined,
    initialManualAudience?.displayText ??
      initialManualFile?.displayText ??
      undefined,
  );

  return {
    initialAudience,
    initialSpecialRuleIds,
    initialManualType,
  };
};

export const buildBannerFormData = (
  data: BannerFormValues,
  targetAudienceData?: TargetAudienceResponse,
  options?: {
    includeTargetAudience?: boolean;
    skipManualTargeting?: boolean;
  },
): FormData => {
  const formData = new FormData();
  const includeTargetAudience = options?.includeTargetAudience ?? true;

  formData.append("title", data.title);
  formData.append("owner", data.authenticity);

  if (data.authenticity === "VENDOR" && data.vendorId) {
    formData.append("vendorId", data.vendorId);
  }

  formData.append("categoryId", data.categoryId);
  formData.append("targetValue", data.target_value);
  formData.append("priority", data.priority);

  if (data.startTime) {
    formData.append("startTime", formatLocalDateTime(data.startTime));
  }

  if (data.endTime) {
    formData.append("endTime", formatLocalDateTime(data.endTime));
  }

  formData.append("homePageView", data.homePageView ? "true" : "false");

  if (includeTargetAudience && data.audience === "EVERYONE") {
    const everyoneId = targetAudienceData?.data
      ?.find((item) => item.category === "EVERYONE")
      ?.items[0]?.id;

    if (everyoneId) {
      formData.append("targetAudienceId[]", String(everyoneId));
    }
  }

  if (includeTargetAudience && data.audience === "SPECIAL_RULE") {
    data.specialRuleIds?.forEach((id) => {
      formData.append("targetAudienceId[]", String(id));
    });
  }

  if (
    includeTargetAudience &&
    data.audience === "MANUAL" &&
    !options?.skipManualTargeting
  ) {
    const manualCategory = targetAudienceData?.data?.find(
      (item) => item.category === "MANUAL",
    );
    const selectedManualItems =
      manualCategory?.items?.filter((item) => item.value === data.manualType) ??
      [];
    const selectedManualItem = selectedManualItems[0];
    const manualAudienceId =
      selectedManualItem?.id || manualCategory?.items?.[0]?.id;

    if (manualAudienceId) {
      formData.append("targetAudienceId[]", String(manualAudienceId));
    }

    if (
      (data.manualType === "SELECTED_CUSTOMER" ||
        data.manualType === "LOCATION_BASED") &&
      data.manualFile instanceof File
    ) {
      const manualFileFieldName =
        selectedManualItems.find((item) => item.isFile)?.fileFieldName ||
        (data.manualType === "SELECTED_CUSTOMER"
          ? "selectedCustomer"
          : "locationFile");

      formData.append(manualFileFieldName, data.manualFile);
    }
  }

  if (data.bannerImage instanceof File && data.bannerImage.size > 0) {
    formData.append("bannerImage", data.bannerImage);
  }

  return formData;
};
