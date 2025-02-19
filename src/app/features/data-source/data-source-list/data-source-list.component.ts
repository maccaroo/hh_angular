import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceService } from '@core/services/data-source.service';
import { Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { MatCardModule } from '@angular/material/card';
import { DataSourceSummary } from '@core/models/data-source-summary';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';

interface DataSourceWithSummary {
    id: number;
    name: string;
    description: string;
    summary?: DataSourceSummary;
}

@Component({
    selector: 'app-data-source-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        PaginationComponent,
        MatToolbar,
        MatCardModule,
        MatButtonModule,
        BackButtonComponent,
    ],
    template: `
        <mat-toolbar color="primary">
            <span>Data Sources</span>
        </mat-toolbar>

        <div class="container">
            <div class="actions">
                <app-back-button></app-back-button>
                <a
                    mat-raised-button
                    color="accent"
                    routerLink="/data-sources/add"
                    >+ Add New Data Source</a
                >
            </div>

            <div class="card-grid">
                @if (dataSourcesWithSummary.length > 0) {
                    @for (
                        dataSourceWithSummary of dataSourcesWithSummary;
                        track dataSourceWithSummary
                    ) {
                        <mat-card
                            class="data-source-card"
                            (click)="navigateToDetail(dataSourceWithSummary.id)"
                        >
                            <mat-card-title>{{
                                dataSourceWithSummary.name
                            }}</mat-card-title>
                            <mat-card-content>
                                <p>
                                    {{
                                        dataSourceWithSummary.description
                                            | slice: 0 : 100
                                    }}...
                                </p>
                                <p class="data-summary">
                                    <strong>Data Points:</strong>
                                    {{
                                        dataSourceWithSummary.summary
                                            ?.dataPointsCount
                                    }}
                                    <br />
                                    <strong>Last Added:</strong>
                                    @if (
                                        dataSourceWithSummary.summary
                                            ?.dataPointsLastAdded
                                    ) {
                                        {{
                                            dataSourceWithSummary.summary
                                                ?.dataPointsLastAdded
                                                | date: 'shortDate'
                                        }}
                                    } @else {
                                        No Data
                                    }
                                </p>
                            </mat-card-content>
                        </mat-card>
                    }
                } @else {
                    <p>No data sources available.</p>
                }
            </div>

            <div class="pagination-wrapper">
                <app-pagination
                    [currentPage]="currentPage"
                    [totalPages]="totalPages"
                    (pageChange)="onPageChange($event)"
                >
                </app-pagination>
            </div>
        </div>
    `,
    styleUrls: ['./data-source-list.component.scss'],
})
export class DataSourceListComponent implements OnInit {
    dataSourcesWithSummary: DataSourceWithSummary[] = [];
    total = 0;
    pageSize = 10;
    currentPage = 1;

    get totalPages(): number {
        return Math.ceil(this.total / this.pageSize);
    }

    constructor(
        private dataSourceService: DataSourceService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadDataSources();
    }

    loadDataSources(): void {
        const offset = (this.currentPage - 1) * this.pageSize;
        this.dataSourceService
            .getDataSources(offset, this.pageSize)
            .subscribe((pagedResponse) => {
                let dataSourcesWithSummary: DataSourceWithSummary[] =
                    pagedResponse.data.map((ds) => ({
                        ...ds,
                        summary: undefined,
                    }));
                dataSourcesWithSummary.forEach((ds) => {
                    this.dataSourceService
                        .getDataSourceSummary(ds.id)
                        .subscribe((summary) => {
                            ds.summary = summary;
                        });
                });
                this.dataSourcesWithSummary = dataSourcesWithSummary;
                this.total = pagedResponse.total;
            });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadDataSources();
    }

    navigateToDetail(dataSourceId: number): void {
        this.router.navigate(['/data-sources', dataSourceId]);
    }
}
