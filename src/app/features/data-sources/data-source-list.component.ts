import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceService } from '../../core/services/data-source.service';
import { RouterModule } from '@angular/router';
import { DataSource } from '../../core/models/data-source';


@Component({
    selector: 'app-data-source-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <h2>Data Sources</h2>
        <a routerLink="/data-sources/add">Add New Data Source</a>

        @if (dataSources.length > 0) {
            <ul>
                @for (dataSource of dataSources; track dataSource){
                    <li>
                        <strong>{{ dataSource.name }}</strong> - {{ dataSource.description }}
                        <a [routerLink]="['/data-sources', dataSource.id]">View Details</a>
                    </li>
                }
            </ul>

            <div class="pagination-controls">
                <button (click)="onPageChange(currentPage - 1)" [disabled]="currentPage === 1">Previous</button>
                Page {{ currentPage }} of {{ totalPages }}
                <button (click)="onPageChange(currentPage + 1)" [disabled]="currentPage === totalPages">Next</button>
            </div>
        } @else {
            <p>No data sources available.</p>
        }
        <button (click)="goBack()">Go Back</button>
    `,
    styleUrls: ['./data-source-list.component.scss']
})
export class DataSourceListComponent implements OnInit {
    dataSources: DataSource[] = [];
    total = 0;
    pageSize = 10;
    currentPage = 1;

    get totalPages(): number {
        return Math.ceil(this.total / this.pageSize);
    }

    constructor(private dataSourceService: DataSourceService) { }

    ngOnInit(): void {
        this.loadDataSources();
    }

    loadDataSources(): void {
        const offset = (this.currentPage - 1) * this.pageSize;
        this.dataSourceService.getDataSources(offset, this.pageSize).subscribe(pagedResponse => {
            this.dataSources = pagedResponse.data;
            this.total = pagedResponse.total;
        });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadDataSources();
    }

    goBack(): void {
        window.history.back();
    }
}
