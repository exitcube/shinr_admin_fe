import { PageTitle } from "@/components/common/PageTitle";
import React from "react";
import { CustomerDetailForm } from "@/components/customer/customerDetail/CustomerDetailForm";

export const CustomerByIdPageContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 rounded-lg">
      <PageTitle redirectPath="/customer" title="Customer Details" />
      <CustomerDetailForm />
    </div>
  );
};
