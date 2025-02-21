import { InjectionToken } from '@angular/core';
import { environment } from '@environments/environment';

export interface AppConfig {
    apiUrl: string;
    production: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
    providedIn: 'root',
    factory: () => environment,
});
