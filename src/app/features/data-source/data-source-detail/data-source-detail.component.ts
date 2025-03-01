import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { DataPoint } from '@core/models/data-point';
import { DataSource } from '@core/models/data-source';
import { DataPointService } from '@core/services/data-point.service';
import { DataSourceService } from '@core/services/data-source.service';

@Component({
    selector: 'app-data-source-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        BackButtonComponent,
        PaginationComponent,
        MatToolbar,
    ],
    template: `
        <mat-toolbar color="primary">
            <span>Data Source Detail</span>
        </mat-toolbar>

        <div class="container">
            <div class="actions">
                <app-back-button></app-back-button>
            </div>
            @if (dataSource) {
                <p><strong>Name:</strong> {{ dataSource.name }}</p>
                <p>
                    <strong>Description:</strong> {{ dataSource.description }}
                </p>
                <p><strong>Data Type:</strong> {{ dataSource.dataType }}</p>
                <p><strong>Created At:</strong> {{ dataSource.createdAt }}</p>

                <h3>Data Points</h3>
                @if (dataPoints) {
                    <ul>
                        @for (dataPoint of dataPoints; track dataPoint) {
                            <li>
                                {{ dataPoint.createdAt | date: 'short' }}:
                                {{ dataPoint.value }}
                            </li>
                        }
                    </ul>

                    <app-pagination
                        [currentPage]="currentPage"
                        [totalPages]="totalPages"
                        (pageChange)="onPageChange($event)"
                    ></app-pagination>
                } @else {
                    <p>No data points found for this data source.</p>
                }
            } @else {
                <p>Loading data source details...</p>
            }
        </div>
        >
    `,
    styleUrls: ['./data-source-detail.component.scss'],
})
export class DataSourceDetailComponent implements OnInit {
    dataSource!: DataSource;
    dataPoints: DataPoint[] = [];
    total = 0;
    pageSize = 10;
    currentPage = 1;

    get totalPages(): number {
        return Math.ceil(this.total / this.pageSize);
    }

    constructor(
        private route: ActivatedRoute,
        private dataSourceService: DataSourceService,
        private dataPointService: DataPointService,
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.dataSourceService.getDataSource(id).subscribe((dataSource) => {
            this.dataSource = dataSource;
            this.loadDataPoints();
        });
    }

    loadDataPoints(): void {
        const offset = (this.currentPage - 1) * this.pageSize;
        this.dataPointService
            .getDataPoints(this.dataSource.id, offset, this.pageSize)
            .subscribe((pagedResponse) => {
                this.dataPoints = pagedResponse.data;
                this.total = pagedResponse.total;
            });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadDataPoints();
    }
}
