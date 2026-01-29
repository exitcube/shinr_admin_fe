'use client'
import React from "react";
import { RewardsForm } from "../RewardsForm";
import { useParams } from "next/navigation";
import { useSingleReward } from "@/hooks/useRewardQuery";

  
export const RewardsDetailForm: React.FC = () => {
  const {id}=useParams<{id:string}>();
  const {data:singleRewardData}= useSingleReward(id);
  const reward=singleRewardData?.data;
    const handleClose = () => null;
  return (
    <RewardsForm data={reward} onCancel={handleClose}/>
  );
};
