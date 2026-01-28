export type RewardsFormValues = {
  authenticity: "SHINR" | "VENDOR";
  vendorId?: string;
  title: string;
  side_text: string;
  content: string;
  description: string;
  rewardCategory: string;
  serviceCategory: number[];
  displayVendorPage: boolean;
 displayWalletPage: boolean;


  offer_type: "PERCENTAGE" | "AMOUNT" | "CASHBACK";
  percentage?: string;
  maxDiscountAmount?: string;
  maxCashbackAmount?: string;
  amount?: string;
  minimum_order_value: string;
  code_generation: string;
  priority: string;

  audience: "EVERYONE" | "MANUAL" | "SPECIAL_RULE";
  manualType?: "SELECTED_CUSTOMER" | "LOCATION_BASED";
  manualFile?: File;
  specialRuleIds?: number[];

  startTime: string;
  endTime: string;

  total_grab_limit: string;
  contribution: "PLATFORM" | "VENDOR" | "SHARE";
  shinrPercentage?: string;
  vendorPercentage?: string;
  maximum_usage_per_user: string;

  timeRangeType: "HOUR" | "DAY" | "MONTH" | "OVERALL";
  timeRangeValue: number | null;
};

export interface IRewardResponse {
  data: [{ name: string, id: string }],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false
  }
}

export type CreateRewardBody = {
  owner: "SHINR" | "VENDOR";
  vendorId?: number|undefined;

  title: string;
  sideText?: string;
  summary?: string;
  description?: string;

  rewardCategoryId: number;
  serviceCategoryIds: number[];

  displayCouponPage: boolean;
  displayVendorPage: boolean;

  offerType: "PERCENTAGE" | "AMOUNT" | "CASHBACK";
  percentage?: number;

  maxDiscountAmount?: number;
  minOrderValue?: number;

  codeGeneration: string;
  priority: number;

  targetAudienceIds: number[];

  startDate: string;
  endDate: string;

  totalGrabLimit: number;

  contribution: "SHARE" | "PLATFORM" | "VENDOR";
  shinrPercentage?: number;
  vendorPercentage?: number;

  maxUsage: number;
  maxUsagePeriod: "HOUR" | "DAY" | "MONTH" | "OVERALL";
  maxUsagePeriodValue?: number;

  status: "DRAFT" | "ACTIVE" | "EXPIRED";
};

export interface RewardListResponse {
  data: {
    id: number;
    title: string;
    category?: string;
    status: "ACTIVE" | "DRAFT" | "EXPIRED";
    owner: "SHINR" | "VENDOR";
    vendor?: string;
    startTime: string;
    endTime: string;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
