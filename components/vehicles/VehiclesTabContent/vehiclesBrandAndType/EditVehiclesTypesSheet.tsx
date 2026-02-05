import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { AddTypeForm } from "./AddTypeForm";

export const EditTypeSheet: React.FC<IProps> = ({
  typeId,
  typeData,
  open,
  setOpen,
}) => {
      
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
     <AddTypeForm onCancel={() => setOpen(false)} typeData={typeData}  typeId={typeId}/>
    </SheetWrapper>
  );
};
interface IProps {
  typeId: number;
  typeData: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
