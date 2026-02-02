import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import { BannerListResponse, IBannerFormPayload, IBannerResponse, SingleBannerResponse } from "@/types/banner";

export class BannerService {
    getVendorsList = async (queryParams?: URLSearchParams) => {
        const url = queryParams
            ? `/vendor/get-vendors?${queryParams}`
            : "/vendor/get-vendors";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
    getCategories = async (queryParams?: URLSearchParams):Promise<IBannerResponse> => {
        const url = queryParams
            ? `/banner/get-categories?${queryParams}`
            : "/banner/get-categories";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
    getTargetAudience = async () => {
        const url = "/banner/getTargetAudience";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
    getBanners = async (queryParams?: URLSearchParams):Promise<BannerListResponse> => {
        const url = queryParams
            ? `/banner/getBanners?${queryParams}`
            : "/banner/getBanners";
        try {
            const res = await API.post(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }

    createBanner = async (payload: FormData) => {
        const url = "/banner/create-banner"; 

        try {
            const res = await API.post(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };

    singleBanner = async (id: string): Promise<SingleBannerResponse> => {
        try {
            const res = await API.get(`/banner/${id}`);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    }
    deleteBanner = async (id: string) => {
        try {
            const res = await API.delete(`/banner/delete-banner/${id}`);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    }
}
