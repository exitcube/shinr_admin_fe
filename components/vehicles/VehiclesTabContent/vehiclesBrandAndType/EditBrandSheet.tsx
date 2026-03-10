import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { AddBrandForm } from "./AddBrandForm";

type VehicleBrandRow = {
  id: number | string;
  name: string;
  numberOfVehicle: number;
};

export const EditBrandSheet: React.FC<IProps> = ({
  brandId,
  brandData,
  open,
  setOpen,
}) => {
      
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
     <AddBrandForm onCancel={() => setOpen(false)} brandData={brandData}  brandId={brandId}/>
    </SheetWrapper>
  );
};
interface IProps {
  brandId: number;
  brandData: VehicleBrandRow;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
