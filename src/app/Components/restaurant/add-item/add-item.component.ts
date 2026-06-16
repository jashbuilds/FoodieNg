import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RestaurantService } from '../../../Services/restaurant.service';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  restaurantService = inject(RestaurantService)
  availableItems = this.restaurantService.addedItems
  imagePreview = signal<string>('')

  /* Form fields */
  form = this.restaurantService.form

  /* Helper function to handle submit logic */
  onSubmit() {
    const value = this.form.value;
    const newItem = {
      itemName: value.itemName ?? '',
      imageUrl: value.imageUrl ?? '',
      category: value.category ?? '',
      price: value.price ?? 0,
      isSpecial: value.isSpecial ?? false
    };

    if (this.form.valid) {
      this.availableItems.update(items => {
        const exists = items.some(item => item.itemName === newItem.itemName)

        if (exists) return items;

        return [...items, newItem]
      })
      this.form.reset()
    }

    this.form.patchValue({
      category: ''
    })
    this.imagePreview.set('')
  }

}
