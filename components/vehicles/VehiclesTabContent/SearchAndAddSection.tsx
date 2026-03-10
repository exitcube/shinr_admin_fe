import { SearchField } from "@/components/common/SearchField";

type SearchDataItem = string | { name: string };

interface SearchAndAddSectionProps {
  data: SearchDataItem[];
  search: string;
  action?: React.ReactNode;
  onSearchChange: (value: string) => void;
}

export const SearchAndAddSection: React.FC<SearchAndAddSectionProps> = ({
  search,
  onSearchChange,
  action,
}) => {

  return (
    <div className="flex items-center gap-4 mt-4 mb-4">
      <SearchField field={{
        value: search,
        onChange: onSearchChange, // ✅ MUST be a function
      }}
        data={[]} />
      {action && action}
    </div>
  );
};
