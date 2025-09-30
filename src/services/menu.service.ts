import { Injectable, signal } from '@angular/core';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuData: Menu = {
    appetizers: [
      { name: 'Burrata & Prosciutto Crostini', description: 'With balsamic glaze and fresh basil' },
      { name: 'Miniature Crab Cakes', description: 'Served with a spicy remoulade sauce' },
      { name: 'Wild Mushroom Tartlets', description: 'With goat cheese and herbs' },
    ],
    mains: [
      { name: 'Pan-Seared Sea Bass', description: 'With lemon-caper sauce, served with asparagus and potato gratin' },
      { name: 'Filet Mignon', description: 'With a red wine reduction, served with roasted root vegetables' },
      { name: 'Risotto Primavera (Vegetarian)', description: 'Creamy arborio rice with seasonal spring vegetables and parmesan' },
    ],
    desserts: [
      { name: 'Wedding Cake', description: 'Layers of vanilla bean and raspberry cream with a Swiss meringue buttercream' },
      { name: 'Chocolate Lava Cakes', description: 'With a molten chocolate center and a dusting of powdered sugar' },
      { name: 'Assortment of French Macarons', description: 'Pistachio, salted caramel, and rose flavors' },
    ],
  };
  
  menu = signal<Menu>(this.menuData);

  constructor() { }
}
