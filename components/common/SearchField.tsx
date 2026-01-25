'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { LucideSearch } from 'lucide-react';

interface SearchFieldProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  placeholder?: string;
  data: string[]; // list of options to search
}

export const SearchField: React.FC<SearchFieldProps> = ({ field, placeholder, data }) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const handleChange = (value: string) => {
    field.onChange(value);
    const results = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <div className="relative w-full">
      <Input
        value={field.value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="w-full h-10 pr-10 pl-3 py-2 rounded-lg border border-[#C2C2C2] flex justify-between text-sm"
      />
      <LucideSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      {field.value && filteredData.length > 0 && (
        <Command className="absolute z-10 mt-1 w-full bg-white shadow-md rounded-md min-h-32 overflow-auto border border-[#C2C2C2]">
          <CommandList>
            {filteredData.map((item) => (
              <CommandItem key={item} onSelect={() => field.onChange(item)}>
                {item}
              </CommandItem>
            ))}
            {filteredData.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          </CommandList>
        </Command>
      )}
    </div>
  );
};
