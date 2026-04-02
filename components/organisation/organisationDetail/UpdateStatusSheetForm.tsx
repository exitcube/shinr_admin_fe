"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  OrganisationWorkflowStatus,
  UpdateOrganisationStatusInput,
} from "@/types/organisation";
import { z } from "zod";

const updateStatusSchema = z.object({
  status: z.enum(["ACCOUNT_CREATED", "UNDER_VERIFICATION", "APPROVAL"], {
    message: "Select a status",
  }),
  note: z.string().optional(),
});

type UpdateStatusFormValues = z.infer<typeof updateStatusSchema>;

interface UpdateStatusSheetProps {
  defaultStatus?: OrganisationWorkflowStatus;
  onClose: () => void;
  onSubmit: (payload: UpdateOrganisationStatusInput) => void;
}

const STATUS_OPTIONS: {
  value: OrganisationWorkflowStatus;
  title: string;
  description?: string;
}[] = [
  {
    value: "ACCOUNT_CREATED",
    title: "Account Created",
    description: "Service has been successfully created in the system.",
  },
  {
    value: "UNDER_VERIFICATION",
    title: "Under Verification",
  },
  {
    value: "APPROVAL",
    title: "Approval",
  },
];

export const UpdateStatusSheetForm: React.FC<UpdateStatusSheetProps> = ({
  defaultStatus = "UNDER_VERIFICATION",
  onClose,
  onSubmit,
}) => {
  const form = useForm<UpdateStatusFormValues>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: {
      status: defaultStatus,
      note: "",
    },
  });

  const handleSubmit = (values: UpdateStatusFormValues, action: "approve" | "reject") => {
    onSubmit({
      status: values.status,
      note: values.note ?? "",
      action,
    });
    onClose();
  };

  return (
    <Form {...form}>
      <form className="font-poppins flex h-full flex-col pt-3">
        <div className="flex items-center gap-3 px-2 pb-6">
          <ArrowLeft className="size-5 cursor-pointer" onClick={onClose} />
          <h2 className="text-[18px] font-semibold text-[#202020]">Update Status</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-8">
                <FormControl>
                  <div className="flex flex-col gap-8">
                    {STATUS_OPTIONS.map((option) => {
                      const checked = field.value === option.value;

                      return (
                        <label
                          key={option.value}
                          className="flex cursor-pointer items-start gap-3"
                        >
                          <input
                            type="radio"
                            value={option.value}
                            checked={checked}
                            onChange={() => field.onChange(option.value)}
                            className="sr-only"
                          />
                          <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#37B3AC]">
                            <span
                              className={`h-4 w-4 rounded-full bg-primary transition-opacity ${
                                checked ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </span>
                          <span className="flex flex-col gap-1">
                            <span className="text-[17px] font-semibold text-[#202020]">
                              {option.title}
                            </span>
                            {option.description && (
                              <span className="text-[15px] text-[#9A9A9A]">
                                {option.description}
                              </span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-10">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-[16px] font-medium text-[#202020]">
                    Note
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={5}
                      placeholder=""
                      className="min-h-[120px] w-full resize-none rounded-xl border border-[#D9D9D9] px-4 py-3 text-sm outline-none transition-shadow focus:border-[#807d7d] focus:ring-2 focus:ring-[#807d7d]/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-[#F1F1F1] px-2 pt-6">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer"
            onClick={form.handleSubmit((values) => handleSubmit(values, "reject"))}
          >
            Reject
          </Button>
          <PrimaryButton
            type="button"
            className="bg-primary text-white py-2 rounded-md w-36!"
            title="Approve"
            onClick={form.handleSubmit((values) => handleSubmit(values, "approve"))}
          />
        </div>
      </form>
    </Form>
  );
};


