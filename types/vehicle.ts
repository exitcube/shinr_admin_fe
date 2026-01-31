export interface IVehicleBrandAndTypeResponse {
  data: [{ name: string; id: string }];
  pagination: {
    page: 1;
    limit: 10;
    total: 0;
    pages: 0;
    hasNext: false;
    hasPrev: false;
  };
}

export interface CreateVehicleBody {
  model: string;
  makeId: string;
  categoryId: string;
}

export interface ListVehicleModelsBody {
  search: string;
  searchBrandId: number[];
  searchVehicleTypeId: number[];
}

export interface IVehicleModelsListingResponse {
  data: [{ model: string; id: string; make: string; category: string }];
  pagination: {
    page: 1;
    limit: 10;
    total: 0;
    pages: 0;
    hasNext: false;
    hasPrev: false;
  };
}

export interface IVehicleBrandandTypeListingResponse {
  success: true;
  data: [
    {
      ListedBrands?: number;
      ListedVehicleTypes?:number;
    },
    [
      {
        id: number;
        name: string;
        numberOfVehicle: number;
      },
    ],
  ];
  pagination: {
    page: 1;
    limit: 10;
    total: 4;
    pages: 1;
    hasNext: false;
    hasPrev: false;
  };
}
