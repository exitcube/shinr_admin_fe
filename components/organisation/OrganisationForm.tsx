"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, UserRound } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { organisationSchema } from "@/validations/organisation";
import { CreateOrganisationInput, OrganisationFormValues } from "@/types/organisation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PrimaryButton } from "../common/PrimaryButton";

interface OrganisationFormProps {
  onCancel: () => void;
  onCreate: (organisation: CreateOrganisationInput) => void;
}

export const OrganisationForm: React.FC<OrganisationFormProps> = ({
  onCancel,
  onCreate,
}) => {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const form = useForm<OrganisationFormValues>({
    resolver: zodResolver(organisationSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      profileImage: undefined,
    },
  });

  const watchedName = useWatch({
    control: form.control,
    name: "name",
  });

  const initials = useMemo(() => {
    if (!watchedName?.trim()) return "";

    return watchedName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [watchedName]);

  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  const handleProfileChange = (file?: File) => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }

    if (!file) {
      setProfilePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setProfilePreview(objectUrl);
  };

  const onSubmit = (values: OrganisationFormValues) => {
    onCreate({
      name: values.name,
      email: values.email,
      mobileNumber: values.mobileNumber,
      profileImageUrl: profilePreview ?? undefined,
    });

    form.reset();
    setProfilePreview(null);
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex h-full flex-col pt-6"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-8 pb-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#E8E8E8]">
                  {profilePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : initials ? (
                    <span className="text-3xl font-semibold text-[#5A5A5A]">
                      {initials}
                    </span>
                  ) : (
                    <UserRound className="h-14 w-14 text-[#B7B7B7]" strokeWidth={1.5} />
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => {
                    const { onChange, value, ...fileField } = field;
                    void value;

                    return (
                      <FormItem>
                        <FormControl>
                          <label className="absolute bottom-1 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-sm">
                            <Camera className="h-4 w-4" />
                            <Input
                              {...fileField}
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                onChange(file);
                                handleProfileChange(file);
                              }}
                            />
                          </label>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Name"
                        className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center overflow-hidden rounded-lg border border-[#C2C2C2] bg-white">
                        <span className="border-r border-[#E2E2E2] px-3 text-sm text-[#303030]">
                          +91
                        </span>
                        <Input
                          {...field}
                          type="tel"
                          inputMode="numeric"
                          placeholder="Enter Phone Number"
                          className="border-0 shadow-none focus-visible:ring-0!"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter Email"
                        className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-[#F1F1F1] pt-6">
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
            className="bg-primary text-white py-2 rounded-md w-36!"
            title="Save"
          />
        </div>
      </form>
    </Form>
  );
};
