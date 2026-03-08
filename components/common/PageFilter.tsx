import React from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface PageFiltersProps {
  filters: React.ReactNode[];
  className?: string;
}

export const PageFilters: React.FC<PageFiltersProps> = ({ filters, className }) => {
  return (
    <div
      className={`bg-white flex items-center px-4 py-2.5 gap-3 border border-[#D6D6D6] rounded-md ${
        className ?? ""
      }`}
    >
      {filters.map((filter, index) => (
        <React.Fragment key={index}>{filter}</React.Fragment>
      ))}
    </div>
  );
};

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (next: string[]) => void;
  className?: string;
  children?: React.ReactNode;
  childrenPlacement?: "top" | "bottom";
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  className,
  children,
  childrenPlacement = "bottom",
}) => {
  const toggleOption = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
      return;
    }

    onChange(selectedValues.filter((item) => item !== value));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`group flex gap-1 items-center text-xs font-medium cursor-pointer select-none transition-colors hover:text-[#128C7E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E]/30 rounded-sm ${className ?? ""}`}
        >
          {label}
          <ChevronDown
            size={16}
            className="transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        avoidCollisions={false}
        className="w-56 p-3 bg-white border border-[#E8E8E8] rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
      >
        <div className="flex flex-col gap-3">
          {children && childrenPlacement === "top" ? (
            <div className="pb-2 border-b border-[#EDEDED]">{children}</div>
          ) : null}

          {options.map((option) => {
            const id = `${label}-${option.value}`;
            return (
              <label
                key={option.value}
                htmlFor={id}
                className="flex items-center gap-2 cursor-pointer rounded-md px-1.5 py-1 transition-colors hover:bg-[#F7F7F7]"
              >
                <Checkbox
                  id={id}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => toggleOption(option.value, checked === true)}
                />
                <span className="text-sm text-[#101010]">{option.label}</span>
              </label>
            );
          })}

          {children && childrenPlacement === "bottom" ? (
            <div className="pt-2 border-t border-[#EDEDED]">{children}</div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface SearchableFilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (next: string[]) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

export const SearchableFilterDropdown: React.FC<SearchableFilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  className,
}) => {
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <FilterDropdown
      label={label}
      options={filteredOptions}
      selectedValues={selectedValues}
      onChange={onChange}
      childrenPlacement="top"
      className={className}
    >
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9B]"
        />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full h-[30px] rounded-[12px] border border-[#BEBEBE] pl-8 pr-3 text-xs text-[#101010] outline-none transition-shadow focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E]/20"
        />
      </div>
    </FilterDropdown>
  );
};
