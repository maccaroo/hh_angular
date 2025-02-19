import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    template: `
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <label for="username"> Username:</label>
            <input id="username" formControlName="username" required />

            <label for="password">Password</label>
            <input
                id="password"
                type="password"
                formControlName="password"
                required
            />

            <button type="submit">Login</button>
            <p *ngIf="error">{{ error }}</p>
        </form>
    `,
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        const { username, password } = this.loginForm.value;
        this.authService.login(username, password).subscribe((success) => {
            if (success) {
                this.router.navigate(['/home']);
            } else {
                this.error = 'Invalid credentials';
            }
        });
    }
}
