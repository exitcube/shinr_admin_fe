import { RewardService } from "@/services/reward"
import { TargetAudienceResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";

const rewardService = new RewardService()

export const useRewardTargetAudience = () => {
    return useQuery<TargetAudienceResponse>({
        queryKey: ["target-audience"],
        queryFn: () => rewardService.getTargetAudience(),
    });
}
