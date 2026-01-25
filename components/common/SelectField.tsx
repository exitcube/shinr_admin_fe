'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectFieldProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  placeholder?: string;
  data: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  field,
  placeholder,
  data,
}) => {
  return (
    <Select
      value={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger className="w-full h-10 rounded-lg border border-[#C2C2C2] text-sm">
        <SelectValue placeholder={placeholder || 'Select...'} />
      </SelectTrigger>
      <SelectContent className=' z-10'>
        {data.length > 0 ? (
          data.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="" disabled>
            No options found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
