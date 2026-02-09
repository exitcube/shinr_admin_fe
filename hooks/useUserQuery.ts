import { UserService } from "@/services/user";
import { AdminUserListResponse, CreateAdminUserBody, editAdminUserBody, EditAdminUserVars, IUserRolesResponse, SingleAdminUserResponse } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const userService=new UserService();

export const useUserRolesListQuery = () => {
    return useQuery<IUserRolesResponse>({
        queryKey: ["user-roles-list"],
        queryFn: () => userService.getUserRoles(),
    });
}

export const useCreateAdminUserMutation = () => {
    const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateAdminUserBody>({
    mutationKey: ["create-admin-user"],
    mutationFn: (payload) => userService.createAdminUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-list"] });
      toast.success("User created successfully");
    },
    onError: () => {
      toast.error("User created failed");
    },
  });
};

export const useAdminUserList = (queryParams?: URLSearchParams) => {
  return useQuery<AdminUserListResponse>({
    queryKey: ["admin-user-list"],
    queryFn: () => userService.getAdminUserList(queryParams),
  });
};

export const useDeleteAdminUserMutation = () => {
    const queryClient = useQueryClient();
  return useMutation<unknown, Error, URLSearchParams>({
    mutationKey: ["delete-admin-user"],
    mutationFn: (queryParams: URLSearchParams) => userService.deleteAdminUser(queryParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-list"] });
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("User deleted failed");
    },
  });
};

export const useEditAdminUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, EditAdminUserVars>({
    mutationKey: ["edit-admin-user"],
    mutationFn: ({ adminId, body }) => {
      const params = new URLSearchParams({ adminId });
      return userService.editAdminUser(body, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-list"] });
      toast.success("User edited successfully");
    },
    onError: () => {
      toast.error("User edited failed");
    },
  });
};

export const useSingleAdminUser = (id?: string) => {
  return useQuery<SingleAdminUserResponse>({
    queryKey: [`single-adminuser-${id}`],
    queryFn: () => userService.getSingleAdminUser(id!),
  });
};