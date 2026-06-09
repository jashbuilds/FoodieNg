import { Component, inject } from '@angular/core';
import { RestaurantService } from '../../../Services/restaurant.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-display-items',
  imports: [CurrencyPipe],
  templateUrl: './display-items.component.html',
  styleUrl: './display-items.component.css'
})
export class DisplayItemsComponent {
  restaurantService = inject(RestaurantService)
}
