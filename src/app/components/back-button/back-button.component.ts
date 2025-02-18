import { Component } from "@angular/core";

@Component({
    selector: 'app-back-button',
    template: `
        <button (click)="goBack()">Go back</button>
    `
})
export class BackButtonComponent {

    goBack(): void {
        window.history.back();
    }
}
