import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>Welcome to the Home Page</h1>
        <p>This is the main dashboard after login</p>
    `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
