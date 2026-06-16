import { CanDeactivateFn } from '@angular/router';
import { RestaurantComponent } from '../Components/restaurant/restaurant.component';

export const validationGuard: CanDeactivateFn<RestaurantComponent> = (component) => {
  const form = component.addItemComp()?.form
  if (form?.invalid && form?.dirty) {
    return window.confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};
