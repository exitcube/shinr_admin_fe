'use client'
import { useSingleAdminUser } from "@/hooks/useUserQuery";
import { useParams } from "next/navigation";
import React from "react";
import { AdminUserForm } from "../UserForm";


export const AdminUserDetailForm: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const { data: singleAdminData } = useSingleAdminUser(id);
  const reward = singleAdminData?.data;
  const handleClose = () => null;
  return (
        <AdminUserForm data={reward} onCancel={handleClose}/>
  )
};
