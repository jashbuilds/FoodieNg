import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../../../Services/restaurant.service';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  restaurantService = inject(RestaurantService)
  imagePreview = signal<string>('')

  form = new FormGroup({
    itemName: new FormControl('', {
      validators: [Validators.required]
    }),
    imageUrl: new FormControl('', {
      validators: [Validators.required]
    }),
    category: new FormControl('', {
      validators: [Validators.required]
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.nullValidator]
    }),
    isSpecial: new FormControl<boolean>(false)
  })

  onFileSelect(event: any) {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => (this.imagePreview.set(reader.result as string));

      reader.readAsDataURL(file)
    }
  }

  onSubmit() {
    const value = this.form.value;
    const newItem = {
      itemName: value.itemName ?? '',
      imageUrl: this.imagePreview() ?? '',
      category: value.category ?? '',
      price: value.price ?? 0,
      isSpecial: value.isSpecial ?? false
    };

    if(this.form.valid) {
      this.restaurantService.addedItems.update((prevItems) => [...prevItems, newItem]);
      this.form.reset()
    }
    
    this.form.patchValue({
      category: ''
    })
    this.imagePreview.set('')
  }

  validateNumber(e: KeyboardEvent) {
    const pattern = /^[0-9]$/;

    if (!pattern.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

}
