import { Component, signal } from '@angular/core';
import { AddItemComponent } from './add-item/add-item.component';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { ItemList } from '../../Models/restaurant.model';

@Component({
  selector: 'app-restaurant',
  imports: [AddItemComponent, DisplayItemsComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {

  addedItems = signal<ItemList[]>([])

  onItemAdded(item: ItemList) {
    this.addedItems.update(prev => [...prev, item])
  }
}
