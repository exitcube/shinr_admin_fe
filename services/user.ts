import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import {
  AdminUserListResponse,
  CreateAdminUserBody,
  editAdminUserBody,
  IUserRolesResponse,
} from "@/types/user";

export class UserService {
  getUserRoles = async (
    queryParams?: URLSearchParams,
  ): Promise<IUserRolesResponse> => {
    const url = queryParams
      ? `/admin/list-adminusers-roles?${queryParams}`
      : "/admin/list-adminusers-roles";
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  createAdminUser = async (payload: CreateAdminUserBody) => {
    const url = "/admin/createadminuser";

    try {
      const res = await API.post(url, payload);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  getAdminUserList = async (
    queryParams?: URLSearchParams,
  ): Promise<AdminUserListResponse> => {
    const url = queryParams
      ? `/admin/adminusers-listing?${queryParams}`
      : "/admin/adminusers-listing";
    try {
      const res = await API.post(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  deleteAdminUser = async (queryParams?: URLSearchParams) => {
    const url = `/admin/delete-adminuser?${queryParams}`;
    try {
      const res = await API.post(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  editAdminUser = async (
    payload: editAdminUserBody,
    queryParams: URLSearchParams,
  ) => {
    try {
      const res = await API.put(
        `/admin/edit-adminuser?${queryParams.toString()}`,
        payload,
      );
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  getSingleAdminUser = async (id:string) => {
    const url = `/admin/single-adminuser/${id}`;
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };
}
