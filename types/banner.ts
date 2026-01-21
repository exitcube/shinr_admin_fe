export interface IBannerResponse {
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