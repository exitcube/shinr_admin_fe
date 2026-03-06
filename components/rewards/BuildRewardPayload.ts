import { TargetAudienceResponse } from "@/types/banner";
import { RewardsFormValues } from "@/types/reward";

export const buildRewardPayload = (
  data: RewardsFormValues,
  targetAudienceData?: TargetAudienceResponse,
): FormData => {
  const formData = new FormData();
  let targetAudienceIds: number[] = [];

  if (data.audience === "EVERYONE") {
    const everyoneId = targetAudienceData?.data
      ?.find((item) => item.category === "EVERYONE")
      ?.items?.[0]?.id;

    if (everyoneId) {
      targetAudienceIds = [everyoneId];
    }
  }

  if (data.audience === "SPECIAL_RULE") {
    targetAudienceIds = data.specialRuleIds?.map(Number) ?? [];
  }

  if (data.audience === "MANUAL") {
    const manualCategory = targetAudienceData?.data?.find(
      (item) => item.category === "MANUAL",
    );
    const selectedManualItems =
      manualCategory?.items?.filter((item) => item.value === data.manualType) ??
      [];

    targetAudienceIds = Array.from(
      new Set(
        selectedManualItems
          .map((item) => Number(item.id))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    );
  }

  formData.append("owner", data.authenticity);
  formData.append("title", data.title);
  formData.append("sideText", data.side_text);
  formData.append("summary", data.content);
  formData.append("description", data.description);

  formData.append("rewardCategoryId", String(Number(data.rewardCategory)));

  const serviceCategoryIds = Array.isArray(data.serviceCategory)
    ? data.serviceCategory.map(Number)
    : [Number(data.serviceCategory)];

  serviceCategoryIds.forEach((id) => {
    formData.append("serviceCategoryIds[]", String(id));
  });

  formData.append("displayCouponPage", String(data.displayWalletPage));
  formData.append("displayVendorPage", String(data.displayVendorPage));

  formData.append("offerType", data.offer_type);

  const maxDiscountAmount = {
    PERCENTAGE: Number(data.maxDiscountAmount),
    AMOUNT: Number(data.amount),
    CASHBACK: Number(data.maxCashbackAmount),
  }[data.offer_type];

  formData.append("maxDiscountAmount", String(maxDiscountAmount));
  formData.append("minOrderValue", String(Number(data.minimum_order_value)));

  formData.append("codeGeneration", data.code_generation);
  formData.append("priority", String(Number(data.priority)));

  targetAudienceIds.forEach((id) => {
    formData.append("targetAudienceIds[]", String(id));
  });

  if (data.startTime) {
    formData.append("startDate", data.startTime.toISOString());
  }

  if (data.endTime) {
    formData.append("endDate", data.endTime.toISOString());
  }


  formData.append("totalGrabLimit", String(Number(data.total_grab_limit)));
  formData.append("contribution", data.contribution);

  formData.append("maxUsage", String(Number(data.maximum_usage_per_user)));
  formData.append("maxUsagePeriod", data.timeRangeType);

  formData.append("status", data.status);

  if (
    data.audience === "MANUAL" &&
    (data.manualType === "SELECTED_CUSTOMER" ||
      data.manualType === "LOCATION_BASED") &&
    data.manualFile instanceof File
  ) {
    const manualCategory = targetAudienceData?.data?.find(
      (item) => item.category === "MANUAL",
    );
    const selectedManualItems =
      manualCategory?.items?.filter((item) => item.value === data.manualType) ??
      [];
    const manualFileFieldName =
      selectedManualItems.find((item) => item.isFile)?.fileFieldName ||
      (data.manualType === "SELECTED_CUSTOMER"
        ? "selectedCustomer"
        : "locationFile");

    formData.append(manualFileFieldName, data.manualFile);
    // Keep legacy fallback key for APIs still wired to manualFile.
    formData.append("manualFile", data.manualFile);
    // Also attach both explicit manual keys for compatibility.
    formData.append("selectedCustomer", data.manualFile);
    formData.append("locationFile", data.manualFile);
  }

  if (data.authenticity === "VENDOR") {
    formData.append("vendorId", String(Number(data.vendorId)));
  }

  if (data.offer_type === "PERCENTAGE" || data.offer_type === "CASHBACK") {
    formData.append("percentage", String(Number(data.percentage)));
  }

  if (data.contribution === "SHARE") {
    formData.append("shinrPercentage", String(Number(data.shinrPercentage)));
    formData.append("vendorPercentage", String(Number(data.vendorPercentage)));
  }

  if (data.timeRangeType !== "OVERALL") {
    formData.append("maxUsagePeriodValue", String(Number(data.timeRangeValue)));
  }

  return formData;
};
