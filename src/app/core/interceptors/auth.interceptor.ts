import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAccessToken();

    // Clone the request with the token if available
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // Process the response
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // Handle 401 Unauthorized errors that aren't for the auth endpoints
            if (
                error.status === 401 &&
                !req.url.includes('/auth/login') &&
                !req.url.includes('/auth/refresh')
            ) {
                // Try to refresh the token
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        // Retry the request with the new token
                        const newToken = authService.getAccessToken();
                        const newReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken}`,
                            },
                        });
                        return next(newReq);
                    }),
                    catchError((refreshError) => {
                        // If refresh fails, log out the user
                        authService.logout();
                        return throwError(() => refreshError);
                    })
                );
            }
            return throwError(() => error);
        })
    );
};
