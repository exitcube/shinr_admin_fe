import { AdminUserDetailForm } from "@/components/user/userDetail/UserDetailForm";
import { PageTitle } from "@/components/common/PageTitle";
import React from "react";

export const AdminUserByIdPageContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 rounded-lg">
      <PageTitle redirectPath="/user" title="Winter check offer" />
      <AdminUserDetailForm />
    </div>
  );
};
