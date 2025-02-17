import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


export interface DataSource {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdByUserId: number;
    dataType: 'string' | 'numeric';
}

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {
    private apiUrl = `${environment.apiUrl}/datasources`;

    constructor(private http: HttpClient) { }

    addDataSource(dataSource: Omit<DataSource, 'id' | 'createdAt' | 'createdByUserId'>): Observable<DataSource> {
      return this.http.post<DataSource>(this.apiUrl, dataSource);
    }

    getDataSources(): Observable<DataSource[]> {
        return this.http.get<DataSource[]>(this.apiUrl);
    }
}
