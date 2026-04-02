import { PageTitle } from "@/components/common/PageTitle";
import { VendorDetailForm } from "@/components/vendor/vendorDetail/VendorDetailForm";
import React from "react";

export const VendorByIdPageContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 rounded-lg">
      <PageTitle redirectPath="/vendors" title="Vendor Details" />
      <VendorDetailForm />
    </div>
  );
};
