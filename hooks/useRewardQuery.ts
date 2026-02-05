import { RewardService } from "@/services/reward";
import { TargetAudienceResponse } from "@/types/banner";
import {
  CreateRewardBody,
  IRewardResponse,
  RewardListResponse,
  SingleRewardResponse,
} from "@/types/reward";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const rewardService = new RewardService();

export const useRewardTargetAudience = () => {
  return useQuery<TargetAudienceResponse>({
    queryKey: ["target-audience"],
    queryFn: () => rewardService.getTargetAudience(),
  });
};

export const useRewardCategory = () => {
  return useQuery<IRewardResponse>({
    queryKey: ["reward-category"],
    queryFn: () => rewardService.getRewardCategories(),
  });
};

export const useServiceCategory = () => {
  return useQuery<IRewardResponse>({
    queryKey: ["service-category"],
    queryFn: () => rewardService.getServiceCategories(),
  });
};

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
};

export const useSingleReward = (id?: string) => {
  return useQuery<SingleRewardResponse>({
    queryKey: [`single-reward-${id}`],
    queryFn: () => rewardService.getSingleRewards(id!),
  });
};
export const useDeleteRewardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationKey: ["delete-reward"],
    mutationFn: (id: string) => rewardService.deleteReward(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reward-list"] });
      toast.success("Reward deleted successfully");
    },
    onError: () => {
      toast.error("Reward deleted failed");
    },
  });
};

export const useEditRewardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CreateRewardBody>({
    mutationKey: ["edit-reward"],
    mutationFn: (payload) => rewardService.editReward(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reward-list"] });
      toast.success("Reward edited successfully");
    },
    onError: () => {
      toast.error("Reward edited failed");
    },
  });
};
