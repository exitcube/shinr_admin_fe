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
  status: "DRAFT" | "ACTIVE";
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
  rewardId?: number;
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

export interface SingleRewardResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    description: string;
    summary: string;
    sideText: string;

    category: {
      id: number;
      displayText: string;
    };

    offerType: {
      id: number;
      offerType: "PERCENTAGE" | "AMOUNT" | "CASHBACK";
      percentage?: number;
      maxAmount?: number;
    };

    contributor: {
      id: number;
      contributor: "SHARE" | "PLATFORM" | "VENDOR";
      shinrPercentage: number;
      vendorPercentage: number;
    };

    owner: "SHINR" | "VENDOR";

    vendor?: {
      id: number;
      name: string;
    };

    targetAudienceDetails: {
      id: number;
      displayName: string;
      value: string;
      category: "MANUAL" | "EVERYONE" | "SPECIAL_RULE";
      isFile: boolean;
      fileFieldName: string | null;
    }[];

    dispCouponPage: boolean;
    dispVendorPage: boolean;
    minOrderValue: number;
    maxUsage: number;
    maxUsagePeriod: "DAY" | "HOUR" | "MONTH" | "OVERALL";
    maxUsagePeriodValue: number;
    priority: number;
    startDate: string;
    endDate: string;
    grabLimit: number;
    singleCode: string;
    status: "ACTIVE" | "INACTIVE";
  };
}

