/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormCombobox } from "@/components/common/FormCombobox";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBrandListing, useCreateVehicleMutation, useEditVehicleModelMutation, useTypeListing } from "@/hooks/useVehicleQuery";
import { CreateVehicleBody, editVehicleBody } from "@/types/vehicle";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SelectOption = {
  label: string;
  value: string;
};

type PagesState = Record<number, SelectOption[]>;

type PagesAction = {
  type: "store";
  page: number;
  options: SelectOption[];
};

type PageAction =
  | { type: "reset" }
  | { type: "increment" };

const pagesReducer = (state: PagesState, action: PagesAction): PagesState => {
  if (action.type !== "store") return state;

  if (action.page === 1) {
    return {
      1: action.options,
    };
  }

  return {
    ...state,
    [action.page]: action.options,
  };
};

const pageReducer = (state: number, action: PageAction) => {
  if (action.type === "reset") return 1;
  if (action.type === "increment") return state + 1;
  return state;
};

export const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ vehicleId, vehicleData, onCancel }) => {
  const form = useForm({
    defaultValues: {
    model: "",
    vehicle_brand: "",
    vehicle_type: "",
  },
  });

  const isEditMode = Boolean(vehicleId);

  const { mutate: createVehicleMutation, isPending: isCreateVehicleMutationLoading } = useCreateVehicleMutation();
  const { mutate: editVehicleMutation, isPending: isEditVehicleLoading } = useEditVehicleModelMutation();
  const [brandSearch, setBrandSearch] = useState("");
  const [brandPage, dispatchBrandPage] = React.useReducer(pageReducer, 1);
  const [typeSearch, setTypeSearch] = useState("");
  const [typePage, dispatchTypePage] = React.useReducer(pageReducer, 1);
  const [brandPages, dispatchBrandPages] = React.useReducer(pagesReducer, {});
  const [typePages, dispatchTypePages] = React.useReducer(pagesReducer, {});
  const isEditFormInitializedRef = React.useRef(false);

  const brandQueryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(brandPage));
    params.set("limit", "10");
    if (brandSearch.trim()) {
      params.set("search", brandSearch.trim());
    }
    return params;
  }, [brandPage, brandSearch]);

  const { data: brandListing, isLoading: isBrandListingLoading } = useBrandListing(brandQueryParams);

  const typeQueryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(typePage));
    params.set("limit", "10");
    if (typeSearch.trim()) {
      params.set("searchVehicleTypeName", typeSearch.trim());
    }
    return params;
  }, [typePage, typeSearch]);

  const { data: typeListing, isLoading: isTypeListingLoading } = useTypeListing(typeQueryParams);
  const isPageLoading = isBrandListingLoading || isTypeListingLoading;

  const vehicleBrandOptions = useMemo(() => {
    const pageEntries = Object.entries(brandPages).sort(
      ([left], [right]) => Number(left) - Number(right),
    );
    const mergedOptions: SelectOption[] = [];
    const existingValues = new Set<string>();

    pageEntries.forEach(([, options]) => {
      options.forEach((option) => {
        if (!existingValues.has(option.value)) {
          existingValues.add(option.value);
          mergedOptions.push(option);
        }
      });
    });

    return mergedOptions;
  }, [brandPages]);

  const vehicleTypeOptions = useMemo(() => {
    const pageEntries = Object.entries(typePages).sort(
      ([left], [right]) => Number(left) - Number(right),
    );
    const mergedOptions: SelectOption[] = [];
    const existingValues = new Set<string>();

    pageEntries.forEach(([, options]) => {
      options.forEach((option) => {
        if (!existingValues.has(option.value)) {
          existingValues.add(option.value);
          mergedOptions.push(option);
        }
      });
    });

    return mergedOptions;
  }, [typePages]);

  const hasMoreBrands = Boolean(brandListing?.pagination?.hasNext);
  const hasMoreTypes = Boolean(typeListing?.pagination?.hasNext);

  const onSubmit = (data: any) => {
    const payload: CreateVehicleBody = {
      model: data.model,
      makeId: data.vehicle_brand,
      categoryId: data.vehicle_type,
    };
    if (isEditMode && vehicleId) {
      const payLoadEdit: editVehicleBody = {
        model: data.model,
        makeId: data.vehicle_brand,
        categoryId: data.vehicle_type,
      }
      editVehicleMutation(
        { id: vehicleId.toString(), payload: payLoadEdit },
        {
          onSuccess: () => {
            toast.success("Vehicle updated successfully");
            onCancel();
          },
          onError: (error) => {
            toast.error(`Vehicle update failed: ${error.message}`);
          },
        }
      );
      return;
    }
    createVehicleMutation(payload, {
      onSuccess: () => {
        form.reset()
        toast.success("Vehicle created successfully")
        onCancel();
      },
      onError: (error) => {
        toast.error(`Vehicle creation failed: ${error.message}`);
      },
    });
  };
  useEffect(() => {
    const nextOptions =
      brandListing?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? [];

    dispatchBrandPages({
      type: "store",
      page: brandPage,
      options: nextOptions,
    });
  }, [brandListing, brandPage]);

  useEffect(() => {
    const nextOptions =
      typeListing?.data?.map((option) => ({
        label: option.name,
        value: option.id.toString(),
      })) ?? [];

    dispatchTypePages({
      type: "store",
      page: typePage,
      options: nextOptions,
    });
  }, [typeListing, typePage]);

  useEffect(() => {
    if (!vehicleId) {
      isEditFormInitializedRef.current = false;
      return;
    }

    if (!vehicleData || !typeListing || isEditFormInitializedRef.current) return;

    const brand = vehicleBrandOptions.find((option) => option.label === vehicleData.make);

    const type = vehicleTypeOptions.find((option) => option.label === vehicleData.category);

    if (!brand && hasMoreBrands && !isBrandListingLoading && !brandSearch.trim()) {
      dispatchBrandPage({ type: "increment" });
      return;
    }

    if (!type && hasMoreTypes && !isTypeListingLoading && !typeSearch.trim()) {
      dispatchTypePage({ type: "increment" });
      return;
    }

    if (!brand) return;
    if (!type) return;

    form.reset({
      model: vehicleData.model,
      vehicle_brand: brand?.value ?? "",
      vehicle_type: type?.value ?? "",
    });
    isEditFormInitializedRef.current = true;
  }, [
    vehicleId,
    vehicleData,
    vehicleBrandOptions,
    typeListing,
    form,
    hasMoreBrands,
    hasMoreTypes,
    isBrandListingLoading,
    isTypeListingLoading,
    brandSearch,
    typeSearch,
    vehicleTypeOptions,
  ]);

  const handleBrandSearchChange = (value: string) => {
    dispatchBrandPage({ type: "reset" });
    setBrandSearch(value);
  };

  const handleLoadMoreBrands = () => {
    if (hasMoreBrands && !isBrandListingLoading) {
      dispatchBrandPage({ type: "increment" });
    }
  };

  const handleTypeSearchChange = (value: string) => {
    dispatchTypePage({ type: "reset" });
    setTypeSearch(value);
  };

  const handleLoadMoreTypes = () => {
    if (hasMoreTypes && !isTypeListingLoading) {
      dispatchTypePage({ type: "increment" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-poppins flex flex-col justify-between h-full"
      >
        {isPageLoading && (
          <div className="flex items-center gap-2 pb-4 text-sm text-muted-foreground">
            <Spinner />
            <span>Loading form data...</span>
          </div>
        )}
        <div className="flex flex-col gap-10  pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="font-medium text-sm">Model</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border border-[#C2C2C2] rounded-lg px-3 text-sm w-full focus:border-[#807d7d]! focus:ring-0!"
                      placeholder="Enter name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Brand</label>
              <FormCombobox
                name="vehicle_brand"
                control={form.control}
                options={vehicleBrandOptions}
                onSearchChange={handleBrandSearchChange}
                placeholder={
                  isBrandListingLoading
                    ? "Loading vehicle brands..."
                    : "Search Vehicle Brand"
                }
                searchPlaceholder={
                  isBrandListingLoading ? "Loading..." : "Search Vehicle Brand"
                }
                emptyMessage="No vehicle brands found."
                isLoading={isBrandListingLoading}
                hasMore={hasMoreBrands}
                onLoadMore={handleLoadMoreBrands}
                selectedLabel={vehicleData?.make}
              />
              <FormMessage />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Vehicle type</label>
              <FormCombobox
                name="vehicle_type"
                control={form.control}
                options={vehicleTypeOptions}
                onSearchChange={handleTypeSearchChange}
                placeholder={
                  isTypeListingLoading
                    ? "Loading vehicle types..."
                    : "Search Vehicle Type"
                }
                searchPlaceholder={
                  isTypeListingLoading ? "Loading..." : "Search Vehicle Type"
                }
                emptyMessage="No vehicle types found."
                isLoading={isTypeListingLoading}
                hasMore={hasMoreTypes}
                onLoadMore={handleLoadMoreTypes}
                selectedLabel={vehicleData?.category}
              />
              <FormMessage />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant={"outline"}
            className="px-4 py-3 border-[#D6D6D6] text-red-500 w-36! cursor-pointer "
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <PrimaryButton
            type="submit"
            className="bg-primary text-white py-2 rounded-md w-36!"
            title={isEditMode ? "Update" : "Create"}
            isLoading={
              isEditMode ? isEditVehicleLoading : isCreateVehicleMutationLoading
            }
            disabled={
              isEditMode ? isEditVehicleLoading : isCreateVehicleMutationLoading
            }
          />
        </div>
      </form>
    </Form>
  );
};

interface AddVehicleFormProps {
  vehicleId?: number;
  vehicleData?: any;
  onCancel: () => void;
}
