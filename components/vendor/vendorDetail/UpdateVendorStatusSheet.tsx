"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowLeft, FileText } from "lucide-react";
import React, { useState } from "react";

type StatusStep = {
  title: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
  attachment?: string;
};

const statusSteps: StatusStep[] = [
  {
    title: "Account Created",
    description:
      "Your account has been successfully created. You can now begin the verification process.",
    status: "completed",
  },
  {
    title: "Corporate License Verification",
    description: "Your corporate/business license has been successfully verified",
    status: "current",
    attachment: "PDf",
  },
  {
    title: "Location Verification",
    status: "upcoming",
  },
  {
    title: "Shop Image Verification",
    status: "upcoming",
  },
  {
    title: "Verification completed",
    status: "upcoming",
  },
];

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateVendorStatusSheet: React.FC<IProps> = ({
  open,
  onOpenChange,
}) => {
  const [note, setNote] = useState("");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-none! w-[760px] overflow-auto p-6"
        hideCloseIcon
      >
        <SheetHeader className="p-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-[#202020]"
            >
              <ArrowLeft className="size-5" />
            </button>
            <SheetTitle className="font-poppins text-[14px] font-semibold text-[#202020]">
              Update Status
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="font-poppins mt-8 flex min-h-[calc(100vh-110px)] flex-col">
          <div className="flex-1">
            <div className="space-y-6">
              {statusSteps.map((step, index) => (
                <StatusRow
                  key={step.title}
                  step={step}
                  isLast={index === statusSteps.length - 1}
                />
              ))}
            </div>

            <div className="mt-10">
              <p className="text-[14px] font-medium text-[#202020]">Note</p>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="mt-3 h-[114px] w-full resize-none rounded-[4px] border border-[#D6D6D6] px-3 py-2 text-sm text-[#202020] outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 pb-1">
            <Button
              type="button"
              variant="outline"
              className="h-12 w-[185px] rounded-xl border-[#D6D6D6] text-[#FF3B30]"
            >
              Reject
            </Button>
            <Button
              type="button"
              className="h-12 w-[185px] rounded-xl bg-primary text-white hover:bg-primary/90"
            >
              Approve
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const StatusRow: React.FC<{ step: StatusStep; isLast: boolean }> = ({
  step,
  isLast,
}) => {
  const isActive = step.status === "completed" || step.status === "current";

  return (
    <div className="flex gap-3">
      <div className="flex w-6 flex-col items-center">
        <span
          className={`size-6 rounded-full border ${
            isActive ? "border-primary bg-primary" : "border-primary bg-white"
          }`}
        >
          <span className="m-[3px] block size-[16px] rounded-full border border-white bg-transparent" />
        </span>
        {!isLast && (
          <span
            className={`mt-1 w-[2px] flex-1 ${
              isActive ? "bg-primary" : "bg-[#D4D4D4]"
            }`}
          />
        )}
      </div>

      <div className="pt-0.5">
        <p className="text-[14px] font-semibold text-[#171717]">{step.title}</p>
        {step.description && (
          <p className="mt-1 max-w-[560px] text-[12px] leading-5 text-[#8B8B8B]">
            {step.description}
          </p>
        )}
        {step.attachment && (
          <div className="mt-3 flex items-center gap-3">
            <span className="text-[12px] text-[#8B8B8B]">Attached:</span>
            <div className="flex h-12 items-center gap-3 rounded-[4px] border border-[#ECECEC] px-4">
              <span className="flex size-6 items-center justify-center rounded-[4px] bg-[#EE2A24] text-white">
                <FileText className="size-3.5" />
              </span>
              <span className="text-[12px] text-[#8B8B8B]">{step.attachment}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
