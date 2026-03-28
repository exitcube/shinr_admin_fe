"use client";

import React from "react";
import { FilterIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilterIconDropdownProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const FilterIconDropdown: React.FC<FilterIconDropdownProps> = ({
  children,
  icon,
  className,
  triggerClassName,
  contentClassName,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "text-[#128C7E] pr-2 border-r-2 border-[#128C7E] text-xs font-medium cursor-pointer transition-colors hover:text-[#0F6F64] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E]/30 rounded-sm",
            triggerClassName,
          )}
        >
          {icon ?? <FilterIcon size={16} />}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        avoidCollisions={false}
        className={cn(
          "w-fit min-w-40 p-3 bg-white border border-[#E8E8E8] rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)]",
          className,
          contentClassName,
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
