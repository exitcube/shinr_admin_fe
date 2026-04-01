"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  OrganisationWorkflowStatus,
  UpdateOrganisationStatusInput,
} from "@/types/organisation";
import { UpdateStatusSheetForm } from "./UpdateStatusSheetForm";

interface UpdateStatusSheetProps {
  defaultStatus?: OrganisationWorkflowStatus;
  onSubmit: (payload: UpdateOrganisationStatusInput) => void;
}

export const UpdateStatusSheet: React.FC<UpdateStatusSheetProps> = ({
  defaultStatus,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-[#D8D8D8] px-5 py-6 text-[18px] font-medium text-[#202020]"
        >
          Update Status
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-none! w-[680px] overflow-auto rounded-l-[28px] border-l border-[#EAEAEA] px-6 py-5"
        hideCloseIcon
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Update Status</SheetTitle>
        </SheetHeader>
        <UpdateStatusSheetForm
          defaultStatus={defaultStatus}
          onClose={handleClose}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
};
