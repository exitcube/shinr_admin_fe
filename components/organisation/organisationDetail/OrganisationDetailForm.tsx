"use client";

import { DataListTable, TableColumn } from "@/components/common/DataListTable";
import { Button } from "@/components/ui/button";
import {
  OrganisationAccountStatus,
  OrganisationApprovalStep,
  OrganisationDetail,
  OrganisationVendorItem,
  OrganisationWorkflowStatus,
  UpdateOrganisationStatusInput,
} from "@/types/organisation";
import { ArrowLeft, FileBadge2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { getOrganisationDetail } from "@/pageComponents/organisation/mockData";
import { Input } from "@/components/ui/input";
import { UpdateStatusSheet } from "./UpdateStatusSheet";

const ACCOUNT_STATUS_STYLES: Record<OrganisationAccountStatus, string> = {
  Pending: "bg-[#F2F2F7] text-[#8E8E93]",
  Active: "bg-[#E9FBF0] text-[#22C05D]",
  Blocked: "bg-[#FFF2F2] text-[#FF3B30]",
};

const STATUS_STYLES: Record<OrganisationVendorItem["status"], string> = {
  Active: "bg-[#E9FBF0] text-[#22C05D]",
  Inactive: "bg-[#FFF2F2] text-[#FF3B30]",
};

const REVIEW_STATUS_STYLES: Record<OrganisationDetail["reviewStatusTone"], string> = {
  warning: "bg-[#FFB83E] text-white",
  success: "bg-[#22C05D] text-white",
  neutral: "bg-[#F2F2F7] text-[#5B5B5B]",
};

const STEP_TITLE_BY_STATUS: Record<OrganisationWorkflowStatus, string> = {
  ACCOUNT_CREATED: "Account Created",
  UNDER_VERIFICATION: "Under Verification",
  APPROVAL: "Approval",
};

const getInitials = (value: string) => {
  return value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const mapStepsWithStatus = (
  steps: OrganisationApprovalStep[],
  status: OrganisationWorkflowStatus,
  action: UpdateOrganisationStatusInput["action"],
  note: string,
) => {
  const currentIndex = steps.findIndex((step) => step.title === STEP_TITLE_BY_STATUS[status]);

  return steps.map((step, index) => {
    const nextStep = { ...step };

    if (index < currentIndex) {
      nextStep.state = "completed";
      return nextStep;
    }

    if (index === currentIndex) {
      nextStep.state = action === "approve" ? "completed" : "current";
      if (note.trim()) {
        nextStep.description = note;
      }
      return nextStep;
    }

    nextStep.state = "pending";
    return nextStep;
  });
};

export const OrganisationDetailForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState(() => getOrganisationDetail(id));

  const vendorColumns: TableColumn<OrganisationVendorItem>[] = useMemo(
    () => [
      {
        header: "Vendor Code",
        accessor: "vendorCode",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Name",
        accessor: "name",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Joining Date",
        accessor: "joiningDate",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        className: "text-xs text-[#303030]",
      },
      {
        header: "Account Status",
        accessor: "accountStatus",
        className: "text-xs",
        cell: (row) => (
          <span
            className={`inline-flex min-w-[88px] items-center justify-center rounded-md px-4 py-1 text-xs font-medium ${ACCOUNT_STATUS_STYLES[row.accountStatus]}`}
          >
            {row.accountStatus}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        className: "text-xs",
        cell: (row) => (
          <span
            className={`inline-flex min-w-[88px] items-center justify-center rounded-md px-4 py-1 text-xs font-medium ${STATUS_STYLES[row.status]}`}
          >
            {row.status}
          </span>
        ),
      },
    ],
    [],
  );

  const handleStatusUpdate = ({ status, note, action }: UpdateOrganisationStatusInput) => {
    setDetail((prev) => ({
      ...prev,
      currentWorkflowStatus: status,
      reviewStatusLabel:
        action === "approve"
          ? status === "APPROVAL"
            ? "Approved"
            : STEP_TITLE_BY_STATUS[status]
          : "Rejected",
      reviewStatusTone: action === "approve" ? "success" : "neutral",
      approvalSteps: mapStepsWithStatus(prev.approvalSteps, status, action, note),
    }));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <Link href="/organisation" className="flex items-center gap-3 text-[#303030]">
          <ArrowLeft className="size-5" />
          <span className="text-lg font-medium">{detail.organisationCode}</span>
        </Link>
        <span
          className={`inline-flex items-center rounded-md px-5 py-2 text-sm font-medium ${REVIEW_STATUS_STYLES[detail.reviewStatusTone]}`}
        >
          {detail.reviewStatusLabel}
        </span>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-10">
          <div>
            <p className="mb-4 text-xl font-medium text-[#7A7A7A]">Profile image</p>
            {detail.profileImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={detail.profileImageUrl}
                alt={detail.name}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#101010] text-2xl font-semibold text-white">
                {getInitials(detail.name)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
            <DetailInput label="Name" value={detail.name} />
            <DetailInput label="Email" value={detail.email} />
            <DetailText label="Phone number" value={detail.phoneNumber} />
            <DetailText label="Registered On" value={detail.registeredOn} />
          </div>
        </div>

        <div className="flex items-start justify-between gap-8">
          <h2 className="text-[24px] font-semibold text-primary">Approval status</h2>
          <UpdateStatusSheet
            defaultStatus={detail.currentWorkflowStatus}
            onSubmit={handleStatusUpdate}
          />
        </div>

        <div className="flex flex-col gap-0 pl-10">
          {detail.approvalSteps.map((step, index) => {
            const isLast = index === detail.approvalSteps.length - 1;
            const isCompleted = step.state === "completed";
            const isCurrent = step.state === "current";

            return (
              <div key={step.id} className="relative flex gap-5 pb-8">
                <div className="relative flex w-6 justify-center">
                  {!isLast && (
                    <span
                      className={`absolute top-3 w-0 border-l-2 ${
                        isCompleted || isCurrent
                          ? "bottom-[-32px] border-[#35D067]"
                          : "bottom-[-32px] border-dashed border-[#9A9A9A]"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 mt-1 h-3.5 w-3.5 rounded-full ${
                      isCompleted || isCurrent ? "bg-[#35D067]" : "bg-[#8B8B8B]"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[19px] font-semibold text-[#202020]">{step.title}</p>
                  <p className="mt-1 text-[17px] text-[#9A9A9A]">{step.description}</p>
                  {step.attachmentLabel && (
                    <div className="mt-2 flex items-center gap-2 text-[16px] text-[#8A8A8A]">
                      <span>Attached:</span>
                      <FileBadge2 className="size-4 text-[#6D56FF]" />
                      <span>{step.attachmentLabel}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[24px] font-semibold text-primary">Vendor List</h2>
          <Button className="bg-primary text-white px-4! py-2.5!">
            +&nbsp;Add vendor
          </Button>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-[0_0_0_1px_rgba(237,237,237,1)]">
          <DataListTable columns={vendorColumns} data={detail.vendors} />
        </div>
      </div>
    </div>
  );
};

const DetailInput: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-medium text-[#7A7A7A]">{label}</p>
      <Input
        value={value}
        readOnly
        className="h-12 rounded-xl border-[#D5D5D5] bg-white text-[17px] text-[#303030]"
      />
    </div>
  );
};

const DetailText: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2 pt-0.5">
      <p className="text-xl font-medium text-[#7A7A7A]">{label}</p>
      <p className="pt-2 text-[19px] text-[#303030]">{value}</p>
    </div>
  );
};
