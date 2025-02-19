export interface PagedResponse<T> {
    offset: number;
    limit: number;
    total: number;
    data: T[];
}
