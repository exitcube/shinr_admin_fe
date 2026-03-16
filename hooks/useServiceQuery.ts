import { Service } from "@/services/service";
import {
  IServiceResponse,
  ServiceListPayload,
  ServiceListResponse,
  SingleServiceResponse,
} from "@/types/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



const service = new Service();

export const useServiceCategory = () => {
  return useQuery<IServiceResponse>({
    queryKey: ["service-category"],
    queryFn: () => service.getServiceCategories(),
  });
};

export const useServiceList = (payload?: ServiceListPayload) => {
  return useQuery<ServiceListResponse>({
    queryKey: ["service-list", payload],
    queryFn: () => service.getServiceList(payload),
  });
};

export const useCreateServiceMutation = () => {
    return useMutation<unknown, Error, FormData>({
        mutationKey: ["create-service"],
        mutationFn: (payload) => service.createService(payload),
    });
};

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
    return useMutation<unknown, Error, string>({
        mutationKey: ["delete-service"],
        mutationFn: (id:string) => service.deleteService(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["service-list"] });
          toast.success("Service deleted successfully");
        },
        onError: () => {
          toast.error("Service deleted failed");
        },
    });
};

export const useEditServiceMutation = () => {
  const queryClient = useQueryClient();
    return useMutation<unknown, Error, FormData>({
        mutationKey: ["edit-service"],
        mutationFn: (payload:FormData) => service.editService(payload),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["service-list"] });
          toast.success("Service edited successfully");
        },
        onError: () => {
          toast.error("Service edited failed");
        },
    });
};

export const useSingleService = (id?: string) => {
  return useQuery<SingleServiceResponse>({
    queryKey: [`single-service-${id}`],  
    queryFn: () => service.singleService(id!),
  });
};
