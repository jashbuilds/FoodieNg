import { Component, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemList } from '../../../Models/restaurant.model';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  itemAdded = output<ItemList>()
  imagePreview = signal<string>('')

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
      this.itemAdded.emit(newItem);
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
