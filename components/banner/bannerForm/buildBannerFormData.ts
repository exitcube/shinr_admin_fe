import { BannerFormValues } from "@/validations/banner";
import { TargetAudienceResponse } from "@/types/banner";

export const buildBannerFormData = (
  data: BannerFormValues,
  targetAudienceData?: TargetAudienceResponse
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

  if (data.audience === "MANUAL") {
    const manualAudienceId = targetAudienceData?.data
      ?.find((item) => item.category === "MANUAL")
      ?.items[0]?.id;

    if (manualAudienceId) {
      formData.append("targetAudienceId[]", String(manualAudienceId));
    }

    if (
      (data.manualType === "SELECTED_CUSTOMER" ||
        data.manualType === "LOCATION_BASED") &&
      data.manualFile instanceof File
    ) {
      formData.append("manualFile", data.manualFile);
    }
  }


  if (data.bannerImage) {
    formData.append("bannerImage", data.bannerImage);
  }

  return formData;
};