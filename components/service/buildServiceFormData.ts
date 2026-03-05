import { BannerFormValues } from "@/validations/banner";
import { TargetAudienceResponse } from "@/types/banner";
import { ServiceFormValues } from "@/validations/service";

export const buildServiceFormData = (
  data: ServiceFormValues,
  id?: number
): FormData => {
  const formData = new FormData();


  formData.append("name", data.name);
  formData.append("displayName", data.displayName);
  formData.append("description", data.description);
  formData.append("displaySequence", data.displaySequence);
  if (data.serviceImg) {
    formData.append("serviceImage", data.serviceImg);
  }

  return formData;
};
