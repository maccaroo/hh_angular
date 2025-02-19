import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataSourceDetailComponent } from './data-source-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { DataSourceService } from '../../core/services/data-source.service';
import { DataPointService } from '../../core/services/data-point.service';

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
