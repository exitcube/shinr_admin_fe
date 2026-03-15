"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  emptyText = "No options found.",
  searchable = true,
  disabled,
  className,
  triggerClassName,
  contentClassName,
}) => {
  const [open, setOpen] = useState(false);

  const selectedLabels = useMemo(() => {
    const selected = options.filter((option) =>
      selectedValues.includes(option.value),
    );
    return selected.map((option) => option.label);
  }, [options, selectedValues]);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
      return;
    }
    onChange([...selectedValues, value]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full h-10 px-3 flex items-center justify-between border border-[#C2C2C2] rounded-lg text-sm bg-white",
            triggerClassName,
          )}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : placeholder}
          </span>
          <ChevronDown size={16} className="ml-2 text-[#6B6B6B]" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        className={cn("w-56 p-3", className, contentClassName)}
      >
        <Command>
          {searchable ? (
            <CommandInput placeholder={searchPlaceholder} />
          ) : null}
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const checked = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggleValue(option.value)}
                    className="flex items-center gap-2"
                  >
                    <Checkbox checked={checked} className="pointer-events-none" />
                    <span className="text-sm">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
