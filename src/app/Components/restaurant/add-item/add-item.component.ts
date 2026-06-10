import { Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemList } from '../../../Models/restaurant.model';
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
    isSpecial: new FormControl<boolean>(false)
  })

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

  /* Helper function to handle form reset */
  onResetForm() {
    this.form.reset()

    this.form.patchValue({
      category: ''
    })
  }

  /* Function to validate price input */
  validateNumber(e: KeyboardEvent) {
    const pattern = /^[0-9]$/;

    if (!pattern.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

}
