import {
  OrganisationApprovalStep,
  OrganisationDetail,
  OrganisationListItem,
  OrganisationVendorItem,
} from "@/types/organisation";

export const organisationListData: OrganisationListItem[] = [
  {
    id: 1,
    organisationCode: "VENSHIRA101",
    name: "Rakesh",
    email: "rakesh@shinr.com",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "7998564321",
    accountStatus: "Pending",
    status: "Inactive",
  },
  {
    id: 2,
    organisationCode: "VENSHIRA101",
    name: "Rakesh",
    email: "rakesh@shinr.com",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "7998564321",
    accountStatus: "Active",
    status: "Active",
  },
  {
    id: 3,
    organisationCode: "VENSHIRA102",
    name: "Pranav",
    email: "arjun.k@shinr.com",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "9856843276",
    accountStatus: "Active",
    status: "Active",
  },
  {
    id: 4,
    organisationCode: "VENSHIRA103",
    name: "Ashwin",
    email: "ashwin@shinr.com",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "9856556477",
    accountStatus: "Pending",
    status: "Inactive",
  },
  {
    id: 5,
    organisationCode: "VENSHIRA104",
    name: "Hari",
    email: "hari@shinr.com",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "7845673421",
    accountStatus: "Blocked",
    status: "Inactive",
  },
  {
    id: 6,
    organisationCode: "VENSHIRA105",
    name: "Gokul",
    email: "gokul@shinr.com",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "8457556477",
    accountStatus: "Pending",
    status: "Inactive",
  },
];

const organisationVendors: OrganisationVendorItem[] = [
  {
    id: 1,
    vendorCode: "VEND101",
    name: "Auto Care",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "7998564321",
    accountStatus: "Pending",
    status: "Inactive",
  },
  {
    id: 2,
    vendorCode: "VEND101",
    name: "Car care",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "7998564321",
    accountStatus: "Active",
    status: "Active",
  },
  {
    id: 3,
    vendorCode: "VEND102",
    name: "5k Car wash",
    joiningDate: "04 Aug, 2025",
    mobileNumber: "9856843276",
    accountStatus: "Active",
    status: "Active",
  },
];

const approvalSteps: OrganisationApprovalStep[] = [
  {
    id: 1,
    title: "Account Created",
    description: "The business has been submitted and is waiting for approval.",
    state: "completed",
  },
  {
    id: 2,
    title: "Under Verification",
    description: "Documents and details are being reviewed.",
    attachmentLabel: "Digilocker",
    state: "completed",
  },
  {
    id: 3,
    title: "Approval",
    description: "Pending Business Approval",
    state: "pending",
  },
];

export const organisationDetailsMap: Record<string, OrganisationDetail> = {
  "1": {
    id: 1,
    organisationCode: "VENSHIRA101",
    name: "Rakesh",
    email: "Arjun.K@Shinr.Com",
    phoneNumber: "9876543210",
    registeredOn: "12 Aug 2025",
    reviewStatusLabel: "Under Verification",
    reviewStatusTone: "warning",
    currentWorkflowStatus: "UNDER_VERIFICATION",
    approvalSteps,
    vendors: organisationVendors,
  },
  "2": {
    id: 2,
    organisationCode: "VENSHIRA101",
    name: "Rakesh",
    email: "rakesh@shinr.com",
    phoneNumber: "7998564321",
    registeredOn: "12 Aug 2025",
    reviewStatusLabel: "Approved",
    reviewStatusTone: "success",
    currentWorkflowStatus: "APPROVAL",
    approvalSteps: approvalSteps.map((step) => ({
      ...step,
      state: "completed",
    })),
    vendors: organisationVendors,
  },
};

export const getOrganisationDetail = (id: string) => {
  return (
    organisationDetailsMap[id] ?? {
      id: Number(id),
      organisationCode: `ORG${id}`,
      name: "Organisation",
      email: "organisation@shinr.com",
      phoneNumber: "9999999999",
      registeredOn: "12 Aug 2025",
      reviewStatusLabel: "Under Verification",
      reviewStatusTone: "warning",
      currentWorkflowStatus: "UNDER_VERIFICATION",
      approvalSteps,
      vendors: organisationVendors,
    }
  );
};
