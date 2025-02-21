import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from 'app/config/app.config.token';
import { PagedResponse } from '@core/models/paged-response';
import { DataPoint } from '@core/models/data-point';

@Injectable({
    providedIn: 'root',
})
export class DataPointService {
    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private config: AppConfig,
    ) {}

    getDataPoints(
        dataSourceId: number,
        offset: number = 0,
        limit: number = 10,
    ): Observable<PagedResponse<DataPoint>> {
        return this.http.get<PagedResponse<DataPoint>>(
            `${this.config.apiUrl}/datasources/${dataSourceId}/datapoints`,
            {
                params: { offset, limit },
            },
        );
    }
}
