import { SearchField } from "@/components/common/SearchField";
import { Button } from "@/components/ui/button";

interface SearchAndAddSectionProps {
  data: any
  search: string;
  action?: React.ReactNode;
  onSearchChange: (value: string) => void;
}

export const SearchAndAddSection: React.FC<SearchAndAddSectionProps> = ({ search,
  onSearchChange,
  action, data }) => {

  return (
    <div className="flex items-center gap-4 mt-4 mb-4">
      <SearchField field={{
        value: search,
        onChange: onSearchChange, // ✅ MUST be a function
      }}
        data={data} />
      {action && action}
    </div>
  );
};
