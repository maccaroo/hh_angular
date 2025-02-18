import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PagedResponse } from '../models/paged-response';
import { DataPoint } from '../models/data-point';


@Injectable({
    providedIn: 'root'
})
export class DataPointService {
    constructor(private http: HttpClient) { }

    getDataPoints(dataSourceId: number, offset: number = 0, limit: number = 10): Observable<PagedResponse<DataPoint>> {
        return this.http.get<PagedResponse<DataPoint>>(`${environment.apiUrl}/datasources/${dataSourceId}/datapoints`, { params: { offset, limit } });
    }
}