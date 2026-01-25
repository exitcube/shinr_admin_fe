import { PageTitle } from "@/components/common/PageTitle";
import { RewardsDetailForm } from "@/components/rewards/rewardsDetail/RewardsDetailForm";
import React from "react";

export const RewardsByIdPageContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 rounded-lg">
      <PageTitle redirectPath="/rewards" title="Winter check offer"/>
      <RewardsDetailForm />
    </div>
  );
};
