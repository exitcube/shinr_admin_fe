export type CustomerFormValues = {
    name: string;
    email: string;
    mobile: string;
    lastActive: Date;
    registeredOn: Date;
    isBlocked: boolean;
}

export interface CustomerListResponse {
    success: boolean,
    data: [
        {
            id: number,
            name: string,
            mobile: string,
            email: string,
            lastActive: string,
            registeredOn: string,
            isBlocked: boolean
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

export interface CustomerListPayload {
    lastActive?: string;
    page?: number;
    limit?: number;
}

export interface SingleCustomerResponse {
    success: boolean,
    data: {
        id: number,
        name: string,
        mobile: string,
        email: string,
        lastActive: string,
        registeredOn: string,
    },
    message: string
}
