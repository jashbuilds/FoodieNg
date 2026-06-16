import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RestaurantService } from '../Services/restaurant.service';

export const authGuard: CanActivateFn = () => {
  const restaurantService = inject(RestaurantService);
  const router = inject(Router)
  if(restaurantService.menuItems().length === 0) {
    window.alert("Please add items to menu to access Menu items!")
    router.navigate(['/home'])
    return false
  }
  return true
};
