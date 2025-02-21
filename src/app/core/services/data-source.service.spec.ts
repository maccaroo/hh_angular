import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataSource } from '@core/models/data-source';
import { PagedResponse } from '@core/models/paged-response';
import { DataSourceService } from '@core/services/data-source.service';
import { environmentMock } from '@environments/environment.mock';
import { APP_CONFIG } from 'app/config/app.config.token';

describe('DataSourceService', () => {
    let service: DataSourceService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DataSourceService,
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: APP_CONFIG, useValue: environmentMock },
            ],
        });
        service = TestBed.inject(DataSourceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch data sources', () => {
        const mockResponse: PagedResponse<DataSource> = {
            offset: 0,
            limit: 5,
            total: 1,
            data: [
                {
                    id: 1,
                    name: 'Test Data Source',
                    description: 'This is a test data source',
                    createdAt: new Date().toISOString(),
                    createdByUserId: 1,
                    dataType: 'string',
                },
            ],
        };

        service.getDataSources(0, 5).subscribe((response) => {
            expect(response.data.length).toBe(1);
            expect(response.total).toBe(1);
            expect(response.data[0].name).toBe('Test Data Source');
        });

        const req = httpMock.expectOne(
            `${environmentMock.apiUrl}/datasources?offset=0&limit=5`,
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    afterEach(() => {
        httpMock.verify();
    });
});
