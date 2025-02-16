import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private token: string | null = null;

    login(username: string, password: string): Observable<boolean> {
        // Simulate an API call for authentication
        if (username == 'admin' && password == 'password') {
            this.token = 'dummy-token'; // TODO: Replace with real token from the API
            this.isAuthenticatedSubject.next(true);
            return this.isAuthenticated$;
        } else {
            this.isAuthenticatedSubject.next(false);
            return this.isAuthenticated$;
        }
    }

    logout(): void {
        this.token = null;
        this.isAuthenticatedSubject.next(false);
    }

    getToken(): string | null {
        return this.token;
    }
}