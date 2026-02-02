/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormCombobox } from "@/components/common/FormCombobox";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddVehicleTypeMutation, } from "@/hooks/useVehicleQuery";
import { CreateVehicleTypeBody } from "@/types/vehicle";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddTypeForm: React.FC = () => {
  const form = useForm({});

   
  const {mutate:addType,isPending:IsAddTypePending}=useAddVehicleTypeMutation();

  const onSubmit = (data: any) => {
    const payload: CreateVehicleTypeBody = {
      name: data.name,
    };
    addType(payload, {
      onSuccess: () => {
        form.reset()
        toast.success("Vehicle Type created successfully")
      },
      onError: (error) => {
        toast.error(`Vehicle Type creation failed: ${error.message}`);
      },
    });
  };
 

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-10  pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">Add Vehicle Type</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter VehicleType name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            title="Create"
          />
        </div>
      </form>
    </Form>
  );
};
