import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { DataSourceService } from '@core/services/data-source.service';
import { DataSourceListComponent } from '@features/data-source/data-source-list/data-source-list.component';
import { of } from 'rxjs';

describe('DataSourceListComponent', () => {
    let component: DataSourceListComponent;
    let fixture: ComponentFixture<DataSourceListComponent>;
    let dataSourceServiceSpy: jasmine.SpyObj<DataSourceService>;

    beforeEach(async () => {
        dataSourceServiceSpy = jasmine.createSpyObj('DataSourceService', [
            'getDataSources',
        ]);

        await TestBed.configureTestingModule({
            imports: [DataSourceListComponent],
            providers: [
                provideHttpClient(),
                { provide: DataSourceService, useValue: dataSourceServiceSpy },
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of(convertToParamMap({ id: 1 })) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DataSourceListComponent);
        component = fixture.componentInstance;
        dataSourceServiceSpy.getDataSources.and.returnValue(
            of({
                offset: 0,
                limit: 10,
                total: 0,
                data: [],
            }),
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data sources on init', () => {
        expect(dataSourceServiceSpy.getDataSources).toHaveBeenCalled();
    });

    it('should change page and reload data sources', () => {
        spyOn(component, 'loadDataSources');
        component.onPageChange(2);
        expect(component.currentPage).toBe(2);
        expect(component.loadDataSources).toHaveBeenCalled();
    });
});
