import { Routes } from '@angular/router';
import { RestaurantComponent } from './Components/restaurant/restaurant.component';
import { TodaysMenuComponent } from './Components/todays-menu/todays-menu.component';

export const routes: Routes = [
    { path: 'home', component: RestaurantComponent },
    { path: 'todaysMenu', component: TodaysMenuComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
