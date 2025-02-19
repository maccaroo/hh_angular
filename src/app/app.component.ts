import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavigationComponent],
    template: `
        @if (showNavigation) {
            <app-navigation></app-navigation>
        }
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    showNavigation: boolean = true;

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.showNavigation = event.url !== '/login';
            });
    }
}
