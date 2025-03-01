import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
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
