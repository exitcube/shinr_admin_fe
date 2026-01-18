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
import { RewardsForm } from "./RewardsForm";

export const CreateRewardSheet: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white px-4! py-2.5!">
          +&nbsp;Create Reward
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-none! w-[650px] p-6"
        hideCloseIcon
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="size-5 cursor-pointer"
              onClick={handleClose}
            />
            <SheetTitle className="font-poppins text-sm font-medium">
              Create New Reward
            </SheetTitle>
          </div>
        </SheetHeader>

        <RewardsForm onCancel={handleClose} />
      </SheetContent>
    </Sheet>
  );
};
