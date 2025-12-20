"use client";
import React from "react";
import { SearchInput } from "./SearchInput";
import { BellIcon } from "@heroicons/react/24/outline";
import { CalendarDays } from "lucide-react";

const formattedDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  weekday: "long",
}).format(new Date());


export const AppHeader: React.FC = () => {
  return (
    <div className="p-4 flex items-center justify-between">
      <SearchInput />
      <div className="flex gap-3">
        <span className="flex items-center justify-center border border-gray-300 rounded-lg py-1.5 px-3 cursor-pointer hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-[#101010]" />
        </span>
        <span className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-1.5 px-3 cursor-pointer hover:bg-gray-100">
            <CalendarDays className="text-[#101010]" />{formattedDate}
        </span>
      </div>
    </div>
  );
};
