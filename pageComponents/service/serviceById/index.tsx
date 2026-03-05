import { PageTitle } from "@/components/common/PageTitle";
import React from "react";
import { ServiceDetailForm } from "@/components/service/serviceDetail/ServiceDetailForm";

export const ServiceByIdPageContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-6 rounded-lg">
      <PageTitle redirectPath="/service" title="Service Details" />
      <ServiceDetailForm />
    </div>
  );
};
