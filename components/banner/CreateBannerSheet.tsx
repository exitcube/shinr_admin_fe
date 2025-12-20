import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

export const CreateBannerSheet: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white px-4! py-2.5!">
          +&nbsp;Create Banner
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[620px] p-6">
        <SheetHeader>
          <SheetTitle>Create Banner</SheetTitle>
          <SheetDescription>gaga</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
