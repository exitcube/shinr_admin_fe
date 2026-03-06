"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { CustomerFormValues, SingleCustomerResponse } from "@/types/customer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormDatePicker } from "../common/DatePicker";

interface IProps {
  onCancel?: () => void;
  data?: SingleCustomerResponse["data"];
}

export const CustomerForm: React.FC<IProps> = ({ data }) => {
  const form = useForm<CustomerFormValues>({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      registeredOn: new Date(),
      lastActive: new Date(),
      isBlocked: false,
    },
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      name: data.name ?? "",
      email: data.email ?? "",
      mobile: data.mobile ?? "",
      registeredOn: data.registeredOn ? new Date(data.registeredOn) : new Date(),
      lastActive: data.lastActive ? new Date(data.lastActive) : new Date(),
      isBlocked: false,
    });
  }, [data, form]);

  return (
    <Form {...form}>
      <form className="font-poppins flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-8 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">Name</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full" />
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
                      <Input {...field} readOnly className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registeredOn"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">
                      Registered On
                    </FormLabel>
                    <FormControl>
                      <FormDatePicker
                        {...field}
                        control={form.control}
                        name="registeredOn"
                        placeholder="Select registered date"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              <FormField
                control={form.control}
                name="lastActive"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">Last Active</FormLabel>
                    <FormControl>
                      <FormDatePicker
                        {...field}
                        control={form.control}
                        name="lastActive"
                        placeholder="Select last active date"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
