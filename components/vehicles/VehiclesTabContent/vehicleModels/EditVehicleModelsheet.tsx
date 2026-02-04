import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { AddVehicleForm } from "./AddVehicleForm";

export const EditVehicleSheet: React.FC<IProps> = ({
  vehicleId,
  vehicleData,
  open,
  setOpen,
}) => {
      
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
     <AddVehicleForm onCancel={() => setOpen(false)} vehicleData={vehicleData}  vehicleId={vehicleId}/>
    </SheetWrapper>
  );
};
interface IProps {
  vehicleId: number;
  vehicleData: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
