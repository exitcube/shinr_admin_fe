import { VehicleService } from "@/services/vehicle";
import {
  CreateVehicleBody,
  CreateVehicleBrandBody,
  CreateVehicleTypeBody,
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
