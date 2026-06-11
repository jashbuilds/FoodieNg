import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { DisplayItemsComponent } from '../restaurant/display-items/display-items.component';
import { RestaurantService } from '../../Services/restaurant.service';
import { CurrencyPipe } from '@angular/common';
import { ToastDirective } from "../../Directives/toast.directive";
import { TooltipDirective } from "../../Directives/tooltip.directive";
import { ItemList } from '../../Models/restaurant.model';
import { SpecialBgColorDirective } from '../../Directives/special-bg-color.directive';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'app-todays-menu',
  imports: [CurrencyPipe, TooltipDirective, ToastDirective, SpecialBgColorDirective, NavigationComponent],
  templateUrl: './todays-menu.component.html',
  styleUrl: './todays-menu.component.css'
})
export class TodaysMenuComponent {
  displayComp = viewChild(DisplayItemsComponent)
  toast = viewChild(ToastDirective)

  currentItem = signal<string>('')

  restaurantService = inject(RestaurantService)
  menuItems = this.restaurantService.menuItems

  categories = computed(() => {
    return [...new Set(this.menuItems()?.map(item => item.category))]
  })

  /* Function to get items by category */
  getItemsByCategory(category: string) {    
    return this.menuItems().filter(item => item.category === category)
  }

  /* will run when remove will be clicked from modal to remove item from Menu */
  removeItem() {
    const itemToRemove = this.menuItems().find(item => item.itemName === this.currentItem())
    if (itemToRemove) {
      this.menuItems.update(items => items.filter(item => item !== itemToRemove))
    }
    this.toast()?.show()
  }

  /* function to save item info into signal to remove */
  onRemoveConfirmation(itemDish: ItemList) {
    this.currentItem.set(itemDish.itemName)
  }
}
