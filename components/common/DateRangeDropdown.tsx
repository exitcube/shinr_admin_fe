"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangeDropdownProps {
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateRangeDropdown: React.FC<DateRangeDropdownProps> = ({
  value,
  onChange,
  placeholder = "Select date range",
  className,
}) => {
  const label = React.useMemo(() => {
    if (!value?.from) {
      return placeholder;
    }

    if (!value.to) {
      return format(value.from, "dd MMM yyyy");
    }

    return `${format(value.from, "dd MMM yyyy")} - ${format(value.to, "dd MMM yyyy")}`;
  }, [placeholder, value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between border-[#C2C2C2] px-3 font-normal text-left text-sm text-[#101010] hover:bg-white",
            !value?.from && "text-[#7F7F7F]",
            className,
          )}
        >
          <span className="truncate">{label}</span>
          <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          classNames={{
            range_start: "rounded-l-md bg-[#DDFAF8]",
            range_middle: "rounded-none bg-[#DDFAF8] text-[#101010]",
            range_end: "rounded-r-md bg-[#DDFAF8]",
            day_button:
              "data-[selected-single=true]:bg-[#188A82] data-[selected-single=true]:text-white data-[range-start=true]:bg-[#188A82] data-[range-start=true]:text-white data-[range-end=true]:bg-[#188A82] data-[range-end=true]:text-white data-[range-middle=true]:bg-[#DDFAF8] data-[range-middle=true]:text-[#101010]",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
