'use client'
import React from "react";
import { RewardsForm } from "../RewardsForm";

export const RewardsDetailForm: React.FC = () => {
    const handleClose = () => null;
  return (
      <div className="flex flex-col gap-10 w-full">
      <div className="flex gap-3 w-full">
        <div className="flex-1 bg-[#F5F5F5] border border-[#EDEDED] rounded-lg py-2 px-3 flex gap-1 items-center whitespace-nowrap">
          <p className="text-[#606060] text-xs">Overall Reward Limit:</p>
          <p className="text-[#101010] text-sm">100</p>
        </div>

        <div className="flex-1 bg-[#F5F5F5] border border-[#EDEDED] rounded-lg py-2 px-3 flex gap-1 items-center whitespace-nowrap">
          <p className="text-[#606060] text-xs">Claimed Reward:</p>
          <p className="text-[#101010] text-sm">17</p>
        </div>

        <div className="flex-1 bg-[#F5F5F5] border border-[#EDEDED] rounded-lg py-2 px-3 flex gap-1  items-center whitespace-nowrap">
          <p className="text-[#606060] text-xs">Claimable Reward:</p>
          <p className="text-[#101010] text-sm">83</p>
        </div>
      </div>
      <RewardsForm onCancel={handleClose}/>
    </div>
  );
};
