import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <h1>Home Historian</h1>
        <p>Manage your data sources and data points.</p>
        <a routerLink="/data-sources">View Data Sources</a>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
