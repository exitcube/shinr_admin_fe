export interface IBannerResponse {
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

export interface TargetAudienceResponse {
  success: boolean;
  message: string;
  data: {
    category: "MANUAL" | "EVERYONE" | "SPECIAL_RULE";
    displayText: string;
    items: {
      id: number;
      displayText: string;
      value: string;
      isFile: boolean;
      fileFieldName: string | null;
    }[];
  }[];
}


export type TargetAudienceCategory =
  TargetAudienceResponse["data"][number];


export type TargetAudienceOption = Pick<
  TargetAudienceCategory,
  "category" | "displayText"
>;

export interface IBannerFormPayload {
  title: string;
  bannerImage: File | null;
  categoryId: number;
  audience: "EVERYONE" | "MANUAL" | "SPECIAL_RULE";
  manualType?: "LOCATION_BASED" | "SELECTED_CUSTOMER" | "ALL_CUSTOMER";
  manualFile?: File | null;
  specialRuleIds?: number[];
  vendorId?: number;
  homePageView?: boolean;
  startTime: string;
  endTime: string;
  priority: number;
  isActive: boolean;
}

