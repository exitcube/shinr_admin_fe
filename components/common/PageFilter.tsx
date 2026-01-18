import React from "react";

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
