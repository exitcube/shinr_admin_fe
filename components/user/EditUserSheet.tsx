import { SheetWrapper } from "@/components/common/EditSheet";
import React from "react";
import { AdminUserForm } from "./UserForm";
import { useSingleAdminUser } from "@/hooks/useUserQuery";
import { PageLoading } from "../common/PageLoader/PageLoading";

export const EditAdminUserSheet: React.FC<IProps> = ({ open, setOpen, adminId }) => {
  const { data, isLoading } = useSingleAdminUser(adminId.toString());
  return (
    <SheetWrapper open={open} onOpenChange={setOpen} title="Edit Form">
      {isLoading ? <PageLoading /> : <AdminUserForm onCancel={() => setOpen(false)} adminId={adminId} data={data?.data} />}
    </SheetWrapper>
  );
};
interface IProps {
  adminId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
