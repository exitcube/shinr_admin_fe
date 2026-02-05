import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { AdminUserForm } from "./UserForm";

export const EditAdminUserSheet: React.FC<IProps> = ({ open, setOpen }) => {
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
      {<AdminUserForm onCancel={() => setOpen(false)} />}
    </SheetWrapper>
  );
};
interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
