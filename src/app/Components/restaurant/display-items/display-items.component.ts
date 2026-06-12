import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ItemList } from '../../../Models/restaurant.model';
import { TooltipDirective } from "../../../Directives/tooltip.directive";
import { ToastDirective } from '../../../Directives/toast.directive';
import { RestaurantService } from '../../../Services/restaurant.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-items',
  imports: [CurrencyPipe, TooltipDirective, ToastDirective, ReactiveFormsModule],
  templateUrl: './display-items.component.html',
  styleUrl: './display-items.component.css'
})
export class DisplayItemsComponent {

  formModal = viewChild<ElementRef>('formEditModal')

  toast = viewChild(ToastDirective)
  restaurantService = inject(RestaurantService)
  availableItems = this.restaurantService.addedItems
  menuItems = this.restaurantService.menuItems

  toastMessage = signal<string>('')

  private originalItemName = signal<string>('')

  form = new FormGroup({
    itemName: new FormControl('', {
      validators: [Validators.required]
    }),
    imageUrl: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/\.(jpg|jpeg|png|webp)(\?.*)?$/i)]
    }),
    category: new FormControl('', {
      validators: [Validators.required]
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.nullValidator]
    }),
    isSpecial: new FormControl<boolean>(false),
    isAdded: new FormControl<boolean>(false)
  })

  /* Function to check if item is available in menu, so we can hide or show Add Button accordingly */
  checkIfAdded(itemName: string): boolean {
    return this.menuItems().some(item => item.itemName === itemName);
  }

  selectedCategory = signal<string>('All Category')
  searchQuery = signal('');

  addToMenu(item: ItemList) {
    if (item.isAdded) return;

    this.restaurantService.addedItems.update(items =>
      items.map(i => i.itemName === item.itemName ? { ...i, isAdded: true } : i)
    );

    this.restaurantService.menuItems.update(items => [...items, { ...item, isAdded: true }]);

    this.toastMessage.set(`${item.itemName} is Added to Menu.`);
    this.toast()?.show();
  }

  /* get computed values for category and serach term */
  filteredItems = computed(() => {

    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();

    return this.restaurantService.addedItems().filter(item => {
      const matchesCat = category === 'All Category' || item.category === category;
      const matchesSearch = item.itemName.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  });

  /* Set value of selected category in variable */
  onSelectCategory(event: any) {
    this.selectedCategory.set(event.target.value);
  }

  /* Set value of search field in variable */
  getResults(event: any) {
    this.searchQuery.set(event.target.value);
  }

  /* Open edit form and set form fields according to item */
  onOpenEditModal(item: ItemList) {
    this.originalItemName.set(item.itemName)
    this.form.patchValue(item)
  }

  /* Submit edited details of item */
  onSubmitNewDetails() {
    if (this.form.valid) {
      const updatedItem = this.form.value as ItemList

      this.restaurantService.addedItems.update(items => items.map(item => item.itemName === this.originalItemName() ? { ...item, ...updatedItem } : item))
      this.restaurantService.menuItems.update(items => items.map(item => item.itemName === this.originalItemName() ? { ...item, ...updatedItem } : item))
    }

    this.toastMessage.set("Item Edited Successfully!")
    this.toast()?.show()
  }

}
