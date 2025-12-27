import { BannerService } from "@/services/banner"
import { useQuery } from "@tanstack/react-query";

const bannerService = new BannerService()

export const useVendorListQuery = () => {
    return useQuery<{ message: string, accessToken: string }>({
        queryKey: ["vendor-list"],
        queryFn: () => bannerService.getVendorsList(),
    });
}

export const useBannerCategoryQuery = () => {
    return useQuery<{ message: string, accessToken: string }>({
        queryKey: ["banner-category"],
        queryFn: () => bannerService.getCategories(),
    });
}
export const useBannerTargetAudience = () => {
    return useQuery<{ message: string, accessToken: string }>({
        queryKey: ["target-audience"],
        queryFn: () => bannerService.getTargetAudience(),
    });
}
export const useBannerList = (queryParams?: URLSearchParams) => {
    return useQuery<{ message: string, accessToken: string }>({
        queryKey: ["target-audience"],
        queryFn: () => bannerService.getBanners(queryParams),
    });
}