import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

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

    private apiUrl = `${environment.apiUrl}/auth/login`;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    login(username: string, password: string): Observable<boolean> {
        return this.http
            .post<{ token: string }>(this.apiUrl, { username, password })
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
