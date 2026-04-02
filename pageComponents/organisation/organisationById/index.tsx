import { OrganisationDetailForm } from "@/components/organisation/organisationDetail/OrganisationDetailForm";
import React from "react";

export const OrganisationByIdPageContent: React.FC = () => {
  return (
    <div className="rounded-lg bg-white px-6 py-6">
      <OrganisationDetailForm />
    </div>
  );
};
