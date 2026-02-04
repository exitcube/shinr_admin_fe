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
import { useBrandListing, useCreateVehicleMutation, useEditVehicleModelMutation, useTypeListing } from "@/hooks/useVehicleQuery";
import { CreateVehicleBody, editVehicleBody } from "@/types/vehicle";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ vehicleId, vehicleData, onCancel }) => {
  const form = useForm({
    defaultValues: {
    model: "",
    vehicle_brand: "",
    vehicle_type: "",
  },
  });

  const isEditMode = Boolean(vehicleId);

  const { mutate: createVehicleMutation, isPending: isCreateVehicleMutationLoading } = useCreateVehicleMutation();
  const { mutate: editVehicleMutation, isPending: isEditVehicleLoading } = useEditVehicleModelMutation();
  const { search } = useParams<{ search: string }>()

  const { data: brandListing, isLoading: isBrandListingLoading } = useBrandListing(search);

  const { data: typeListing, isLoading: isTypeListingLoading } = useTypeListing();

  const onSubmit = (data: any) => {
    const payload: CreateVehicleBody = {
      model: data.model,
      makeId: data.vehicle_brand,
      categoryId: data.vehicle_type,
    };
    if (isEditMode && vehicleId) {
      const payLoadEdit: editVehicleBody = {
        model: data.model,
        makeId: data.vehicle_brand,
        categoryId: data.vehicle_type,
      }
      editVehicleMutation(
        { id: vehicleId.toString(), payload: payLoadEdit },
        {
          onSuccess: () => {
            toast.success("Vehicle updated successfully");
            onCancel();
          },
          onError: (error) => {
            toast.error(`Vehicle update failed: ${error.message}`);
          },
        }
      );
      return;
    }
    createVehicleMutation(payload, {
      onSuccess: () => {
        form.reset()
        toast.success("Vehicle created successfully")
      },
      onError: (error) => {
        toast.error(`Vehicle creation failed: ${error.message}`);
      },
    });
  };
  const vehicleBrandOptions = useMemo(() => {
    return (
      brandListing?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? []
    );
  }, [brandListing?.data]);

  const vehicleTypeOptions = useMemo(() => {
    return (
      typeListing?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? []
    );
  }, [typeListing?.data]);
  useEffect(() => {
    if (!vehicleData || !brandListing || !typeListing) return;

    const brand = brandListing.data.find(
      (b: any) => b.name === vehicleData.make
    );

    const type = typeListing.data.find(
      (t: any) => t.name === vehicleData.category
    );

    form.reset({
      model: vehicleData.model,
      vehicle_brand: brand?.id?.toString() ?? "",
      vehicle_type: type?.id?.toString() ?? "",
    });
  }, [vehicleData, brandListing, typeListing]);

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
              name="model"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">Model</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Brand</label>
              <FormCombobox
                name="vehicle_brand"
                control={form.control}
                options={vehicleBrandOptions}
                placeholder="Search Vehicle Brand"
                searchPlaceholder="Search Vehicle Brand"
              />
              <FormMessage />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Vehicle type</label>
              <FormCombobox
                name="vehicle_type"
                control={form.control}
                options={vehicleTypeOptions}
                placeholder="Search Vehicle Type"
                searchPlaceholder="Search Vehicle Type"
              />
              <FormMessage />
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

interface AddVehicleFormProps {
  vehicleId?: number;
  vehicleData?: any;
  onCancel: () => void;
}