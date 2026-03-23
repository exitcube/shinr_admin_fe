"use client";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormValues, serviceSchema } from "@/validations/service";
import { SingleServiceResponse } from "@/types/service";
import { useCreateServiceMutation, useEditServiceMutation } from "@/hooks/useServiceQuery";
import { buildServiceFormData } from "./buildServiceFormData";
import { X } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import RichTextEditorControlled from "../common/RichTextEditor/RichTextEditorControlled";
import Image from "next/image";

export const ServiceForm: React.FC<IProps> = ({
  close,
  serviceId,
  serviceData,
  showActions = true,
}) => {
  const isEditMode = Boolean(serviceId);
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema(isEditMode)),
    defaultValues: {
      name: serviceData?.name || "",
      displayName: serviceData?.displayName || "",
      description: serviceData?.description || "",
      displaySequence: String(serviceData?.displaySequence || 0),
      serviceImg: undefined,
    },
  });

  const serviceImage = useWatch({
    control: form.control,
    name: "serviceImg",
  });
  const hasServiceImage = Boolean(serviceImage || serviceData?.imageId);

  const { mutate: createService, isPending: isCreating } = useCreateServiceMutation();
  const { mutate: editService, isPending: isEditing } = useEditServiceMutation();

  const onSubmit = async (data: ServiceFormValues) => {
    const formData = buildServiceFormData(data);

    if (serviceId) {
      formData.append("serviceId", serviceId.toString());

      editService(formData, {
        onSuccess: () => {
          form.reset();
          close();
          toast.success("Service updated successfully");
        },
        onError: (error) => {
          toast.error(`Service update failed: ${error.message}`);
        },
      });

      return;
    }
    createService(formData, {
      onSuccess: () => {
        form.reset();
        close();
        toast.success("Service created successfully");
      },
      onError: (error) => {
        toast.error(`Service creation failed: ${error.message}`);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-10">
          {hasServiceImage ? (
            <div
              className="relative overflow-hidden"
              style={{
                width: "350px",
                height: "296px",
                borderRadius: "20.59px",
                opacity: 1,
              }}
            >
              <Image
                src={
                  serviceImage
                    ? URL.createObjectURL(serviceImage)
                    : (serviceData?.imageId as string)
                }
                alt="Service preview"
                fill
                className="object-cover"
                unoptimized
              />

              <button
                type="button"
                onClick={() => form.setValue("serviceImg", undefined as unknown as File)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X size={16} className="text-gray-700" />
              </button>
            </div>
          ) : (
            <ImageUploader
              setValue={form.setValue}
              error={form.formState.errors.serviceImg?.message as string | undefined}
            />
          )}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-10 pb-8">
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
                name="displayName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">DisplayName</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                        placeholder="Enter Your display name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <RichTextEditorControlled
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Description"
                    maxLength={25}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

               <FormField
                control={form.control}
                name="displaySequence"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-medium text-sm">DisplaySequence</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                        placeholder="Enter the display sequence"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                type="button"
                onClick={close}
                className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer "
              >
                Cancel
              </Button>
              <PrimaryButton
                type="submit"
                className="bg-primary text-white py-2 rounded-md w-36!"
                title={isEditMode ? "Save" : "Create"}
                isLoading={isEditMode ? isEditing : isCreating}
                disabled={isEditMode ? isEditing : isCreating}
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};
interface IProps {
  close: () => void;
  serviceId?: number;
  serviceData?: SingleServiceResponse["data"];
  showActions?: boolean;
}
