/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface DatePickerProps {
  name: string;
  control: Control<any>; // replace 'any' with your form type
  placeholder?: string;
  label?: string;
  className?: string;
}

export const FormDatePicker: React.FC<DatePickerProps> = ({
  name,
  control,
  placeholder = "Select date",
  label,
  className,
}) => {
  const { field } = useController({ name, control });
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => {
    if (!field.value) return undefined;
    return field.value instanceof Date ? field.value : new Date(field.value);
  }, [field.value]);

  const [month, setMonth] = useState<Date | undefined>(selectedDate);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-[#128C7E]/30 focus-within:border-[#128C7E]">
        <Input
          key={selectedDate ? selectedDate.getTime() : "empty"}
          defaultValue={selectedDate ? formatDate(selectedDate) : ""}
          placeholder={placeholder}
          onChange={(e) => {
            const nextDate = new Date(e.target.value);
            if (isValidDate(nextDate)) {
              field.onChange(nextDate);
              setMonth(nextDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Select date"
              className="h-9 w-9"
            >
              <CalendarIcon className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                if (date) {
                  field.onChange(date);
                  setMonth(date);
                  setOpen(false);
                }
              }}
              required
              classNames={{
                day_button:
                  "data-[selected-single=true]:bg-[#E9FBF0] data-[selected-single=true]:text-[#22C05D]",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !Number.isNaN(date.getTime());
}
