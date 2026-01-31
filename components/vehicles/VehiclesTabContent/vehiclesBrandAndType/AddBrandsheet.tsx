import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { AddBrandForm } from "./AddBrandForm";

export const AddBrandSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline"
          className="text-primary border-primary">
          +&nbsp;Add Brand
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-none! w-[650px] p-6 overflow-auto"
        hideCloseIcon
      >
        <div className="flex items-center gap-2">
          <ArrowLeft className="size-5 cursor-pointer" onClick={handleClose} />
          <SheetTitle className="font-poppins text-sm font-medium ">
            Create New Vehicle Brand
          </SheetTitle>
        </div>
        <AddBrandForm />
      </SheetContent>
    </Sheet>
  );
};
