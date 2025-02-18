export interface DataSource {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdByUserId: number;
    dataType: 'string' | 'numeric';
}