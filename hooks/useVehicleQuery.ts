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
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

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
  return useMutation<unknown, Error, string>({
    mutationKey: ["delete-vehicle"],
    mutationFn: (id: string) => vehicleService.deleteVehicle(id),
  });
};
export const useDeleteVehicleBrandMutation = () => {
  return useMutation<unknown, Error, string>({
    mutationKey: ["delete-vehicle-brand"],
    mutationFn: (id: string) => vehicleService.deleteVehicleBrand(id),
  });
};
export const useDeleteVehicleTypeMutation = () => {
  return useMutation<unknown, Error, string>({
    mutationKey: ["delete-vehicle-type"],
    mutationFn: (id: string) => vehicleService.deleteVehicleType(id),
  });
};
