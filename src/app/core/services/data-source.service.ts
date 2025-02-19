import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PagedResponse } from '../models/paged-response';
import { DataSource } from '../models/data-source';

@Injectable({
    providedIn: 'root',
})
export class DataSourceService {
    constructor(private http: HttpClient) {}

    addDataSource(
        dataSource: Omit<DataSource, 'id' | 'createdAt' | 'createdByUserId'>,
    ): Observable<DataSource> {
        return this.http.post<DataSource>(
            `${environment.apiUrl}/datasources`,
            dataSource,
        );
    }

    getDataSources(
        offset: number = 0,
        limit: number = 10,
    ): Observable<PagedResponse<DataSource>> {
        return this.http.get<PagedResponse<DataSource>>(
            `${environment.apiUrl}/datasources`,
            { params: { offset, limit } },
        );
    }

    getDataSource(id: number): Observable<DataSource> {
        return this.http.get<DataSource>(
            `${`${environment.apiUrl}/datasources`}/${id}`,
        );
    }
}
