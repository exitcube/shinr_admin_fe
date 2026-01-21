/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps, Control, FieldValues, FieldPath } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

interface FormComboboxProps {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  className?: string;
}

export function FormCombobox({
  name,
  control,
  options,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  label,
  className,
}: FormComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => (
        <FormItem className={cn("flex flex-col gap-2", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {field.value
                    ? options.find((opt) => opt.value === field.value)?.label
                    : placeholder}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-0" align="start">
              <Command>
                <div className="relative">
                  <CommandInput
                    placeholder={searchPlaceholder}
                    value={search}
                    onValueChange={setSearch}
                    className="pr-10" // leave space for search icon
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                </div>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          field.onChange(option.value);
                          setSearch("");
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            option.value === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
