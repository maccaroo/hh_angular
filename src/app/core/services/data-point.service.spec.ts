import { TestBed } from '@angular/core/testing';
import { DataPointService } from '@core/services/data-point.service';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PagedResponse } from '@core/models/paged-response';
import { DataPoint } from '@core/models/data-point';
import { environment } from '@environments/environment';

describe('DataPointService', () => {
    let service: DataPointService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DataPointService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });
        service = TestBed.inject(DataPointService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch data points', () => {
        const mockResponse: PagedResponse<DataPoint> = {
            offset: 0,
            limit: 5,
            total: 1,
            data: [
                {
                    id: 1,
                    dataSourceId: 1,
                    createdAt: new Date().toISOString(),
                    value: 'test',
                },
            ],
        };
        service.getDataPoints(1, 0, 5).subscribe((response) => {
            expect(response.data.length).toBe(1);
            expect(response.total).toBe(1);
            expect(response.data[0].value).toBe('test');
        });

        const req = httpMock.expectOne(
            `${environment.apiUrl}/datasources/1/datapoints?offset=0&limit=5`,
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    afterEach(() => {
        httpMock.verify();
    });
});
