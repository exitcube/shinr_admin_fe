"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { AdminUserFormValues, CreateAdminUserBody, editAdminUserBody, SingleAdminUserResponse } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminuserSchema } from "@/validations/user";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "../ui/popover";
import { FormDatePicker } from "../common/DatePicker";
import { useCreateAdminUserMutation, useEditAdminUserMutation, useUserRolesListQuery } from "@/hooks/useUserQuery";

export const AdminUserForm: React.FC<IProps> = ({ onCancel, adminId ,data}) => {
  const isEditMode=Boolean(adminId);
  const form = useForm<AdminUserFormValues>({
     resolver: zodResolver(adminuserSchema(isEditMode)),
    defaultValues: {
      name: data?.userName || "",
      email: data?.email || "",
      role: data?.role || "",
      joiningDate: data?.joiningDate ? new Date(data.joiningDate) : new Date(),
      pageDashboard: false,
      pageBanner: false,
      pageRewards: false,
      pageBookings: false,
      pageUser: false,
      pageCustomer: false,
    },
  });

  

  const { data: userRoles } = useUserRolesListQuery();

  const { mutate: createAdminUser } = useCreateAdminUserMutation();
  const { mutate: editAdminUser } = useEditAdminUserMutation();

  const userRolesOptions = useMemo(() => {
    return (
      userRoles?.data?.map((option) => ({
        label: option.displayName,
        value: option.value.toString(),
      })) ?? []
    );
  }, [userRoles?.data]);

  const onSubmit = (data: AdminUserFormValues) => {
    console.log(data);
    if (adminId) {
      const payload: editAdminUserBody = {
        userName: data.name,
        email: data.email,
        newRole: data.role,
        joiningDate: data.joiningDate,
      }
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
      joiningDate: data.joiningDate,
    }

    createAdminUser(payload);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col h-full"
      >
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full h-10 px-3 flex items-center justify-between border border-[#C2C2C2] rounded-lg text-sm bg-white"
                      >
                        {(() => {
                          const selected = PAGE_ACCESS_LIST.filter((item) =>
                            form.watch(item.name),
                          ).map((item) => item.label);

                          return selected.length > 0
                            ? selected.join(", ")
                            : "Select Page Access";
                        })()}

                        <span className="ml-2">▾</span>
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-56 p-3">
                      <div className="flex flex-col gap-3">
                        {PAGE_ACCESS_LIST.map((item) => (
                          <FormField
                            key={item.name}
                            control={form.control}
                            name={item.name as any}
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked === true)
                                  }
                                />
                                <span className="text-sm">{item.label}</span>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>

                <FormMessage />
              </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              <FormField
                control={form.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                      Joining Date
                    </FormLabel>
                    <FormControl>
                      <FormDatePicker
                        {...field}
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
          />
        </div>
      </form>
    </Form>
  );
};
interface IProps {
  onCancel: () => void;
  adminId?: number;
  data?: SingleAdminUserResponse["data"];
}

const PAGE_ACCESS_LIST: {
  label: string;
  name: keyof AdminUserFormValues;
}[] = [
    { label: "Dashboard", name: "pageDashboard" },
    { label: "Banner", name: "pageBanner" },
    { label: "Rewards", name: "pageRewards" },
    { label: "Bookings", name: "pageBookings" },
    { label: "User", name: "pageUser" },
    { label: "Customer", name: "pageCustomer" },
  ];
