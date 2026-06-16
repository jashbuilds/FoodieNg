import { Routes } from '@angular/router';
import { RestaurantComponent } from './Components/restaurant/restaurant.component';
import { authGuard } from './Guards/auth.guard';
import { validationGuard } from './Guards/validation.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: RestaurantComponent,
        canDeactivate: [validationGuard],
    },
    {
        path: 'todaysMenu',
        canActivate: [authGuard],
        loadComponent: () => import('./Components/todays-menu/todays-menu.component').then(m => m.TodaysMenuComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./Components/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
