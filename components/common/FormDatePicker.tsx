/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface FormDateTimePickerProps {
  name: string;
  control: Control<any>; // replace 'any' with your form type
  placeholder?: string;
  label?: string;
  className?: string;
  showTimeSelect?: boolean;
  timeIntervals?: number; // minutes between times
}

export const FormDateTimePicker: React.FC<FormDateTimePickerProps> = ({
  name,
  control,
  placeholder = "Select date & time",
  label,
  className,
  showTimeSelect = true,
  timeIntervals = 15,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
          {label && <label className="text-sm font-medium">{label}</label>}
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            showTimeSelect={showTimeSelect}
            timeIntervals={timeIntervals}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText={placeholder}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      )}
    />
  );
};
