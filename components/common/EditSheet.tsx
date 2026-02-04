"use client";

import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";

interface SheetWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  className?: string;
}

export function SheetWrapper({
  open,
  onOpenChange,
  title,
  side = "right",
  children,
  className,
}: SheetWrapperProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className={`${className} sm:max-w-none! w-[650px] p-6 overflow-auto`}>
        <SheetHeader>
          {title && (
            <div className="flex items-center gap-2">
              <ArrowLeft
                className="size-5 cursor-pointer"
                onClick={() => onOpenChange(false)}
              />
              <SheetTitle className="font-poppins text-sm font-medium">
                {title}
              </SheetTitle>
            </div>
          )}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
