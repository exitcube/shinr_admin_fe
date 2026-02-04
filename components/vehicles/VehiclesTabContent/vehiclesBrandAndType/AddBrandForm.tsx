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
import { useAddVehicleBrandMutation, useEditVehicleBrandMutation, } from "@/hooks/useVehicleQuery";
import { CreateVehicleBrandBody, editBrandBody,  } from "@/types/vehicle";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddBrandForm: React.FC<IProps> = ({ brandData, brandId, onCancel }) => {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });


  const { mutate: addBrand, isPending: IsAddBrandPending } = useAddVehicleBrandMutation();
  const { mutate: editBrand, isPending: IsEditBrandPending } = useEditVehicleBrandMutation();

  const onSubmit = (data: any) => {
    const payload: CreateVehicleBrandBody = {
      name: data.name,
    };

    if (brandId) {
      const editPayload: editBrandBody = {
        vehicleTypeId: brandId,
        name: data.name,
      };
      editBrand({ payload: editPayload }, {
        onSuccess: () => {
          form.reset()
          toast.success("Vehicle Brand edited successfully")
        },
        onError: (error) => {
          toast.error(`Vehicle Brand editing failed: ${error.message}`);
        },
      });
      return;
    }
    addBrand(payload, {
      onSuccess: () => {
        form.reset()
        toast.success("Vehicle Brand created successfully")
      },
      onError: (error) => {
        toast.error(`Vehicle Brand creation failed: ${error.message}`);
      },
    });
  };
  useEffect(() => {
    if (!brandId || !brandData) return;

    form.reset({
      name: brandData.name,
    });
  }, [brandId, brandData]);


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
                  <FormLabel className="font-medium text-sm">Add Vehicle Brand</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter Brand name"
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
            title={brandId ? "Update" : "Create"}
          />
        </div>
      </form>
    </Form>
  );
};

interface IProps {
  brandId: number;
  brandData: any;
  onCancel: () => void;
}