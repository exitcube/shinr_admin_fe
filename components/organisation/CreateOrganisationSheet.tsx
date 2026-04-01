"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { OrganisationForm } from "./OrganisationForm";
import { CreateOrganisationInput } from "@/types/organisation";

interface CreateOrganisationSheetProps {
  onCreate: (organisation: CreateOrganisationInput) => void;
}

export const CreateOrganisationSheet: React.FC<CreateOrganisationSheetProps> = ({
  onCreate,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white px-4! py-2.5!">
          +&nbsp;Add Organisation
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-none! w-[680px] overflow-auto rounded-l-[28px] border-l border-[#EAEAEA] px-6 py-5"
        hideCloseIcon
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ArrowLeft className="size-5 cursor-pointer" onClick={handleClose} />
            <SheetTitle className="font-poppins text-sm font-medium">
              Create New Organisation
            </SheetTitle>
          </div>
        </SheetHeader>
        <OrganisationForm onCancel={handleClose} onCreate={onCreate} />
      </SheetContent>
    </Sheet>
  );
};

