import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
    ],
    template: `
        <mat-toolbar color="primary">
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
                <button mat-menu-item (click)="logout()">
                    <mat-icon>logout</mat-icon>Logout
                </button>
            </mat-menu>
        </mat-toolbar>
    `,
    styles: ``,
})
export class NavigationComponent {
    constructor(private authService: AuthService) {}

    logout(): void {
        this.authService.logout();
    }
}
