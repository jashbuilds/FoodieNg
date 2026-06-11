import { Component, computed, inject, signal, viewChild } from '@angular/core';
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
  menuItems = this.restaurantService.menuItems

  /* Function to check if item is available in menu, so we can hide or show Add Button accordingly */
  checkIfAdded(itemName: string): boolean {
    return this.menuItems().some(item => item.itemName === itemName);
  }

  selectedCategory = signal<string>('All Category')
  searchQuery = signal('');

  /* helper function to add items to Menu */
  addToMenu(newItem: ItemList) {
    this.restaurantService.menuItems.update(items => {
      const exists = items.some(item => item.itemName === newItem.itemName)

      if (exists) return items

      return [...items, newItem]
    })

    this.toast()?.show()
  }

  filteredItems = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();

    return this.restaurantService.addedItems().filter(item => {
      const matchesCat = category === 'All Category' || item.category === category;
      const matchesSearch = item.itemName.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  });

  onSelectCategory(event: any) {
    this.selectedCategory.set(event.target.value);
  }

  getResults(event: any) {
    this.searchQuery.set(event.target.value);
  }
}
