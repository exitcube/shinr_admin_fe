import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner";

interface IProps {
  open: boolean;
  categoryName: string;
  isSubmitting?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (nextName: string) => void;
}

export const EditCategoryDialog: React.FC<IProps> = ({
  open,
  categoryName,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}) => {
  const [value, setValue] = React.useState(categoryName);

  useEffect(() => {
    setValue(categoryName);
  }, [categoryName]);

  const handleClose = () => {
    if (isSubmitting) return;
    onOpenChange(false);
  };
  

  const handleSubmit = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    onSubmit(trimmedValue);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-category-name"
            className="text-sm font-medium text-[#101010]"
          >
            Category Name
          </label>
          <Input
            id="edit-category-name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter category name"
            className="border-[#D6D6D6] focus-visible:border-[#D6D6D6] focus-visible:ring-0"
            disabled={isSubmitting}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="hover:cursor-pointer"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!value.trim() || isSubmitting}
            className="bg-[#128C7E] text-white hover:bg-[#0F6F64] hover:cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
