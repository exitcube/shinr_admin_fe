import { BannerService } from "@/services/banner"
import { BannerListResponse, IBannerFormPayload, IBannerResponse,SingleBannerResponse,TargetAudienceResponse } from "@/types/banner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const bannerService = new BannerService()

export const useVendorListQuery = () => {
    return useQuery<{ message: string, accessToken: string }>({
        queryKey: ["vendor-list"],
        queryFn: () => bannerService.getVendorsList(),
    });
}

export const useBannerCategoryQuery = () => {
    return useQuery<IBannerResponse>({
        queryKey: ["banner-category"],
        queryFn: () => bannerService.getCategories(),
    });
}
export const useBannerTargetAudience = () => {
    return useQuery<TargetAudienceResponse>({
        queryKey: ["target-audience"],
        queryFn: () => bannerService.getTargetAudience(),
    });
}
export const useBannerList = (queryParams?: URLSearchParams) => {
    return useQuery<BannerListResponse>({
        queryKey: ["banner-list"],
        queryFn: () => bannerService.getBanners(queryParams),
    });
}
export const useCreateBannerMutation = () => {
    return useMutation<unknown, Error, FormData>({
        mutationKey: ["create-banner"],
        mutationFn: (payload) => bannerService.createBanner(payload),
    });
};
export const useSingleBanner = (id?: string) => {
  return useQuery<SingleBannerResponse>({
    queryKey: ["single-banner"],  
    queryFn: () => bannerService.singleBanner(id!),
  });
};
export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
    return useMutation<unknown, Error, string>({
        mutationKey: ["delete-banner"],
        mutationFn: (id:string) => bannerService.deleteBanner(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["banner-list"] });
          toast.success("Banner deleted successfully");
        },
        onError: () => {
          toast.error("Banner deleted failed");
        },
    });
};