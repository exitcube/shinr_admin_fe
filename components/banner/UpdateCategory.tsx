import React, { useMemo, useState } from "react";
import { ChevronDown, PenLine, Search, Trash2 } from "lucide-react";
import { FilterOption } from "@/components/common/PageFilter";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { EditCategoryDialog } from "@/components/banner/EditCategoryDialog";
import {
  useDeleteBannerCategoryMutation,
  useEditBannerCategoryMutation,
} from "@/hooks/useBannerQuery";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UpdateCategoryProps {
  categories: FilterOption[];
}

export const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  categories,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterOption | null>(
    null,
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { mutate: editBannerCategory, isPending: isEditingCategory } =
    useEditBannerCategoryMutation();
  const { mutate: deleteBannerCategory, isPending: isDeletingCategory } =
    useDeleteBannerCategoryMutation();

  const filteredCategories = useMemo(() => {
    const trimmedSearch = search.trim().toLowerCase();

    if (!trimmedSearch) {
      return categories;
    }

    return categories.filter((category) =>
      category.label.toLowerCase().includes(trimmedSearch),
    );
  }, [categories, search]);

  const handleEditClick = (category: FilterOption) => {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (category: FilterOption) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeletingCategory) return;

    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedCategory) return;

    deleteBannerCategory(Number(selectedCategory.value), {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        setSelectedCategory(null);
      },
    });
  };

  const handleEditDialogChange = (open: boolean) => {
    if (!open && isEditingCategory) return;

    setOpenEditDialog(open);

    if (!open) {
      setSelectedCategory(null);
    }
  };

  const handleEditSubmit = (nextName: string) => {
    if (!selectedCategory) return;

    editBannerCategory(
      {
        id: selectedCategory.value,
        updatingText: nextName,
      },
      {
        onSuccess: () => {
          setOpenEditDialog(false);
          setSelectedCategory(null);
        },
      },
    );
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md border border-[#D6D6D6] bg-white px-2 py-1.5 text-sm whitespace-nowrap transition-colors hover:cursor-pointer hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#128C7E]/30"
          >
            Update Category
            <ChevronDown size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={8}
          className="w-[320px] rounded-xl border border-[#E8E8E8] bg-white p-3 shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
        >
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9B]"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search category..."
                className="h-[34px] w-full rounded-xl border border-[#BEBEBE] pl-8 pr-3 text-xs text-[#101010] outline-none transition-shadow focus:border-[#128C7E] focus:ring-2 focus:ring-[#128C7E]/20"
              />
            </div>

            <div className="max-h-[280px] overflow-y-auto">
              {filteredCategories.length ? (
                <div className="flex flex-col gap-2">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.value}
                      className="flex items-center justify-between rounded-md px-2 py-2 transition-colors hover:bg-[#F7F7F7]"
                    >
                      <span className="text-sm text-[#101010]">
                        {category.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditClick(category)}
                          className="rounded-md p-1.5 text-[#666666] transition-colors hover:bg-white hover:text-[#128C7E] hover:cursor-pointer"
                          aria-label={`Edit ${category.label}`}
                        >
                          <PenLine size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(category)}
                          className="rounded-md p-1.5 text-[#666666] transition-colors hover:cursor-pointer hover:bg-white hover:text-[#D14343]"
                          aria-label={`Delete ${category.label}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-[#878787]">
                  No categories found.
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        title="Delete Category"
        description={
          selectedCategory
            ? `Are you sure you want to delete ${selectedCategory.label}?`
            : "Are you sure you want to delete this category?"
        }
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
      />

      <EditCategoryDialog
        open={openEditDialog}
        categoryName={selectedCategory?.label ?? ""}
        isSubmitting={isEditingCategory}
        onOpenChange={handleEditDialogChange}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};
