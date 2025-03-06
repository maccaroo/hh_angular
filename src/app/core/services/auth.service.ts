import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from 'app/config/app.config.token';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse, RefreshTokenRequest, RevokeTokenRequest } from '@core/models/auth.model';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const TOKEN_EXPIRY = 'tokenExpiry';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.hasValidToken(),
    );
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private refreshInProgress = false;
    private refreshTokenTimeout: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(APP_CONFIG) private config: AppConfig,
    ) {
        this.startRefreshTokenTimer();
    }

    login(username: string, password: string): Observable<boolean> {
        const loginUrl = `${this.config.apiUrl}/auth/login`;
        return this.http
            .post<AuthResponse>(loginUrl, { username, password })
            .pipe(
                map((response) => {
                    if (response.accessToken) {
                        this.setSession(response);
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
        // Optionally revoke the refresh token on the server
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
            const request: RevokeTokenRequest = { refreshToken };
            this.http.post(`${this.config.apiUrl}/auth/revoke`, request)
                .pipe(
                    catchError(error => {
                        console.error('Error revoking token', error);
                        return throwError(() => error);
                    })
                )
                .subscribe();
        }

        this.clearSession();
        this.stopRefreshTokenTimer();
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    refreshToken(): Observable<AuthResponse> {
        if (this.refreshInProgress) {
            return throwError(() => new Error('Refresh already in progress'));
        }

        this.refreshInProgress = true;
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        if (!accessToken || !refreshToken) {
            this.clearSession();
            this.isAuthenticatedSubject.next(false);
            return throwError(() => new Error('No tokens available'));
        }

        const request: RefreshTokenRequest = {
            accessToken,
            refreshToken
        };

        return this.http.post<AuthResponse>(`${this.config.apiUrl}/auth/refresh`, request)
            .pipe(
                tap(response => {
                    this.setSession(response);
                    this.refreshInProgress = false;
                }),
                catchError(error => {
                    this.clearSession();
                    this.isAuthenticatedSubject.next(false);
                    this.refreshInProgress = false;
                    return throwError(() => error);
                })
            );
    }

    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    private setSession(authResult: AuthResponse): void {
        // Set expiry time
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + authResult.expiresIn);

        localStorage.setItem(ACCESS_TOKEN, authResult.accessToken);
        localStorage.setItem(REFRESH_TOKEN, authResult.refreshToken);
        localStorage.setItem(TOKEN_EXPIRY, expiresAt.toISOString());

        this.startRefreshTokenTimer();
    }

    private clearSession(): void {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(TOKEN_EXPIRY);
    }

    private hasValidToken(): boolean {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const expiry = localStorage.getItem(TOKEN_EXPIRY);
        
        if (!token || !expiry) {
            return false;
        }
        
        return new Date() < new Date(expiry);
    }

    private startRefreshTokenTimer(): void {
        const expiry = localStorage.getItem(TOKEN_EXPIRY);
        if (!expiry) {
            return;
        }

        const expiryDate = new Date(expiry);
        const timeout = expiryDate.getTime() - Date.now() - (60 * 1000); // Refresh 1 minute before expiry
        
        if (timeout <= 0) {
            // Token already expired or about to expire, refresh immediately
            this.refreshToken().subscribe();
            return;
        }

        this.refreshTokenTimeout = setTimeout(() => {
            this.refreshToken().subscribe();
        }, timeout);
    }

    private stopRefreshTokenTimer(): void {
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
}
