import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideRouter } from '@angular/router';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAnimationsAsync(),
        importProvidersFrom(
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            MatCardModule,
        ),
    ],
};
