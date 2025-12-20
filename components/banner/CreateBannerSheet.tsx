import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { BannerForm } from "./BannerForm";

export const CreateBannerSheet: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white px-4! py-2.5!">
          +&nbsp;Create Banner
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-none! w-[650px] p-6" hideCloseIcon>
        <SheetHeader>
          <div className="flex items-center gap-2">
            
          <ArrowLeft className="size-5 cursor-pointer" />
          <SheetTitle className="font-poppins text-sm font-medium">Create New Banner</SheetTitle>
          </div>
        </SheetHeader>
         <BannerForm />
      </SheetContent>
    </Sheet>
  );
};
