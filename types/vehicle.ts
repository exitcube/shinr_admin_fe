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
  page?: number;
  limit?: number;
}

export interface IVehicleModelsListingResponse {
  data: [{ model: string; id: string; make: string; category: string; tier?: string }];
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
        tier?: string;
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

export interface CreateVehicleBrandBody {
  name: string;
  tier?: string;
}

export interface CreateVehicleTypeBody {
  name: string;
} 


export interface editVehicleBody {
  model?: string;
  makeId?: number;
  categoryId?: number;
}

export interface editBrandBody {
  vehicleTypeId: number;
  name?: string;
  tier?: string;
}

export interface editTypeBody {
  name?: string;
}

export interface IVehicleTierResponse {
    data: [{ displayName: string, value: string }],
    pagination: {
        page: number,
        limit: number,
        total: number,
        pages: number,
        hasNext: boolean,
        hasPrev: boolean
    }
}
