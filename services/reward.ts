import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import { IBannerResponse } from "@/types/banner";

export class RewardService {
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
            ? `/rewards/category-listing?${queryParams}`
            : "/rewards/category-listing";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
    getTargetAudience = async () => {
        const url = "/rewards/get-target-audience";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
}
