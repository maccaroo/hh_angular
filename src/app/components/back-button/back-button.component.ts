import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-back-button',
    imports: [MatButtonModule],
    template: `
        <button mat-raised-button color="accent" (click)="goBack()">
            ← Back
        </button>
    `,
})
export class BackButtonComponent {
    goBack(): void {
        window.history.back();
    }
}
