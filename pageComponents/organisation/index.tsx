"use client";

import { CreateOrganisationSheet } from "@/components/organisation/CreateOrganisationSheet";
import { OrganisationTable } from "@/components/organisation/OrganisationTable";
import {
  CreateOrganisationInput,
  OrganisationListItem,
} from "@/types/organisation";
import React, { useState } from "react";
import { organisationListData } from "./mockData";

const currentJoiningDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(new Date());

export const OrganisationPageContent: React.FC = () => {
  const [organisationData, setOrganisationData] = useState<OrganisationListItem[]>(
    organisationListData,
  );

  const handleAddOrganisation = (organisation: CreateOrganisationInput) => {
    setOrganisationData((prev) => {
      const nextId = prev.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

      return [
        {
          id: nextId,
          organisationCode: `ORG${String(nextId).padStart(6, "0")}`,
          name: organisation.name,
          email: organisation.email,
          joiningDate: currentJoiningDate,
          mobileNumber: organisation.mobileNumber,
          accountStatus: "Pending",
          status: "Active",
          profileImageUrl: organisation.profileImageUrl,
        },
        ...prev,
      ];
    });
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <CreateOrganisationSheet onCreate={handleAddOrganisation} />
        </div>
        <OrganisationTable data={organisationData} />
      </div>
    </div>
  );
};
