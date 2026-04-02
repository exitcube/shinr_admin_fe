export type OrganisationAccountStatus = "Pending" | "Active" | "Blocked";

export type OrganisationStatus = "Active" | "Inactive";

export type OrganisationReviewTone = "warning" | "success" | "neutral";

export type OrganisationApprovalState = "completed" | "current" | "pending";

export type OrganisationWorkflowStatus =
  | "ACCOUNT_CREATED"
  | "UNDER_VERIFICATION"
  | "APPROVAL";

export interface OrganisationListItem {
  id: number;
  organisationCode: string;
  name: string;
  email: string;
  joiningDate: string;
  mobileNumber: string;
  accountStatus: OrganisationAccountStatus;
  status: OrganisationStatus;
  profileImageUrl?: string;
}

export interface OrganisationFormValues {
  name: string;
  email: string;
  mobileNumber: string;
  profileImage?: File;
}

export interface CreateOrganisationInput {
  name: string;
  email: string;
  mobileNumber: string;
  profileImageUrl?: string;
}

export interface OrganisationApprovalStep {
  id: number;
  title: string;
  description: string;
  attachmentLabel?: string;
  state: OrganisationApprovalState;
}

export interface OrganisationVendorItem {
  id: number;
  vendorCode: string;
  name: string;
  joiningDate: string;
  mobileNumber: string;
  accountStatus: OrganisationAccountStatus;
  status: OrganisationStatus;
}

export interface OrganisationDetail {
  id: number;
  organisationCode: string;
  name: string;
  email: string;
  phoneNumber: string;
  registeredOn: string;
  profileImageUrl?: string;
  reviewStatusLabel: string;
  reviewStatusTone: OrganisationReviewTone;
  currentWorkflowStatus?: OrganisationWorkflowStatus;
  approvalSteps: OrganisationApprovalStep[];
  vendors: OrganisationVendorItem[];
}

export interface UpdateOrganisationStatusInput {
  status: OrganisationWorkflowStatus;
  note: string;
  action: "approve" | "reject";
}
