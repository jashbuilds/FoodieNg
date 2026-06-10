import { Component, inject, viewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ItemList } from '../../../Models/restaurant.model';
import { TooltipDirective } from "../../../Directives/tooltip.directive";
import { ToastDirective } from '../../../Directives/toast.directive';
import { RestaurantService } from '../../../Services/restaurant.service';

@Component({
  selector: 'app-display-items',
  imports: [CurrencyPipe, TooltipDirective, ToastDirective],
  templateUrl: './display-items.component.html',
  styleUrl: './display-items.component.css'
})
export class DisplayItemsComponent {

  toast = viewChild(ToastDirective)
  restaurantService = inject(RestaurantService)
  availableItems = this.restaurantService.addedItems

  /* helper function to add items to Menu */
  addToMenu(newItem: ItemList) {
    this.restaurantService.menuItems.update(items => {
      const exists = items.some(item => item.itemName === newItem.itemName)

      if(exists) return items

      return [...items, newItem]
    })

    this.toast()?.show()
  }
}
