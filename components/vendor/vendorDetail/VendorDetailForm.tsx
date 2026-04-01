"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UpdateVendorStatusSheet } from "@/components/vendor/vendorDetail/UpdateVendorStatusSheet";
import bannerImage from "@/public/assets/illustrator/banner-image.png";
import {
  ArrowRight,
  EyeOff,
  FileText,
  MapPin,
  Plus,
  ShieldMinus,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type TimelineItem = {
  title: string;
  description: string;
  state: "completed" | "current" | "upcoming";
  attachmentLabel?: string;
};

type WorkHour = {
  day: string;
  slots: Array<{ from: string; to: string }>;
};

type ServiceRow = {
  id: number;
  name: string;
  addedDate: string;
  verificationStatus: "Pending" | "Active";
};

const vendorDetails = {
  code: "VENSHIRA101",
  statusLabel: "Under Verification",
  name: "Auto Care Care",
  phoneNumber: "9876543210",
  organisation: "Rakesh",
  registeredOn: "12 Aug 2025",
  address: "24, Lake View Street",
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  pinCode: "600040",
  yearsInBusiness: "4",
  description:
    "Professional car wash and detailing service offering exterior wash, interior cleaning, polishing, and ceramic protection to keep your vehicle looking brand new.",
  additionalInformation: "No Additional info",
  gstNumber: "29ABCDE1234F1Z5",
  licenseName: "Autocarcare License PDF",
  locationTitle: "Square Apartments",
  locationSubtitle: "1/342, 16th Main",
};

const approvalTimeline: TimelineItem[] = [
  {
    title: "Account Created",
    description:
      "Your account has been successfully created. You can now begin the verification process.",
    state: "completed",
  },
  {
    title: "Corporate License Verification",
    description:
      "Your submitted business license is under review. This helps us confirm your business authenticity.",
    state: "current",
    attachmentLabel: "PDF",
  },
  {
    title: "Location Verification",
    description:
      "We are verifying your shop location to ensure accurate business details.",
    state: "upcoming",
  },
  {
    title: "Shop Image Verification",
    description:
      "Your uploaded shop images are being reviewed to confirm your business presence.",
    state: "upcoming",
  },
  {
    title: "Verification completed",
    description: "Pending Business Approval",
    state: "upcoming",
  },
];

const businessImages = [
  { id: 1, title: "Shop View" },
  { id: 2, title: "Service Area" },
  { id: 3, title: "Detail Bay" },
  { id: 4, title: "Workshop" },
];

const galleryImages = [
  { id: 1, title: "Repair Tools" },
  { id: 2, title: "Mechanic Floor" },
  { id: 3, title: "Garage Lift" },
];

const workingHour: WorkHour = {
  day: "Monday - Sunday",
  slots: [
    { from: "07:00 am", to: "02:00 pm" },
    { from: "03:00 pm", to: "07:00 pm" },
  ],
};

const services: ServiceRow[] = [
  { id: 1, name: "Wash", addedDate: "04 Aug, 2025", verificationStatus: "Pending" },
  { id: 2, name: "Car Detailing", addedDate: "04 Aug, 2025", verificationStatus: "Active" },
];

export const VendorDetailForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);

  return (
    <>
      <div className="font-poppins flex flex-col gap-8 pb-4">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <p className="text-base font-medium text-[#252525]">
              {id ? `VENSHIRA${id}` : vendorDetails.code}
            </p>
            <span className="inline-flex w-fit rounded-md bg-[#F5AE38] px-3 py-1.5 text-xs font-medium text-white">
              {vendorDetails.statusLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ReadOnlyField label="Name" value={vendorDetails.name} />
            <ReadOnlyField label="Phone number" value={vendorDetails.phoneNumber} />
            <ReadOnlyField label="Organisation" value={vendorDetails.organisation} />
            <ReadOnlyField label="Registered On" value={vendorDetails.registeredOn} />
          </div>
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <SectionTitle title="Approval status" />
            <Button
              type="button"
              variant="outline"
              className="h-10 w-fit rounded-lg border-[#D6D6D6] px-4 text-sm text-[#202020]"
              onClick={() => setIsUpdateStatusOpen(true)}
            >
              Update Status
            </Button>
          </div>

          <div className="space-y-5">
            {approvalTimeline.map((item, index) => (
              <TimelineRow
                key={item.title}
                item={item}
                isLast={index === approvalTimeline.length - 1}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionTitle title="License & Location" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <Label text="Attach Corporate license" />
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-[#E8E8E8] bg-white p-5 text-center">
                <div className="mb-4 flex size-20 items-center justify-center rounded-[22px] bg-[#F32828] text-white shadow-sm">
                  <FileText className="size-9" />
                </div>
                <p className="text-xl font-semibold tracking-[0.12em] text-[#BE2020]">
                  PDF
                </p>
                <p className="mt-2 text-base font-medium text-[#202020]">
                  {vendorDetails.licenseName}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label text="Set Location" />
              <div className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white">
                <div className="relative h-[160px] bg-[linear-gradient(135deg,#E4E4E4_0%,#F7F7F7_35%,#DFDFDF_35%,#DFDFDF_55%,#F7F7F7_55%,#F7F7F7_100%)]">
                  <div className="absolute left-[62%] top-[32%]">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[#EA3B34] text-white shadow-md">
                      <MapPin className="size-3.5 fill-current" />
                    </div>
                    <div className="mx-auto h-7 w-[2px] bg-[#6C6F96]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.75))]" />
                </div>
                <div className="p-3.5">
                  <p className="text-base font-medium text-[#202020]">
                    {vendorDetails.locationTitle}
                  </p>
                  <p className="mt-1 text-xs text-[#8B8B8B]">
                    {vendorDetails.locationSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ReadOnlyField label="Address" value={vendorDetails.address} />
            <ReadOnlyField label="City" value={vendorDetails.city} />
            <ReadOnlyField label="State" value={vendorDetails.state} />
            <ReadOnlyField label="Country" value={vendorDetails.country} />
            <ReadOnlyField label="PIN Code" value={vendorDetails.pinCode} />
            <ReadOnlyField label="Years In business" value={vendorDetails.yearsInBusiness} />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ReadOnlyTextBlock label="Description" value={vendorDetails.description} />
            <ReadOnlyTextBlock
              label="Additional information (Optional)"
              value={vendorDetails.additionalInformation}
            />
          </div>

          <div className="max-w-[calc(50%-0.75rem)] max-md:max-w-full">
            <ReadOnlyField label="GST Number" value={vendorDetails.gstNumber} />
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionTitle title="Business Images" />

          <div className="space-y-4">
            <div>
              <p className="text-base font-medium text-[#202020]">
                Shop Verification Images
              </p>
              <p className="mt-1 text-xs text-[#8B8B8B]">
                Uploaded 5 photos of your shop for verification.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {businessImages.map((image) => (
                <PhotoCard key={image.id} title={image.title} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
            <div className="space-y-4">
              <div>
                <p className="text-base font-medium text-[#202020]">Cover Photo</p>
                <p className="mt-1 text-xs text-[#8B8B8B]">
                  This image will appear on your shop listing
                </p>
              </div>
              <PhotoCard title="By My Car" cover />
              <p className="text-xs text-[#8B8B8B]">1/1</p>
            </div>

            <div className="space-y-4 justify-self-end">
              <div>
                <p className="text-base font-medium text-[#202020]">Shop Gallery</p>
                <p className="mt-1 text-xs text-[#8B8B8B]">
                  Add photos of your shop or work area
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {galleryImages.map((image) => (
                  <PhotoCard key={image.id} title={image.title} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <SectionTitle title="Working Hours" />
          <div className="max-w-[340px]">
            <WorkHourCard workHour={workingHour} />
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SectionTitle title="Service" />
            <Button className="h-10 rounded-lg bg-primary px-4 text-sm text-white hover:bg-primary/90">
              <Plus className="size-4" />
              Add Service
            </Button>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#E8E8E8] bg-white p-3">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#F4F4F4]">
                    <th className="w-14 rounded-l-2xl px-4 py-3 text-left">
                      <Checkbox />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#202020]">
                      Service name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#202020]">
                      Service added Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#202020]">
                      Verification Status
                    </th>
                    <th className="rounded-r-2xl px-4 py-3 text-left text-sm font-medium text-[#202020]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b border-[#ECECEC]">
                      <td className="border-b border-[#ECECEC] px-4 py-3">
                        <Checkbox />
                      </td>
                      <td className="border-b border-[#ECECEC] px-4 py-3 text-sm text-[#202020]">
                        {service.name}
                      </td>
                      <td className="border-b border-[#ECECEC] px-4 py-3 text-sm text-[#202020]">
                        {service.addedDate}
                      </td>
                      <td className="border-b border-[#ECECEC] px-4 py-3">
                        <span
                          className={`inline-flex rounded-md px-4 py-1.5 text-sm font-medium ${
                            service.verificationStatus === "Active"
                              ? "bg-[#E9FBF0] text-[#22C05D]"
                              : "bg-[#F2F2F7] text-[#8E8E93]"
                          }`}
                        >
                          {service.verificationStatus}
                        </span>
                      </td>
                      <td className="border-b border-[#ECECEC] px-4 py-3">
                        <div className="flex gap-3">
                          <ActionButton
                            label="Hide"
                            className="border-[#E4E4E4] bg-white text-[#202020]"
                            icon={<EyeOff className="size-5" />}
                          />
                          <ActionButton
                            label="Block"
                            className="border-transparent bg-[#FFF2F2] text-[#FF3B30]"
                            icon={<ShieldMinus className="size-5" />}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <UpdateVendorStatusSheet
        open={isUpdateStatusOpen}
        onOpenChange={setIsUpdateStatusOpen}
      />
    </>
  );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className="text-[18px] font-medium text-primary">{title}</h2>;
};

const Label: React.FC<{ text: string }> = ({ text }) => {
  return <p className="text-sm font-medium text-[#8B8B8B]">{text}</p>;
};

const ReadOnlyField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="space-y-2">
      <Label text={label} />
      <div className="min-h-10 rounded-lg border border-[#C2C2C2] px-3 py-2.5 text-sm text-[#202020]">
        {value}
      </div>
    </div>
  );
};

const ReadOnlyTextBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="space-y-2">
      <Label text={label} />
      <div className="min-h-[78px] rounded-lg border border-[#C2C2C2] px-3 py-2.5 text-sm leading-6 text-[#202020]">
        {value}
      </div>
    </div>
  );
};

const TimelineRow: React.FC<{ item: TimelineItem; isLast: boolean }> = ({
  item,
  isLast,
}) => {
  const dotClassName =
    item.state === "completed" || item.state === "current"
      ? "bg-[#34C759]"
      : "bg-[#8E8E93]";
  const lineClassName =
    item.state === "completed" ? "bg-[#34C759]" : "bg-[radial-gradient(#8E8E93_1.5px,transparent_1.5px)] bg-[length:4px_8px]";

  return (
    <div className="flex gap-4">
      <div className="flex w-6 flex-col items-center pt-1">
        <span className={`size-3 rounded-full ${dotClassName}`} />
        {!isLast && <span className={`mt-1 min-h-12 w-[2px] flex-1 ${lineClassName}`} />}
      </div>
      <div className="pb-1">
        <p className="text-base font-semibold text-[#171717]">{item.title}</p>
        <p className="mt-1 max-w-4xl text-sm leading-6 text-[#8B8B8B]">
          {item.description}
        </p>
        {item.attachmentLabel && (
          <div className="mt-2 flex items-center gap-2 text-sm text-[#8B8B8B]">
            <span>Attached:</span>
            <span className="inline-flex items-center rounded-md bg-[#EE2A24] px-2 py-1 text-xs font-semibold text-white">
              {item.attachmentLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{ title: string; cover?: boolean }> = ({
  title,
  cover = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden border border-[#E8E8E8] ${
        cover
          ? "h-[184px] w-[184px] rounded-[14.72px]"
          : "h-[184px] w-[184px] rounded-[14.72px]"
      }`}
    >
      <Image src={bannerImage} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 flex items-end bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45))] p-2.5">
        <p className="text-xs font-medium text-white">{title}</p>
      </div>
    </div>
  );
};

const WorkHourCard: React.FC<{ workHour: WorkHour }> = ({ workHour }) => {
  return (
    <div className="rounded-[18px] border border-[#E8E8E8] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <p className="text-base font-medium text-[#202020]">{workHour.day}</p>

      <div className="mt-4 space-y-4">
        {workHour.slots.map((slot, index) => (
          <div key={`${workHour.day}-${index}`} className="space-y-3">
            <div className="grid grid-cols-[16px_1fr_auto] items-center gap-3">
              <span className="size-2.5 rounded-full bg-[#171717]" />
              <span className="text-sm text-[#8B8B8B]">From</span>
              <span className="text-sm font-medium text-[#202020]">{slot.from}</span>
            </div>
            <div className="grid grid-cols-[16px_1fr_auto] items-center gap-3">
              <div className="flex h-6 items-center justify-center">
                <span className="h-full border-l-2 border-dotted border-[#8B8B8B]" />
              </div>
              <div className="h-px bg-[#ECECEC]" />
              <div />
            </div>
            <div className="grid grid-cols-[16px_1fr_auto] items-center gap-3">
              <span className="size-2.5 rounded-full border border-[#171717] bg-white" />
              <span className="text-sm text-[#8B8B8B]">To</span>
              <span className="text-sm font-medium text-[#202020]">{slot.to}</span>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-5 h-10 w-full rounded-full bg-primary px-4 text-sm text-white hover:bg-primary/90">
        <span className="mr-auto">Edit Time</span>
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
};

const ActionButton: React.FC<{
  label: string;
  className: string;
  icon: React.ReactNode;
}> = ({ label, className, icon }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${className}`}
    >
      {icon}
      {label}
    </button>
  );
};
