import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ItemList } from '../../../Models/restaurant.model';

@Component({
  selector: 'app-display-items',
  imports: [CurrencyPipe],
  templateUrl: './display-items.component.html',
  styleUrl: './display-items.component.css'
})
export class DisplayItemsComponent {

  items = input<ItemList[]>([])
}
