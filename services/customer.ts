import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import { CustomerListResponse } from "@/types/customer";

export class CustomerService {

    getCustomerUserList = async (
        queryParams?: URLSearchParams,
    ): Promise<CustomerListResponse> => {
        const url = queryParams
            ? `/customer/list-customer?${queryParams}`
            : "/customer/list-customer";
        try {
            const res = await API.post(url);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };

    getSingleCustomerUser = async (id: string) => {
        const url = `/customer/single-customer/${id}`;
        try {
            const res = await API.get(url);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };

    blockCustomer = async (id: string) => {
        const url = `/customer/block-customer/${id}`;
        try {
            const res = await API.post(url);
            return res.data;
        } catch (error) {
            throw new Error(handleAxiosError(error));
        }
    };
}