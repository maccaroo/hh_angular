import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { DataPointService } from '@core/services/data-point.service';
import { DataSourceService } from '@core/services/data-source.service';
import { DataSourceDetailComponent } from '@features/data-source/data-source-detail/data-source-detail.component';
import { of } from 'rxjs';

describe('DataSourceDetailComponent', () => {
    let component: DataSourceDetailComponent;
    let fixture: ComponentFixture<DataSourceDetailComponent>;
    let dataSourceServiceSpy: jasmine.SpyObj<DataSourceService>;
    let dataPointServiceSpy: jasmine.SpyObj<DataPointService>;

    beforeEach(async () => {
        dataSourceServiceSpy = jasmine.createSpyObj('DataSourceService', [
            'getDataSource',
        ]);
        dataPointServiceSpy = jasmine.createSpyObj('DataPointService', [
            'getDataPoints',
        ]);

        dataSourceServiceSpy.getDataSource.and.returnValue(
            of({
                id: 1,
                name: 'Test Data Source',
                description: 'This is a test data source',
                createdAt: new Date().toISOString(),
                createdByUserId: 1,
                dataType: 'string',
            }),
        );
        dataPointServiceSpy.getDataPoints.and.returnValue(
            of({
                offset: 0,
                limit: 10,
                total: 0,
                data: [],
            }),
        );

        await TestBed.configureTestingModule({
            imports: [DataSourceDetailComponent],
            providers: [
                provideHttpClient(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ id: '1' }),
                        },
                    },
                },
                { provide: DataSourceService, useValue: dataSourceServiceSpy },
                { provide: DataPointService, useValue: dataPointServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DataSourceDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data source details on init', () => {
        expect(component.dataSource).toBeDefined();
    });
});
