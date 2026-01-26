export type RewardsFormValues = {
  authenticity: "SHINR" | "VENDOR";
  title: string;
  side_text: string;
  content: string;
  description: string;
  rewardCategory: string;
  serviceCategory: string;
  displayLocation: string;

  offer_type: "percentage" | "amount" | "cashback";
  minimum_order_value: string;
  code_generation: string;
  priority: string;

  audience: "EVERYONE" | "MANUAL" | "SPECIAL_RULE";
  manualType?: "SELECTED_CUSTOMER" | "LOCATION_BASED";
  manualFile?: File;
  specialRuleIds?: number[];

  startTime: Date | null;
  endTime: Date | null;

  total_grab_limit: string;
  contribution: "platform" | "vendor" | "share";
  maximum_usage_per_user: string;

  timeRangeType: "hour" | "day" | "month" | "overall";
  timeRangeValue: number | null;
};
