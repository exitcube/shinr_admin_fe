import API from "@/helper/axios";
import { handleAxiosError } from "@/helper/axiosErrorHandler";
import { CreateVehicleBody, CreateVehicleBrandBody, CreateVehicleTypeBody, ListVehicleModelsBody } from "@/types/vehicle";

export class VehicleService {
  getBrandListing = async (search: string) => {
    const url = search
      ? `/cars/brand-listing/?search=${search}`
      : `/cars/brand-listing/`;
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  getTypeListing = async (queryParams?: URLSearchParams) => {
    const url = queryParams
      ? `/cars/list-vehicle-types?${queryParams}`
      : `/cars/list-vehicle-types`;
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  createVehicle = async (payload: CreateVehicleBody) => {
    try {
      const url = `/cars/add-vehicle`;
      const res = await API.post(url, payload);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  listVehicleModels = async (payload: Partial<ListVehicleModelsBody> = {}) => {
    const { search, ...body } = payload;

    const url = `/cars/vehicle-models-listing`;

    try {
      const res = await API.post(url, body, {
        params: { search },
      });
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  vehicleBrandListing = async (queryParams?: URLSearchParams) => {
    const url = queryParams
      ? `/cars/vehicle-brand-listing?${queryParams}`
      : `/cars/vehicle-brand-listing`;
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  vehicleTypeListing = async (queryParams?: URLSearchParams) => {
    const url = queryParams
      ? `/cars/vehicle-type-listing?${queryParams}`
      : `/cars/vehicle-type-listing`;
    try {
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  addVehicleBrand=async (payload: CreateVehicleBrandBody) => {
    try {
      const url = `/cars/add-brand`;
      const res = await API.post(url, payload);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  addVehicleType=async (payload: CreateVehicleTypeBody) => {
    try {
      const url = `/cars/add-vehicle-types`;
      const res = await API.post(url, payload);
      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };
}
