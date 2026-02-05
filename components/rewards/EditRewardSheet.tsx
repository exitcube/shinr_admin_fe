import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { RewardsForm } from "./RewardsForm";
import { PageLoading } from "@/components/common/PageLoader/PageLoading";
import { useSingleReward } from "@/hooks/useRewardQuery";

export const EditRewardSheet: React.FC<IProps> = ({
  rewardId,
  open,
  setOpen,
}) => {
     const { data, isLoading } = useSingleReward(rewardId.toString())
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
     {isLoading ?  <PageLoading />: <RewardsForm onCancel={() => setOpen(false)} data={data?.data}  rewardId={rewardId}/>}
    </SheetWrapper>
  );
};
interface IProps {
  rewardId: number 
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
