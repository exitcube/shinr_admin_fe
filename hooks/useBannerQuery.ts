import { BannerService } from "@/services/banner"
import { ApproveBannerPayload, BannerListPayload, BannerListResponse, IBannerResponse,SingleBannerResponse,TargetAudienceResponse } from "@/types/banner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const bannerService = new BannerService()

export const useVendorListQuery = (search?: string) => {
    const queryParams = new URLSearchParams();
    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
        queryParams.set("search", trimmedSearch);
    }

    return useQuery<IBannerResponse>({
        queryKey: ["vendor-list", trimmedSearch ?? ""],
        queryFn: () =>
            bannerService.getVendorsList(
                queryParams.size ? queryParams : undefined,
            ),
    });
}

export const useBannerCategoryQuery = (search?: string) => {
    const queryParams = new URLSearchParams();
    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
        queryParams.set("search", trimmedSearch);
    }

    return useQuery<IBannerResponse>({
        queryKey: ["banner-category", trimmedSearch ?? ""],
        queryFn: () =>
            bannerService.getCategories(
                queryParams.size ? queryParams : undefined,
            ),
    });
}
export const useBannerTargetAudience = () => {
    return useQuery<TargetAudienceResponse>({
        queryKey: ["target-audience"],
        queryFn: () => bannerService.getTargetAudience(),
    });
}
export const useBannerList = (payload?: BannerListPayload) => {
    return useQuery<BannerListResponse>({
        queryKey: ["banner-list", payload],
        queryFn: () => bannerService.getBanners(payload),
    });
}
export const useCreateBannerMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<unknown, Error, FormData>({
        mutationKey: ["create-banner"],
        mutationFn: (payload) => bannerService.createBanner(payload),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["banner-list"] });
        },
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

export const useEditBannerCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    Error,
    {
      id: string;
      updatingText: string;
    }
  >({
    mutationKey: ["edit-banner-category"],
    mutationFn: (payload) => bannerService.editBannerCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner-category"] });
      toast.success("Banner category updated successfully");
    },
    onError: () => {
      toast.error("Banner category update failed");
    },
  });
};

export const useDeleteBannerCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationKey: ["delete-banner-category"],
    mutationFn: (bannerId) => bannerService.deleteBannerCategory(bannerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner-category"] });
      toast.success("Banner category deleted successfully");
    },
    onError: () => {
      toast.error("Banner category delete failed");
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
