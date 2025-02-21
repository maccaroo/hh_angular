import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

        await TestBed.configureTestingModule({
            imports: [NavigationComponent],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
