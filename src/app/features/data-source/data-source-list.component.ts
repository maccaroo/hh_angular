import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceService } from '../../core/services/data-source.service';
import { RouterModule } from '@angular/router';
import { DataSource } from '../../core/models/data-source';
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";


@Component({
    selector: 'app-data-source-list',
    standalone: true,
    imports: [CommonModule, RouterModule, BackButtonComponent, PaginationComponent],
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

            <app-pagination [currentPage]="currentPage" [totalPages]="totalPages" (pageChange)="onPageChange($event)"></app-pagination>
        } @else {
            <p>No data sources available.</p>
        }
        <app-back-button></app-back-button>
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
}
