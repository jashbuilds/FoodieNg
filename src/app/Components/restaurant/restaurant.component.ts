import { Component } from '@angular/core';
import { AddItemComponent } from './add-item/add-item.component';
import { DisplayItemsComponent } from './display-items/display-items.component';

@Component({
  selector: 'app-restaurant',
  imports: [AddItemComponent, DisplayItemsComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {

}
