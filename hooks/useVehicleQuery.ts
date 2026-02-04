import { VehicleService } from "@/services/vehicle";
import {
  CreateVehicleBody,
  CreateVehicleBrandBody,
  CreateVehicleTypeBody,
  editBrandBody,
  editTypeBody,
  editVehicleBody,
  IVehicleBrandandTypeListingResponse,
  IVehicleBrandAndTypeResponse,
  IVehicleModelsListingResponse,
  ListVehicleModelsBody,
} from "@/types/vehicle";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";

const vehicleService = new VehicleService();

export const useBrandListing = (search: string) => {
  return useQuery<IVehicleBrandAndTypeResponse>({
    queryKey: ["brand-listing"],
    queryFn: () => vehicleService.getBrandListing(search),
  });
};

export const useTypeListing = (queryParams?: URLSearchParams) => {
  return useQuery<IVehicleBrandAndTypeResponse>({
    queryKey: ["type-listing"],
    queryFn: () => vehicleService.getTypeListing(queryParams),
  });
};

export const useCreateVehicleMutation = () => {
  return useMutation<unknown, Error, CreateVehicleBody>({
    mutationKey: ["create-vehicle"],
    mutationFn: (payload) => vehicleService.createVehicle(payload),
  });
};

export const useVehicleModelsListing = (
  payload?: ListVehicleModelsBody,
): UseQueryResult<IVehicleModelsListingResponse, Error> => {
  return useQuery({
    queryKey: ["vehicle-models", payload],
    queryFn: () => vehicleService.listVehicleModels(payload ?? {}),
  });
};

export const useVehicleBrandListing = (queryParams?: URLSearchParams) => {
  return useQuery<IVehicleBrandandTypeListingResponse>({
    queryKey: ["vehicle-brand-listing"],
    queryFn: () => vehicleService.vehicleBrandListing(queryParams),
  });
};

export const useVehicleTypeListing = (queryParams?: URLSearchParams) => {
  return useQuery<IVehicleBrandandTypeListingResponse>({
    queryKey: ["vehicle-type-listing"],
    queryFn: () => vehicleService.vehicleTypeListing(queryParams),
  });
};

export const useAddVehicleBrandMutation = () => {
  return useMutation<unknown, Error, CreateVehicleBrandBody>({
    mutationKey: ["create-vehicle-brand"],
    mutationFn: (payload) => vehicleService.addVehicleBrand(payload),
  });
};

export const useAddVehicleTypeMutation = () => {
  return useMutation<unknown, Error, CreateVehicleTypeBody>({
    mutationKey: ["create-vehicle-type"],
    mutationFn: (payload) => vehicleService.addVehicleType(payload),
  });
};
export const useDeleteVehicleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationKey: ["delete-vehicle"],
    mutationFn: (id: string) => vehicleService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-models"] });
      toast.success("Vehicle deleted successfully");
    },
    onError: () => {
      toast.error("Vehicle deleted failed");
    },
  });
};
export const useDeleteVehicleBrandMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationKey: ["delete-vehicle-brand"],
    mutationFn: (id: string) => vehicleService.deleteVehicleBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-brand-listing"] });
      toast.success("Vehicle brand deleted successfully");
    },
    onError: () => {
      toast.error("Vehicle brand deleted failed");
    },
  });
};
export const useDeleteVehicleTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationKey: ["delete-vehicle-type"],
    mutationFn: (id: string) => vehicleService.deleteVehicleType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-type-listing"] });
      toast.success("Vehicle type deleted successfully");
    },
    onError: () => {
      toast.error("Vehicle type deleted failed");
    },
  });
};
export const useEditVehicleModelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { id: string; payload: editVehicleBody }>(
    {
      mutationKey: ["edit-vehicle-model"],
      mutationFn: ({ id, payload }) => vehicleService.editVehicleModel(id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vehicle-models"] });
        toast.success("Vehicle model edited successfully");
      },
      onError: () => {
        toast.error("Vehicle model edited failed");
      },
    }
  );
};

export const useEditVehicleBrandMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { payload: editBrandBody }>({
    mutationKey: ["edit-vehicle-brand"],
    mutationFn: ({ payload }) => vehicleService.editVehicleBrand(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-brand-listing"] });
      toast.success("Vehicle brand edited successfully");
    },
    onError: () => {
      toast.error("Vehicle brand edited failed");
    },
  });
};

export const useEditVehicleTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { payload: editTypeBody, queryParams?: URLSearchParams  }>(
    {
      mutationKey: ["edit-vehicle-type"],
      mutationFn: ({ payload,queryParams }) => vehicleService.editVehicleType(payload,queryParams),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vehicle-type-listing"] });
        toast.success("Vehicle type edited successfully");
      },
      onError: () => {
        toast.error("Vehicle type edited failed");
      },
    }
  );
};