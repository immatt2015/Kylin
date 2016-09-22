/**
 * Created by whenh on 2016/9/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent }     from './components/heroes.component';
import { DashboardComponent }  from './components/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail.component';

const appRoutes: Routes = [
    { path: 'heroes',     component: HeroesComponent },
    { path: 'dashboard',  component: DashboardComponent},
    { path: 'detail/:id', component: HeroDetailComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);