import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { AddBrandForm } from "./AddBrandForm";

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
  brandData: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
