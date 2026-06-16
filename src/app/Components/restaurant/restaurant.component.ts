import { Component, viewChild } from '@angular/core';
import { AddItemComponent } from './add-item/add-item.component';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'app-restaurant',
  imports: [AddItemComponent, DisplayItemsComponent, NavigationComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  addItemComp = viewChild(AddItemComponent);
}
