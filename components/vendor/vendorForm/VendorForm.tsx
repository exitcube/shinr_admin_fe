"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { MapPin, Plus, Search, Upload } from "lucide-react";

type VendorFormValues = {
  organisation: string;
  name: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  serviceCategory: string;
  yearsInBusiness: string;
  gstNumber: string;
  description: string;
  additionalInfo: string;
};

const initialValues: VendorFormValues = {
  organisation: "",
  name: "",
  mobileNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pinCode: "",
  serviceCategory: "",
  yearsInBusiness: "",
  gstNumber: "",
  description: "",
  additionalInfo: "",
};

interface IProps {
  onCancel: () => void;
}

export const VendorForm: React.FC<IProps> = ({ onCancel }) => {
  const [values, setValues] = useState<VendorFormValues>(initialValues);

  const descriptionCount = useMemo(() => values.description.length, [values.description]);
  const additionalInfoCount = useMemo(
    () => values.additionalInfo.length,
    [values.additionalInfo],
  );

  const handleChange = (field: keyof VendorFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCancel();
  };

  const inputClassName =
    "h-11 w-full rounded-lg border border-[#C2C2C2] px-3 text-sm focus:border-[#807d7d]! focus:ring-0!";
  const textareaClassName =
    "min-h-[95px] w-full rounded-lg border border-[#C2C2C2] px-3 py-3 text-sm outline-none placeholder:text-[#7F7F7F] focus:border-[#807d7d]!";
  const searchIconClassName =
    "absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#7F7F7F]";

  return (
    <form
      onSubmit={handleSubmit}
      className="font-poppins flex min-h-full flex-col justify-between gap-6"
    >
      <div className="space-y-6">
        <div className="max-w-full space-y-2 md:max-w-[calc(50%-0.75rem)]">
          <p className="text-sm font-medium">Select Organisation</p>
          <div className="relative">
            <Input
              value={values.organisation}
              onChange={(e) => handleChange("organisation", e.target.value)}
              placeholder="Search Organisation"
              className={`${inputClassName} pr-10`}
            />
            <Search className={searchIconClassName} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Name">
            <Input
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Name"
              className={inputClassName}
            />
          </Field>

          <Field label="Mobile Number">
            <div className="flex h-11 items-center rounded-lg border border-[#C2C2C2] px-3 text-sm focus-within:border-[#807d7d]">
              <input
                value={values.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full text-sm outline-none placeholder:text-[#7F7F7F]"
              />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Attach Corporate license">
            <button
              type="button"
              className="flex h-[134px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#C2C2C2] text-primary"
            >
              <Upload className="size-4" />
              <span className="text-sm font-medium">Upload File here</span>
            </button>
            <p className="mt-2 text-xs text-[#7F7F7F]">File type: pdf</p>
          </Field>

          <Field label="Set Location">
            <div className="rounded-2xl border border-[#E0E0E0] p-3">
              <div className="relative h-[95px] rounded-xl bg-[linear-gradient(130deg,#E8E8E8,#D6D6D6)]">
                <MapPin className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-red-500" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className=" font-medium leading-6 text-sm">Square Apartments</p>
                  <p className="mt-2 text-sm text-[#7F7F7F]">1/342, 16th Main</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-7 w-[98px] rounded-[58px] border border-primary px-3 py-[9px] text-primary"
                >
                  Set Location
                </Button>
              </div>
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Address">
            <Input
              value={values.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter Address"
              className={inputClassName}
            />
          </Field>

          <Field label="City">
            <Input
              value={values.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter City"
              className={inputClassName}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="State">
            <Input
              value={values.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Enter State"
              className={inputClassName}
            />
          </Field>

          <Field label="Country">
            <Input
              value={values.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Enter Country"
              className={inputClassName}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="PIN Code">
            <Input
              value={values.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value)}
              placeholder="Enter PIN Code"
              className={inputClassName}
            />
          </Field>

          <Field label="Service category">
            <div className="relative">
              <Input
                value={values.serviceCategory}
                onChange={(e) => handleChange("serviceCategory", e.target.value)}
                placeholder="Search Service Category"
                className={`${inputClassName} pr-10`}
              />
              <Search className={searchIconClassName} />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Years In business">
            <Input
              value={values.yearsInBusiness}
              onChange={(e) => handleChange("yearsInBusiness", e.target.value)}
              placeholder="Enter Years In business"
              className={inputClassName}
            />
          </Field>

          <Field label="GST Number (Optional)">
            <Input
              value={values.gstNumber}
              onChange={(e) => handleChange("gstNumber", e.target.value)}
              placeholder="Enter GST Number"
              className={inputClassName}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Description">
            <textarea
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value.slice(0, 200))}
              placeholder="Enter Description"
              className={textareaClassName}
            />
            <p className="mt-1 text-right text-xs text-[#7F7F7F]">{descriptionCount}/200</p>
          </Field>

          <Field label="Additional information (Optional)">
            <textarea
              value={values.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value.slice(0, 200))}
              placeholder="Enter Additional info"
              className={textareaClassName}
            />
            <p className="mt-1 text-right text-xs text-[#7F7F7F]">{additionalInfoCount}/200</p>
          </Field>
        </div>

        <div className="rounded-2xl border border-[#E8E8E8] p-4">
          <p className="text-lg font-semibold">Business Images</p>

          <div className="mt-3">
            <div>
              <p className="text-sm font-medium">Shop Verification Images</p>
              <p className="mt-1 text-xs text-[#0B0D0E]">Upload 5 photos of your shop for verification.</p>
              <UploadSquare />
              <p className="mt-2 text-xs text-[#7F7F7F]">0/5</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Display Photo</p>
                <p className="mt-1 text-xs text-[#0B0D0E]">This image will appear on your shop listing</p>
                <UploadSquare />
                <p className="mt-2 text-xs text-[#7F7F7F]">0/1</p>
              </div>

              <div>
                <p className="text-sm font-medium">Shop Gallery</p>
                <p className="mt-1 text-xs text-[#0B0D0E]">Add photos of your shop or work area</p>
                <UploadSquare />
                <p className="mt-2 text-xs text-[#7F7F7F]">0/3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pb-1">
        <Button
          type="button"
          variant="outline"
          className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <PrimaryButton
          type="submit"
          title="Save"
          className="bg-primary text-white py-2 rounded-md w-36!"
        />
      </div>
    </form>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      {children}
    </div>
  );
};

const UploadSquare: React.FC = () => {
  return (
    <button
      type="button"
      className="mt-3 flex size-14 items-center justify-center rounded-xl border border-[#BDBDBD] text-[#BDBDBD]"
    >
      <Plus className="size-7" />
    </button>
  );
};
