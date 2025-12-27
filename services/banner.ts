import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";

export class BannerService {
    getVendorsList = async (queryParams?: URLSearchParams) => {
        const url = queryParams
            ? `/banner/get-vendors?${queryParams}`
            : "/banner/get-vendors";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
    getCategories = async (queryParams?: URLSearchParams) => {
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
    getBanners = async (queryParams?: URLSearchParams) => {
        const url = queryParams
            ? `/banner/getBanners?${queryParams}`
            : "/banner/getBanners";
        try {
            const res = await API.get(url)
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error))
        }
    }
}
