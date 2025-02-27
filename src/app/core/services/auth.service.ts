import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from 'app/config/app.config.token';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_TOKEN = 'authToken';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.hasValidToken(),
    );
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private token: string | null = null;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(APP_CONFIG) private config: AppConfig,
    ) {}

    login(username: string, password: string): Observable<boolean> {
        let loginUrl = `${this.config.apiUrl}/auth/login`;
        return this.http
            .post<{ token: string }>(loginUrl, { username, password })
            .pipe(
                map((response) => {
                    if (response.token) {
                        this.token = response.token;
                        localStorage.setItem(AUTH_TOKEN, response.token);
                        this.isAuthenticatedSubject.next(true);
                        return true;
                    } else {
                        this.isAuthenticatedSubject.next(false);
                        return false;
                    }
                }),
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem(AUTH_TOKEN);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return this.token;
    }

    private hasValidToken(): boolean {
        return !!localStorage.getItem(AUTH_TOKEN);
    }

    private getStoredToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN);
    }
}
