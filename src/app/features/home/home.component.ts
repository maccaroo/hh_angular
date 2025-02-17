import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <h1>Welcome to the Home Page</h1>
        <p>This is the main dashboard after login</p>
        <a routerLink="/data-sources">View Data Sources</a>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
