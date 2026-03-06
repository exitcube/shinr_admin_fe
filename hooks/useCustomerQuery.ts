import { CustomerService } from "@/services/customer";
import { CustomerListResponse, SingleCustomerResponse } from "@/types/customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const customerService = new CustomerService();

export const useCustomerList = (queryParams?: URLSearchParams) => {
  return useQuery<CustomerListResponse>({
    queryKey: ["customer-list"],
    queryFn: () => customerService.getCustomerUserList(queryParams),
  });
};

export const useSingleCustomer = (id?: string) => {
  return useQuery<SingleCustomerResponse>({
    queryKey: [`single-customer-${id}`],
    queryFn: () => customerService.getSingleCustomerUser(id!),
  });
};

export const useBlockCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationKey: ["block-customer"],
    mutationFn: (id: string) => customerService.blockCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-list"] });
      toast.success("Customer blocked successfully");
    },
    onError: () => {
      toast.error("Customer block failed");
    },
  });
};


