import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import {
    IServiceResponse,
    ServiceListResponse,
    SingleServiceResponse,
} from "@/types/service";

export class Service {
    getServiceCategories = async (
        queryParams?: URLSearchParams,
    ): Promise<IServiceResponse> => {
        const url = queryParams
            ? `/service/service-listing?${queryParams}`
            : "/service/service-listing";
        try {
            const res = await API.get(url);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };
    getServiceList = async (
        queryParams?: URLSearchParams,
    ): Promise<ServiceListResponse> => {
        const url = queryParams
            ? `/service/list-service?${queryParams}`
            : "/service/list-service";
        try {
            const res = await API.post(url);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };

    createService = async (payload: FormData) => {
        const url = "/service/create-service";

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

    deleteService = async (id: string): Promise<void> => {
        const url = `/service/delete-service/${id}`;
        try {
            await API.post(url);
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };

    editService = async (payload: FormData) => {
        const url = "/service/update-service";
        try {
            const res = await API.put(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };

    singleService = async (id: string): Promise<SingleServiceResponse> => {
        try {
            const res = await API.get(`/service/single-service/${id}`);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    }
}