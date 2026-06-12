import { Injectable, signal } from '@angular/core';
import { ItemList } from '../Models/restaurant.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() { }

  /* Available Items array signal */
  addedItems = signal<ItemList[]>([])

  /* Menu Items array signal */
  menuItems = signal<ItemList[]>([])

  /* Form Fields */
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

  /* Function to validate price input */
  validateNumber(e: KeyboardEvent) {
    const pattern = /^[0-9]$/;

    if (!pattern.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

  /* Helper function to handle form reset */
  onResetForm() {
    this.form.reset()

    this.form.patchValue({
      category: ''
    })
  }
}
