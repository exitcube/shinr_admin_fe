"use client";
import React, { useEffect, useMemo } from "react";
import { useForm, useController } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { PrimaryButton } from "../common/PrimaryButton";
import { Input } from "../ui/input";
import { FormCombobox } from "../common/FormCombobox";
import {
  AdminUserFormValues,
  CreateAdminUserBody,
  editAdminUserBody,
  SingleAdminUserResponse,
} from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminuserSchema } from "@/validations/user";
import { FormDatePicker } from "../common/FormDatePicker";
import {
  useCreateAdminUserMutation,
  useEditAdminUserMutation,
  useUserRolesListQuery,
} from "@/hooks/useUserQuery";
import { MultiSelect } from "../common/MultiSelect";
import { format } from "date-fns";

export const AdminUserForm: React.FC<IProps> = ({
  adminId,
  data,
  showActions = true,
}) => {
  const isEditMode = Boolean(adminId);
  const form = useForm<AdminUserFormValues>({
    resolver: zodResolver(adminuserSchema(isEditMode)),
    defaultValues: {
      name: data?.userName || "",
      email: data?.email || "",
      role: data?.role || "",
      joiningDate: data?.joiningDate ? new Date(data.joiningDate) : new Date(),
      pageAccess: [],
    },
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      name: data.userName ?? "",
      email: data.email ?? "",
      role: data.role ?? "",
      joiningDate: data?.joiningDate ? new Date(data.joiningDate) : new Date(),
      pageAccess: [],
    });
  }, [data, form]);

  const { data: userRoles } = useUserRolesListQuery();

  const { mutate: createAdminUser, isPending: isCreatingAdminUser } =
    useCreateAdminUserMutation();
  const { mutate: editAdminUser, isPending: isEditingAdminUser } =
    useEditAdminUserMutation();

  const userRolesOptions = useMemo(() => {
    return (
      userRoles?.data?.map((option) => ({
        label: option.displayName,
        value: option.value.toString(),
      })) ?? []
    );
  }, [userRoles?.data]);

  const onSubmit = (data: AdminUserFormValues) => {
    if (adminId) {
      const payload: editAdminUserBody = {
        userName: data.name,
        email: data.email,
        newRole: data.role,
        joiningDate: data.joiningDate
          ? format(data.joiningDate, "yyyy-MM-dd")
          : undefined,
      };
      editAdminUser({
        adminId: adminId.toString(),
        body: payload,
      });
      return;
    }
    const payload: CreateAdminUserBody = {
      userName: data.name,
      email: data.email,
      newRole: data.role,
      joiningDate: data.joiningDate
        ? format(data.joiningDate, "yyyy-MM-dd")
        : undefined,
    };

    createAdminUser(payload);
  };

  const { field: pageAccessField } = useController({
    name: "pageAccess",
    control: form.control,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col h-full"
      >
        {data?.empCode && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-900">
              <span>Employee Code:</span>
              <span className="font-medium text-gray-900">{data?.empCode}</span>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-10  pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
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
                        className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                        placeholder="Enter Your Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                        placeholder="Enter Your Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Role</FormLabel>

                <FormCombobox
                  name="role"
                  control={form.control}
                  options={userRolesOptions}
                  placeholder="Select Role"
                  searchPlaceholder="Search Role..."
                />

                <FormMessage />
              </FormItem>
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Page Access</FormLabel>

                <FormControl>
                  <MultiSelect
                    options={PAGE_ACCESS_OPTIONS}
                    selectedValues={pageAccessField.value ?? []}
                    onChange={pageAccessField.onChange}
                    placeholder="Select Page Access"
                    searchPlaceholder="Search pages..."
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              <FormField
                control={form.control}
                name="joiningDate"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                      Joining Date
                    </FormLabel>
                    <FormControl>
                      <FormDatePicker
                        control={form.control}
                        name="joiningDate"
                        placeholder="Select joining date"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer "
            >
              Cancel
            </Button>
            <PrimaryButton
              type="submit"
              className="bg-primary text-white py-2 rounded-md w-36!"
              title={isEditMode ? "Update" : "Create"}
              isLoading={isEditMode ? isEditingAdminUser : isCreatingAdminUser}
              disabled={isEditMode ? isEditingAdminUser : isCreatingAdminUser}
            />
          </div>
        )}
      </form>
    </Form>
  );
};
interface IProps {
  onCancel: () => void;
  adminId?: number;
  data?: SingleAdminUserResponse["data"];
  showActions?: boolean;
}

const PAGE_ACCESS_OPTIONS = [
  { label: "Dashboard", value: "pageDashboard" },
  { label: "Banner", value: "pageBanner" },
  { label: "Rewards", value: "pageRewards" },
  { label: "Bookings", value: "pageBookings" },
  { label: "User", value: "pageUser" },
  { label: "Customer", value: "pageCustomer" },
];
