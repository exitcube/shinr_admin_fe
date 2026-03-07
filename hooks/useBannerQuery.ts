import { BannerService } from "@/services/banner"
import { ApproveBannerPayload, BannerListResponse, IBannerResponse,SingleBannerResponse,TargetAudienceResponse } from "@/types/banner";
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
    queryKey: [`single-banner-${id}`],  
    queryFn: () => bannerService.singleBanner(id!),
  });
};
export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
    return useMutation<unknown, Error, number>({
        mutationKey: ["delete-banner"],
        mutationFn: (id:number) => bannerService.deleteBanner(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["banner-list"] });
          toast.success("Banner deleted successfully");
        },
        onError: () => {
          toast.error("Banner deleted failed");
        },
    });
};

export const useEditBannerMutation = () => {
  const queryClient = useQueryClient();
    return useMutation<unknown, Error, FormData>({
        mutationKey: ["edit-banner"],
        mutationFn: (payload:FormData) => bannerService.editBanner(payload),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["banner-list"] });
          toast.success("Banner edited successfully");
        },
        onError: () => {
          toast.error("Banner edited failed");
        },
    });
};

export const useApproveOrRejectBannerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, ApproveBannerPayload>({
    mutationKey: ["approve-or-reject-banner"],
    mutationFn: (payload: ApproveBannerPayload) =>
      bannerService.approveOrRejectBanner(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["banner-list"] });
      queryClient.invalidateQueries({
        queryKey: [`single-banner-${variables.bannerId}`],
      });
      toast.success(
        variables.action === "approve"
          ? "Banner approved successfully"
          : "Banner rejected successfully"
      );
    },
    onError: (error) => {
      toast.error(error.message || "Banner action failed");
    },
  });
};
