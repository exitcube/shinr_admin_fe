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
import { AdminUserForm } from "./UserForm";

export const CreateAdminUserSheet: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary text-white px-4! py-2.5!">
          +&nbsp;Add User
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-none! w-[650px] p-6 overflow-auto"
        hideCloseIcon
      >
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="size-5 cursor-pointer"
              onClick={handleClose}
            />
            <SheetTitle className="font-poppins text-sm font-medium ">
              Create New Admin User
            </SheetTitle>
          </div>
        </SheetHeader>
        <AdminUserForm onCancel={handleClose} />
      </SheetContent>
    </Sheet>
  );
};
