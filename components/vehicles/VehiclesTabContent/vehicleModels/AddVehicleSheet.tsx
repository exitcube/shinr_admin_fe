import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { AddVehicleForm } from "./AddVehicleForm";

export const AddVehicleSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white px-4! py-2.5!">
          +&nbsp;Add Vehicle
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
            Create New Vehicle
          </SheetTitle>
        </div>
        <AddVehicleForm onCancel={handleClose} />
      </SheetContent>
    </Sheet>
  );
};
