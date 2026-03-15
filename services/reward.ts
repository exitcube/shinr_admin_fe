import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import {
  IRewardResponse,
  RewardListPayload,
  RewardListResponse,
  SingleRewardResponse,
} from "@/types/reward";

export class RewardService {
  getVendorsList = async (queryParams?: URLSearchParams) => {
    const url = queryParams
      ? `/vendor/get-vendors?${queryParams}`
      : "/vendor/get-vendors";
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };
  getRewardCategories = async (
    queryParams?: URLSearchParams,
  ): Promise<IRewardResponse> => {
    const url = queryParams
      ? `/rewards/category-listing?${queryParams}`
      : "/rewards/category-listing";
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };
  getServiceCategories = async (
    queryParams?: URLSearchParams,
  ): Promise<IRewardResponse> => {
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
  getTargetAudience = async () => {
    const url = "/rewards/get-target-audience";
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };
  createReward = async (payload: FormData) => {
    const url = "/rewards/create-reward";

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
  getRewards = async (payload?: RewardListPayload): Promise<RewardListResponse> => {
    const url = "/rewards/list-rewards";
    try {
      const res = await API.post(url, payload ?? {});
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  getSingleRewards = async (id: string): Promise<SingleRewardResponse> => {
    const url = `/rewards/getSingleReward/${id}`;
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  deleteReward = async (id: string): Promise<void> => {
    const url = `/rewards/delete-reward/${id}`;
    try {
      await API.post(url);
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };
  editReward = async (payload: FormData) => {
    const url = "/rewards/update-reward";

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
}
