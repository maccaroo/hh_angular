import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate() {
        return this.authService.isAuthenticated$.pipe(
            map((isAuthenticated) => {
                if (!isAuthenticated) {
                    const storedToken = localStorage.getItem('authToken');
                    if (storedToken) {
                        return true;
                    } else {
                        this.router.navigate(['/login']);
                        return false;
                    }
                }
                return true;
            }),
        );
    }
}
