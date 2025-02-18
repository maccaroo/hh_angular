import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './features/auth/login.component';
import { HomeComponent } from './features/home/home.component';
import { DataSourceListComponent } from './features/data-sources/data-source-list.component';
import { AddDataSourceComponent } from './features/data-sources/add-data-source.component';
import { DataSourceDetailComponent } from './features/data-sources/data-source-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'data-sources', component: DataSourceListComponent, canActivate: [AuthGuard]},
    { path: 'data-sources/add', component: AddDataSourceComponent, canActivate: [AuthGuard] },
    { path: 'data-sources/:id', component: DataSourceDetailComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
