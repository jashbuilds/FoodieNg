import { Injectable, signal } from '@angular/core';
import { ItemList } from '../Models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() { }

  addedItems = signal<ItemList[]>([])
}
