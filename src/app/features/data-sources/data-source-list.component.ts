import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceService, DataSource } from '../../core/services/data-source.service';
import { RouterModule } from '@angular/router';

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
                    </li>
                }
            </ul>
        } @else {
            <p>No data sources available.</p>
        }
    `,
    styleUrls: ['./data-source-list.component.scss']
})
export class DataSourceListComponent implements OnInit {
    dataSources: DataSource[] = [];

    constructor(private dataSourceService: DataSourceService) { }

    ngOnInit(): void {
        this.dataSourceService.getDataSources().subscribe(data => {
            this.dataSources = data
        });
    }
}
