import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private token: string | null = null;

    private apiUrl = `${environment.apiUrl}/auth/login`;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
            map(response => {
                if (response.token) {
                    this.token = response.token;
                    this.isAuthenticatedSubject.next(true);
                    return true;
                } else {
                    this.isAuthenticatedSubject.next(false);
                    return false;
                }
            })
        )
    }

    logout(): void {
        this.token = null;
        this.isAuthenticatedSubject.next(false);
    }

    getToken(): string | null {
        return this.token;
    }
}
