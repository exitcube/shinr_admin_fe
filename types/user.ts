export type AdminUserFormValues = {
    name: string;
    email: string;
    role: string;
    joiningDate: Date | undefined;
    pageAccess: string[];
};

export interface IUserRolesResponse {
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

export type CreateAdminUserBody = {
    userName: string;
    email: string;
    newRole: string;
    joiningDate: string | undefined;
};

export interface AdminUserListResponse {
    success: boolean,
    data: [
        {
            id: number,
            userName: string,
            role: string,
            email: string,
            empCode: string,
            joiningDate: string
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
export type editAdminUserBody = {
    userName?: string;
    email?: string;
    newRole?: string;
    joiningDate?: string;
};

export type EditAdminUserVars = {
  adminId: string;
  body: editAdminUserBody;
};

export interface SingleAdminUserResponse {
    success: boolean,
    data: {
        id: number,
        userName: string,
        role: string,
        email: string,
        empCode: string,
        joiningDate: string
    },
    message: string
}
 
