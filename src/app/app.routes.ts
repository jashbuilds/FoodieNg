import { Routes } from '@angular/router';
import { RestaurantComponent } from './Components/restaurant/restaurant.component';
import { TodaysMenuComponent } from './Components/todays-menu/todays-menu.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: RestaurantComponent, canActivate: [authGuard] },
    { path: 'todaysMenu', component: TodaysMenuComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
