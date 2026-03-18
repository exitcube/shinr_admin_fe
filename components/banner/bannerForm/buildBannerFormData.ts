import { BannerFormValues } from "@/validations/banner";
import { TargetAudienceResponse } from "@/types/banner";

export const buildBannerFormData = (
  data: BannerFormValues,
  targetAudienceData?: TargetAudienceResponse,
  options?: {
    skipManualTargeting?: boolean;
  },
): FormData => {
  const formData = new FormData();


  formData.append("title", data.title);
  formData.append("owner", data.authenticity);
  formData.append("categoryId", data.categoryId);
  formData.append("targetValue", data.target_value);
  formData.append("priority", data.priority);


  if (data.startTime) {
    formData.append("startTime", data.startTime.toISOString());
  }

  if (data.endTime) {
    formData.append("endTime", data.endTime.toISOString());
  }


  formData.append("homePageView", data.homePageView ? "true" : "false");


  if (data.audience === "EVERYONE") {
    const everyoneId = targetAudienceData?.data
      ?.find((item) => item.category === "EVERYONE")
      ?.items[0]?.id;

    if (everyoneId) {
      formData.append("targetAudienceId[]", String(everyoneId));
    }
  }

  if (data.audience === "SPECIAL_RULE") {
    data.specialRuleIds?.forEach((id) => {
      formData.append("targetAudienceId[]", String(id));
    });
  }

  if (data.audience === "MANUAL" && !options?.skipManualTargeting) {
    const manualCategory = targetAudienceData?.data?.find(
      (item) => item.category === "MANUAL"
    );
    const selectedManualItems =
      manualCategory?.items?.filter((item) => item.value === data.manualType) ??
      [];
    const selectedManualItem = selectedManualItems[0];
    const manualAudienceId =
      selectedManualItem?.id ||
      manualCategory?.items?.[0]?.id;

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
