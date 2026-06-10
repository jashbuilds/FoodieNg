import { Injectable, signal } from '@angular/core';
import { ItemList } from '../Models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() { }

  /* Available Items array signal */
  addedItems = signal<ItemList[]>([])

  /* Menu Items array signal */
  menuItems = signal<ItemList[]>([])
}
