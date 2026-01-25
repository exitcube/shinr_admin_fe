import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { VehicleModels } from "./VehiclesTabContent/vehicleModels";
import { VehiclesBrandAndType } from "./VehiclesTabContent/vehiclesBrandAndType";

export const VehiclesTab: React.FC = () => {
  return (
    <Tabs defaultValue="vehicle-models" className="w-full">
      <TabsList className="w-full gap-3 mb-5">
        <TabsTrigger
          value="vehicle-models"
          className="data-[state=active]:bg-[#B6DBD7] data-[state=active]:text-[#107F73]! text-[#101010] py-4 px-3 shadow"
        >
          Vehicle Models
        </TabsTrigger>
        <TabsTrigger
          value="vehicle-BrandType"
          className="data-[state=active]:bg-[#B6DBD7] data-[state=active]:text-[#107F73]! text-[#101010] py-4 px-3 shadow"
        >
          Vehicle Brand & Type
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vehicle-models">
        <VehicleModels />
      </TabsContent>
      <TabsContent value="vehicle-BrandType">
        <VehiclesBrandAndType />
      </TabsContent>
    </Tabs>
  );
};
