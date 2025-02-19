import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
        <mat-toolbar color="primary">
            <span>Home Historian</span>
            <span class="spacer"></span>

            <button mat-button class="menu-button" [matMenuTriggerFor]="menu">
                <mat-icon>menu</mat-icon>Menu
            </button>

            <mat-menu #menu="matMenu">
                <button mat-menu-item routerLink="/home">
                    <mat-icon>home</mat-icon>Home
                </button>
                <button mat-menu-item routerLink="/data-sources">
                    <mat-icon>storage</mat-icon>Data Sources
                </button>
            </mat-menu>
        </mat-toolbar>

        <div class="content">
            <h1>Welcome to Home Historian</h1>
            <p>Manage your home data and devices.</p>
        </div>
    `,
    styleUrls: ['./home.component.scss'],
    imports: [
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
    ],
})
export class HomeComponent {}
