export interface IServiceResponse {
  data: [{ name: string, id: string }],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false
  }
}

export interface ServiceListResponse {
    success: boolean,
    data: [
        {
            id: number,
            name: string,
            displayName: string,
            status: string,
            imageId: string,
        }
    ],
    pagination: {
        page: number,
        limit: number,
        total: number,
        pages: number,
        hasNext: boolean,
        hasPrev: boolean
    }
}

export type CreateServiceBody = {
    name: string;
    serviceImg?: File;
    displayName: string;
    description: string;
    displaySequence: number;
};

export interface SingleServiceResponse {
    success: boolean,
    data: {
        id: number,
        name: string,
        displayName: string,
        description: string,
        displaySequence: number,
        imageId: string,
    },
    message: string
}
