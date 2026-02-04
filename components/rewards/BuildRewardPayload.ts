import { CreateRewardBody, RewardsFormValues } from "@/types/reward";

export const buildRewardPayload = (
  data: RewardsFormValues,
  targetAudienceData: any,
): CreateRewardBody => {
  let targetAudienceIds: number[] = [];

  if (data.audience === "SPECIAL_RULE") {
    targetAudienceIds = data.specialRuleIds?.map(Number) ?? [];
  }
  if (data.audience === "MANUAL") {
    const manualAudienceId = targetAudienceData?.data?.find(
      (item: any) => item.category === "MANUAL",
    )?.items?.[0]?.id;

    if (manualAudienceId) {
      targetAudienceIds = [manualAudienceId];
    }
  }

  const payload: CreateRewardBody = {
    owner: data.authenticity,
    title: data.title,
    sideText: data.side_text,
    summary: data.content,
    description: data.description,

    rewardCategoryId: Number(data.rewardCategory),
    serviceCategoryIds: Array.isArray(data.serviceCategory)
      ? data.serviceCategory.map(Number)
      : [Number(data.serviceCategory)],

    displayCouponPage: data.displayWalletPage,
    displayVendorPage: data.displayVendorPage,

    offerType: data.offer_type,

    maxDiscountAmount: {
      PERCENTAGE: Number(data.maxDiscountAmount),
      AMOUNT: Number(data.amount),
      CASHBACK: Number(data.maxCashbackAmount),
    }[data.offer_type],
    minOrderValue: Number(data.minimum_order_value),

    codeGeneration: data.code_generation,
    priority: Number(data.priority),

    targetAudienceIds,

    startDate: data.startTime,
    endDate: data.endTime,

    totalGrabLimit: Number(data.total_grab_limit),

    contribution: data.contribution,

    maxUsage: Number(data.maximum_usage_per_user),
    maxUsagePeriod: data.timeRangeType,

    status: data.status,
  };
  if (data.authenticity === "VENDOR") {
    payload.vendorId = Number(data.vendorId);
  }
  if (data.offer_type === "PERCENTAGE" || data.offer_type === "CASHBACK") {
    payload.percentage = Number(data.percentage);
  }
  if (data.contribution === "SHARE") {
    payload.shinrPercentage = Number(data.shinrPercentage);
    payload.vendorPercentage = Number(data.vendorPercentage);
  }
  if (data.timeRangeType !== "OVERALL") {
    payload.maxUsagePeriodValue = Number(data.timeRangeValue);
  }
  return payload;
};
