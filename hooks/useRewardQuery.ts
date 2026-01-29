import { RewardService } from "@/services/reward"
import { TargetAudienceResponse } from "@/types/banner";
import { CreateRewardBody, IRewardResponse, RewardListResponse, SingleRewardResponse } from "@/types/reward";
import { useMutation, useQuery } from "@tanstack/react-query";

const rewardService = new RewardService()

export const useRewardTargetAudience = () => {
    return useQuery<TargetAudienceResponse>({
        queryKey: ["target-audience"],
        queryFn: () => rewardService.getTargetAudience(),
    });
}

export const useRewardCategory = () => {
    return useQuery<IRewardResponse>({
        queryKey: ["reward-category"],
        queryFn: () => rewardService.getRewardCategories(),
    });
}

export const useServiceCategory = () => {
    return useQuery<IRewardResponse>({
        queryKey: ["service-category"],
        queryFn: () => rewardService.getServiceCategories(),
    });
}

export const useCreateRewardMutation = () => {
  return useMutation<unknown, Error, CreateRewardBody>({
    mutationKey: ["create-reward"],
    mutationFn: (payload) => rewardService.createReward(payload),
  });
};

export const useRewardList = (queryParams?: URLSearchParams) => {
    return useQuery<RewardListResponse>({
        queryKey: ["reward-list"],
        queryFn: () => rewardService.getRewards(queryParams),
    });
}

export const useSingleReward=(id?:string)=>{
     return useQuery<SingleRewardResponse>({
        queryKey: ["single-reward"],
        queryFn: () => rewardService.getSingleRewards(id!),
    });
}

