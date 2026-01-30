import { SearchField } from "@/components/common/SearchField";
import { Button } from "@/components/ui/button";

interface SearchAndAddSectionProps {
  data: any;
  children: React.ReactNode;
}

export const SearchAndAddSection: React.FC<SearchAndAddSectionProps> = ({ data, children }) => {
  return (
    <div className="flex items-center gap-4 mt-4 mb-4">
      <SearchField field={{value:"",onChange:()=>{
        
      }}} data={data}/>
      <Button variant="outline" className="text-primary border-primary">
        {children}
      </Button>
    </div>
  );
};
