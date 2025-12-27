/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Controller, Control } from "react-hook-form";

interface FormSelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  name: string;
  control: Control<any>; // Type-safe: replace `any` with your form type
  placeholder?: string;
  options: FormSelectOption[];
  className?: string;
  disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  control,
  placeholder,
  options,
  className,
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value || ""}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger className={`w-full px-3 py-2 border-[#C2C2C2] rounded-lg ${className}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};
