import { VehiclesTab } from "@/components/vehicles/VehiclesTab";
import React from "react";

export const VehiclesPageContent: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <VehiclesTab />
      </div>
    </div>
  );
};
